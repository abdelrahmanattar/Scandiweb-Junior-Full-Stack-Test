import React from "react";
import parse from "html-react-parser";

interface ProductInfoProps {
  title: string;
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  price: number;
  description: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  sizes,
  selectedSize,
  onSizeChange,
  colors,
  selectedColor,
  onColorChange,
  price,
  description,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div>
        <h2 className="font-medium mb-1">Size:</h2>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-medium mb-1">Color:</h2>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded border ${
                selectedColor === color ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-medium">Price:</h2>
        <p className="text-xl font-bold">${price.toFixed(2)}</p>
      </div>

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        ADD TO CART
      </button>

      {parse(description)}
    </div>
  );
};

export default ProductInfo;
