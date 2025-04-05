<?php

namespace App\GraphQL\Resolvers;

use PDO;
use PDOException;
use App\Models\Product;

class ProductResolver
{
    public static function fetchProducts($pdo): ?array
    {
        $stmt = $pdo->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function fetchProductByID(PDO $pdo, string $id): ?Product
    {
        try {
            // Use the provided PDO instance instead of creating a new one
            $stmt = $pdo->prepare("SELECT * FROM products WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_STR);
            $stmt->execute();

            $productData = $stmt->fetch();
            return $productData ? new Product($productData) : null;
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage()); // Log the error
            return null;
        }
    }

    public static function fetchProductByCategory(PDO $pdo, string $category): array
    {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category = :category");
        $stmt->bindParam(':category', $category, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
