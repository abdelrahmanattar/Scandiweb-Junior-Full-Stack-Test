import React from "react";
import "./SideCart.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import CartItem from "../CartItem/CartItem";
import { selectCartCount } from "@/store/slices/cartSlice";

interface SideCartProps {
  isOpen: boolean;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen }) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = useAppSelector(selectCartCount);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className={`side-cart ${isOpen ? "open" : ""}`}>
      <h2>
        My Bag,
        <span className="item-count">
          {cartCount > 1 ? ` ${cartCount} items` : ` ${cartCount} item`}
        </span>
      </h2>
      <ul className="side-cart-items">
        {cartItems.map((item, idx) => (
          <CartItem key={idx} item={item} />
        ))}
      </ul>

      <h2>Total: ${total.toFixed(2)}</h2>
      <div className="cart-footer">
        <button className="checkout-btn">Place Order</button>
      </div>
    </div>
  );
};

export default SideCart;
