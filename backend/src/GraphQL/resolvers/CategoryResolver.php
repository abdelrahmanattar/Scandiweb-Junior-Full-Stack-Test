<?php

namespace App\GraphQL\Resolvers;

use PDO;

class CategoryResolver
{
    public static function fetchCategories($pdo): array
    {
        $stmt = $pdo->query("SELECT * FROM categories");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}