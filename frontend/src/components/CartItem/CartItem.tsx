import React from "react";
import "./CartItem.css";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { incrementItem, decrementItem } from "@/store/slices/cartSlice";

interface ProductAttribute {
  attribute_name: string;
  attribute_type: "text" | "swatch";
  attribute_item: { value: string }[];
}

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    attributes: Record<string, string>;
    all_attributes: Record<string, ProductAttribute>;
    image?: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(incrementItem({ id: item.id, attributes: item.attributes }));
  };

  const handleDecrement = () => {
    dispatch(decrementItem({ id: item.id, attributes: item.attributes }));
  };

  return (
    <li className="cart-item">
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <div className="item-price">${item.price.toFixed(2)}</div>
        {Object.entries(item.all_attributes).map(([idx, attribute]) => {
          const selectedValue = item.attributes[attribute.attribute_name];
          return (
            <div key={attribute.attribute_name} className="item-attribute">
              <span className="attribute-label">
                {attribute.attribute_name}:
              </span>
              <div className="attribute-options">
                {attribute.attribute_item.map((item: any, idx: number) => {
                  const isSelected = selectedValue === item.value;

                  return attribute.attribute_type === "text" ? (
                    <span
                      key={idx}
                      className={`attribute-value text-value ${
                        isSelected ? "selected" : ""
                      }`}
                      style={{
                        padding: "12px 12px",
                        marginRight: "4px",
                        background: isSelected ? "black" : "white",
                        color: isSelected ? "white" : "black",
                      }}
                    >
                      {item.value}
                    </span>
                  ) : (
                    <span
                      key={idx}
                      className={`attribute-value swatch-value ${
                        isSelected ? "selected" : ""
                      }`}
                      style={{
                        padding: "2px",
                        backgroundColor: item.value,
                        border: isSelected
                          ? "2px solid #5ECE7B"
                          : "1px solid #ccc",
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        marginRight: "4px",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="quantity-controls">
        <button onClick={handleIncrement} className="quantity-btn">
          +
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button onClick={handleDecrement} className="quantity-btn">
          -
        </button>
      </div>

      {item.image && (
        <img src={item.image} alt={item.name} className="item-image" />
      )}
    </li>
  );
};

export default CartItem;
