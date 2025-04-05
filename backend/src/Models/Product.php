<?php

namespace App\Models;

use App\Models\Price;

class Product
{
    public string $id;
    public string $name;
    public string $category;
    public string $brand;
    private Price $price;
    public string $description;
    public bool $inStock;

    public function __construct(array $data)
    {
        $this->id = (string) ($data['id'] ?? null);
        $this->name = $data['name'] ?? 'Unknown';
        $this->category = $data['category'] ?? 'General';
        $this->brand = $data['brand'] ?? 'No Brand';

        // Ensure price is correctly assigned
        $this->price = isset($data['price']) && is_array($data['price'])
            ? new Price($data['price'])
            : new Price(['id' => 0, 'amount' => 0.0, 'currency_label' => 'USD', 'currency_symbol' => '$']);

        $this->description = $data['description'] ?? 'No description available';
        $this->inStock = isset($data['in_stock']) ? (bool) $data['in_stock'] : false;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'brand' => $this->brand,
            'price' => $this->price->toArray(), // Convert Price object to array
            'description' => $this->description,
            'in_stock' => $this->inStock
        ];
    }
}
