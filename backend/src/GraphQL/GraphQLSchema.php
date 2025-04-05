<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use App\GraphQL\Resolvers\AttributesResolver;
use App\GraphQL\Resolvers\CategoryResolver;
use App\GraphQL\Resolvers\PriceResolver;
use App\GraphQL\Resolvers\ProductImageResolver;
use App\GraphQL\Resolvers\ProductResolver;
use App\GraphQL\Resolvers\AttributeItemsResolver;
use PDO;
class GraphQLSchema
{
    public static function createSchema(PDO $pdo): Schema
    {
        $categoryType = new ObjectType([
            'name' => 'Category',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
            ]
        ]);

        $priceType = new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::float(),
                'currency_label' => Type::string(),
                'currency_symbol' => Type::string(),
            ]
        ]);

        $AttributeItemsType = new ObjectType([
            'name' => 'Attribute_items',
            'fields' => [
                'display_value' => Type::string(),
                'value' => Type::string(),
            ]
        ]);

        $AttributeType = new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::int(),
                'attribute_name' => Type::string(),
                'attribute_type' => Type::string(),
                'attribute_item' => [
                    'type' => Type::listOf($AttributeItemsType),
                    'resolve' => function ($attribute) {
                        return AttributeItemsResolver::fetchAttributes($attribute);
                    }
                ]
            ]
        ]);

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'description' => Type::string(),
                'category' => Type::string(),
                'brand' => Type::string(),
                'images' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => fn($product) => ProductImageResolver::fetchProductImage($pdo, $product)
                ],
                'attributes' => [
                    'type' => Type::listOf($AttributeType),
                    'resolve' => fn($product) => AttributesResolver::fetchattributes($pdo, $product)
                ],
                'price' => [
                    'type' => $priceType,
                    'resolve' => fn($product) => PriceResolver::fetchPrice($pdo, $product)
                ],
            ]
        ]);

        // Query Type
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => fn() => ProductResolver::fetchProducts($pdo)
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => fn($root, $args) => ProductResolver::fetchProductByID($pdo, $args['id']) ?: throw new \Exception("Product not found"),
                ],
                'productsByCategory' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => fn($root, $args) => ProductResolver::fetchProductByCategory($pdo, $args['category']),
                ],
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => function () {
                        return CategoryResolver::fetchCategories();
                    }
                ],
            ]
        ]);

        // Mutation Type
        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'addProduct' => [
                    'type' => $productType,
                    'args' => [
                        'name' => ['type' => Type::nonNull(Type::string())],
                        'category' => ['type' => Type::string()],
                        'brand' => ['type' => Type::string()],
                        'price' => ['type' => Type::float()],
                        'description' => ['type' => Type::string()],
                        'inStock' => ['type' => Type::boolean()],
                    ],
                    'resolve' => function ($root, $args) {
                        return ProductResolver::addProduct($args);
                    }
                ],
            ]
        ]);

        return new Schema(
            (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
        );
    }
}
