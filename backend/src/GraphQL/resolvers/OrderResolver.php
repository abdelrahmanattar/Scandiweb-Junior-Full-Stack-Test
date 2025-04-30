<?php

namespace App\GraphQL\Resolvers;

use PDO;
use DateTime;
use Exception;
class OrderResolver
{
    public static function placeOrder($pdo, $args)
    {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();

        try {
            $now = (new DateTime())->format('Y-m-d H:i:s');
            $status = $args['status'] ?? 'pending';
            $totalPrice = 0;
            $prices = [];

            $stmt = $pdo->prepare("SELECT amount FROM prices WHERE product_id = ?");

            foreach ($args['order_items'] as $item) {
                $stmt->execute([$item['product_id']]);
                $productPrice = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$productPrice) {
                    throw new Exception("Product with ID {$item['product_id']} doesn't exist");
                }

                $itemPrice = (float) $productPrice['amount'];
                $prices[$item['product_id']] = $itemPrice;
                $totalPrice += $itemPrice * $item['quantity'];
            }

            $stmt = $pdo->prepare("INSERT INTO orders (total_price, status, created_at, updated_at) VALUES (?, ?, ?, ?)");
            $stmt->execute([$totalPrice, $status, $now, $now]);
            $orderId = $pdo->lastInsertId();

            $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, price, selected_attributes) VALUES (?, ?, ?, ?, ?)");
            foreach ($args['order_items'] as $item) {

                $stmt->execute([
                    $orderId,
                    $item['product_id'],
                    $item['quantity'],
                    $prices[$item['product_id']],
                    json_encode($item['selected_attributes'] ?? [])
                ]);
            }

            $pdo->commit();

        } catch (Exception $e) {
            $pdo->rollback();
            throw new \GraphQL\Error\UserError($e->getMessage());
        }
    }
}