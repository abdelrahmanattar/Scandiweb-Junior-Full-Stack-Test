<?php

namespace App\GraphQL\Resolvers;

use PDO;
use PDOException;
class PriceResolver
{
    public static function fetchPrice($pdo, $product)
    {
        $productId = is_array($product) ? $product['id'] : $product->id ?? null;

        $stmt = $pdo->prepare("SELECT amount, currency_label, currency_symbol FROM prices WHERE product_id = :product_id");
        $stmt->bindParam(":product_id", $productId, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}