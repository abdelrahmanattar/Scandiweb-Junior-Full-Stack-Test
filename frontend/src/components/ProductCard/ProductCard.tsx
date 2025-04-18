import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  images: string[];
  price: {
    amount: number;
    currency_label: string;
    currency_symbol: string;
  };
  attributes: {
    attribute_name: string;
    attribute_type: string;
    attribute_item: {
      display_value: string;
      value: string;
    };
  };
  in_stock: boolean;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-grid">
      <div className="product-card">
        <Link to={`/${product.id}`} className="product-link">
          <div className="image-wrapper">
            <img
              src={
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : "fallback-image.jpg"
              }
              alt={product.name}
              className="product-image"
            />
            {!product.in_stock && (
              <div className="out-of-stock-overlay">
                <p className="out-of-stock">Out of stock</p>
              </div>
            )}
          </div>
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">
              {product.price.currency_symbol}
              {product.price.amount.toFixed(2)}
            </p>
          </div>
        </Link>
        {product.in_stock && (
          <img
            src="icon-addtocart.svg"
            alt="Add to cart"
            className="cart-icon"
            onClick={() => onAddToCart(product)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
