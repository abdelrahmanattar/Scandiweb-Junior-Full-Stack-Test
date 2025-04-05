<?php

namespace App\Models;

use JsonSerializable;

class Price implements JsonSerializable
{
    private int $id;
    private float $amount;
    private string $currency_label;
    private string $currency_symbol;

    public function __construct(array $data)
    {
        $this->id = isset($data['id']) ? (int) $data['id'] : 0;
        $this->amount = isset($data['amount']) ? (float) $data['amount'] : 0.0;
        $this->currency_label = $data['currency_label'] ?? 'USD';
        $this->currency_symbol = $data['currency_symbol'] ?? '$';
    }

    /**
     * Convert the price object to an array.
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'currency_label' => $this->currency_label,
            'currency_symbol' => $this->currency_symbol
        ];
    }

    /**
     * Implement JsonSerializable for JSON encoding.
     */
    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
}
