<?php

namespace App\GraphQL\Resolvers;

use PDO;

class AttributeItemsResolver
{

    public static function fetchattributes($attribute)
    {
        error_log($attribute['id']);
        $pdo = new PDO("mysql:host=localhost;dbname=scandiweb", "root", "1234", [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        $stmt = $pdo->prepare("SELECT * FROM attribute_items WHERE attribute_id = :attribute_id");
        $stmt->bindParam(':attribute_id', $attribute['id'], PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll() ?: null;
    }
}