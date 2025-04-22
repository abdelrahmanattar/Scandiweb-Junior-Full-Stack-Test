import React from "react";
import { useState } from "react";
import { addItem } from "@/store/slices/cartSlice";
import parse from "html-react-parser";
import "./ProductInfo.css";

interface ProductAttribute {
  attribute_name: string;
  attribute_type: "text" | "swatch";
  attribute_item: { value: string }[];
}

interface Product {
  id: string;
  name: string;
  price: {
    currency_symbol: string;
    amount: number;
  };
  images: string[];
  description: string;
  in_stock: boolean;
  attributes: ProductAttribute[] | [];
}

interface ProductInfoProps {
  product: Product;
  dispatch: any;
  openCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  dispatch,
  openCart,
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const handleSelect = (attrId: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrId]: value }));
  };

  const handleAddToCart = () => {
    let attributesComplete = true;

    if (product.attributes) {
      attributesComplete =
        Object.keys(selectedAttributes).length === product.attributes.length;
    }

    if (!attributesComplete) {
      alert("Please select all product attributes!");
      return;
    }

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price.amount,
        quantity: 1,
        attributes: product.attributes?.length ? selectedAttributes : undefined,
        all_attributes: product.attributes?.length
          ? product.attributes.reduce((acc, attr) => {
              acc[attr.attribute_name] = attr;
              return acc;
            }, {} as { [key: string]: ProductAttribute })
          : undefined,
        image: product.images[0],
      })
    );

    openCart();
  };

  const isDisabled = !product.in_stock;

  return (
    <div className="product-info">
      <h1 className="product-name">{product.name}</h1>

      {product.attributes &&
        product.attributes.map((attr: any) => (
          <div key={attr.attribute_name} className="attribute-section">
            <p className="label">{attr.attribute_name.toUpperCase()}:</p>
            <div className="attribute-options">
              {attr.attribute_item.map((item: any, idx: number) => {
                const isSelected =
                  selectedAttributes[attr.attribute_name] === item.value;
                return attr.attribute_type === "text" ? (
                  <button
                    key={idx}
                    className={`attribute-values ${
                      isSelected ? "selected-size" : ""
                    }`}
                    onClick={() =>
                      handleSelect(attr.attribute_name, item.value)
                    }
                  >
                    {item.value}
                  </button>
                ) : (
                  <div
                    key={idx}
                    className={`attribute-values ${
                      isSelected ? "selected-color" : ""
                    }`}
                    onClick={() =>
                      handleSelect(attr.attribute_name, item.value)
                    }
                    style={{
                      backgroundColor: item.value,
                      border: isSelected ? "2px solid #000" : "1px solid #ccc",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}

      <div>
        <p className="label">PRICE:</p>
        <p className="product-price">
          {product.price.currency_symbol}
          {product.price.amount}
        </p>
      </div>

      <button
        className={`add-to-cart-button ${isDisabled ? "disabled" : ""}`}
        onClick={handleAddToCart}
        disabled={isDisabled}
      >
        ADD TO CART
      </button>

      <p className="product-description">{parse(product.description)}</p>
    </div>
  );
};

export default ProductInfo;
