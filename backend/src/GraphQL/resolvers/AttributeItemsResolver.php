<?php

namespace App\GraphQL\Resolvers;

use PDO;

class AttributeItemsResolver
{

    public static function fetchattributes($pdo, $attribute)
    {
        $stmt = $pdo->prepare("SELECT * FROM attribute_items WHERE attribute_id = :attribute_id");
        $stmt->bindParam(':attribute_id', $attribute['id'], PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll() ?: null;
    }
}