<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use App\GraphQL\Resolvers\AttributesResolver;
use App\GraphQL\Resolvers\CategoryResolver;
use App\GraphQL\Resolvers\PriceResolver;
use App\GraphQL\Resolvers\ProductImageResolver;
use App\GraphQL\Resolvers\ProductResolver;
use App\GraphQL\Resolvers\AttributeItemsResolver;
use App\GraphQL\Resolvers\OrderItemResolver;
use App\GraphQL\Resolvers\OrderResolver;
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

        $attributeItemsType = new ObjectType([
            'name' => 'Attribute_items',
            'fields' => [
                'display_value' => Type::string(),
                'value' => Type::string(),
            ]
        ]);

        $attributeType = new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::int(),
                'attribute_name' => Type::string(),
                'attribute_type' => Type::string(),
                'attribute_item' => [
                    'type' => Type::listOf($attributeItemsType),
                    'resolve' => fn($attribute) => AttributeItemsResolver::fetchAttributes($pdo, $attribute)
                ]
            ]
        ]);

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'in_stock' => Type::boolean(),
                'description' => Type::string(),
                'category' => Type::string(),
                'brand' => Type::string(),
                'images' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => fn($product) => ProductImageResolver::fetchProductImage($pdo, $product)
                ],
                'attributes' => [
                    'type' => Type::listOf($attributeType),
                    'resolve' => fn($product) => AttributesResolver::fetchattributes($pdo, $product)
                ],
                'price' => [
                    'type' => $priceType,
                    'resolve' => fn($product) => PriceResolver::fetchPrice($pdo, $product)
                ],
            ]
        ]);

        $orderItemType = new ObjectType([
            'name' => 'Order_item',
            'fields' => [
                'product_id' => Type::string(),
                'quantity' => Type::int(),
                'price' => Type::float(),
                'attributes' => Type::string()

            ]
        ]);

        $orderType = new ObjectType([
            'name' => 'Order',
            'fields' => [
                'id' => Type::int(),
                'total_price' => Type::float(),
                'status' => Type::string(),
                'created_at' => Type::string(),
                'updated_at' => Type::string(),
                'order_items' => [
                    'type' => Type::listOf($orderItemType),
                    'resolve' => fn($root) => $root['order_items'],
                ],
            ],
        ]);

        $selectedAttributeInput = new InputObjectType([
            'name' => 'SelectedAttributeInput',
            'fields' => [
                'attribute_name' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
            ]
        ]);

        $orderItemInput = new InputObjectType([
            'name' => 'OrderItemInput',
            'fields' => [
                'product_id' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'selected_attributes' => Type::listOf(Type::nonNull($selectedAttributeInput)),
            ]
        ]);

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
                        'id' => ['type' => Type::string()],
                    ],
                    'resolve' => fn($root, $args) => ProductResolver::fetchProductByID($pdo, $args['id']) ?: throw new \Exception("Product not found"),
                ],
                'productsByCategory' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => ['type' => Type::string()],
                    ],
                    'resolve' => fn($root, $args) => ProductResolver::fetchProductByCategory($pdo, $args['category']),
                ],
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => fn() => CategoryResolver::fetchCategories($pdo)
                ],
            ]
        ]);


        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'placeOrder' => [
                    'type' => $orderType,
                    'args' => [
                        'order_items' => [
                            'type' => Type::nonNull(Type::listOf(Type::nonNull($orderItemInput)))
                        ],
                        'status' => [
                            'type' => Type::string(),
                            'defaultValue' => 'pending',
                        ],
                    ],
                    'resolve' => fn($root, $args) => OrderResolver::placeOrder($pdo, $args)
                ],
            ],
        ]);


        return new Schema(
            (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
        );
    }
}
