import React from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import "./CartBubble.css";

const CartBubble: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return cartCount > 0 && <div className="cart-bubble">{cartCount}</div>;
};

export default CartBubble;
