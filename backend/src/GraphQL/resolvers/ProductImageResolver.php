<?php

namespace App\GraphQL\Resolvers;

use PDO;

class ProductImageResolver
{
    public static function fetchProductImage($pdo, $product): array
    {
        $productId = is_array($product) ? $product['id'] : $product->id ?? null;

        if (!$productId) {
            error_log("Product ID is missing in fetchProductImage.");
            return [];
        }

        $stmt = $pdo->prepare("SELECT image_url FROM product_images WHERE product_id = :product_id");
        $stmt->bindParam(':product_id', $productId, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_COLUMN) ?: [];
    }
}
