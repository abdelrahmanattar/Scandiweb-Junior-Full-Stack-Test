import React from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/store/slices/cartSlice"; // Make sure the path is correct
import "./CartBubble.css";

const CartBubble: React.FC = () => {
  const cartCount = useSelector(selectCartCount);
  console.log("CartBubble Rendered, Cart Count: ", cartCount); // Check if it renders correctly
  return (
    <div className= "cart-icon">
      {cartCount > 0 && <div className="cart-bubble">{cartCount}</div>}
    </div>
  );
};

export default CartBubble;
