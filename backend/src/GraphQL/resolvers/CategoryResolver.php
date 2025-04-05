<?php

namespace App\GraphQL\Resolvers;

use PDO;

class CategoryResolver
{
    public static function fetchCategories(): array
    {
        $pdo = new PDO("mysql:host=localhost;dbname=scandiweb", "root", "1234");
        $stmt = $pdo->query("SELECT * FROM categories");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}