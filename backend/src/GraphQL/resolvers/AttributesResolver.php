<?php

namespace App\GraphQL\Resolvers;

use PDO;

class AttributesResolver
{

    public static function fetchattributes($pdo, $product)
    {
        $productId = is_array($product) ? $product['id'] : $product->id ?? null;

        $stmt = $pdo->prepare("SELECT * FROM attributes WHERE product_id = :product_id");
        $stmt->bindParam(':product_id', $productId, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll() ?: null;
    }
}