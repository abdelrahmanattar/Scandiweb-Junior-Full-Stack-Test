<?php

namespace App\GraphQL\Resolvers;

use PDO;
class OrderItemResolver
{
    public static function fetchOrderItem($pdo, $order)
    {
        $orderId = is_array($order) ? $order['id'] : $order->id ?? null;

        $stmt = $pdo->prepare("SELECT * FROM order_items WHERE order_id = :order_id");
        $stmt->bindParam(":product_id", $orderId, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}