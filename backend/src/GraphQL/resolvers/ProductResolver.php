<?php

namespace App\GraphQL\Resolvers;

use PDO;
use App\Models\Product;

class ProductResolver
{
    public static function fetchProducts($pdo): ?array
    {
        $stmt = $pdo->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function fetchProductByID($pdo, $id): ?Product
    {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        $stmt->execute();

        $productData = $stmt->fetch();
        return $productData ? new Product($productData) : null;
    }

    public static function fetchProductByCategory($pdo, $category): array
    {
        if ($category == null) {
            $stmt = $pdo->query("SELECT * FROM products");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category = :category");
        $stmt->bindParam(':category', $category, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
