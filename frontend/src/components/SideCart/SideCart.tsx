import React from "react";
import "./SideCart.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import CartItem from "../CartItem/CartItem";
import { clearCart } from "@/store/slices/cartSlice";
import { PLACE_ORDER } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen, onClose }) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useAppDispatch();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [placeOrderMutation, _] = useMutation(PLACE_ORDER);
  const navigate = useNavigate();
  const handlePlaceOrder = async () => {
    try {
      const order_items = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        selected_attributes: Object.entries(item.attributes || {}).map(
          ([key, value]) => ({
            attribute_name: key,
            value: value,
          })
        ),
      }));

      await placeOrderMutation({
        variables: {
          order_items,
          status: "pending",
        },
      });

      alert("Order placed successfully!");

      dispatch(clearCart());
      onClose();
      navigate("/");
    } catch (err) {
      alert("Failed to place order.");
    }
  };

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
        <button className="checkout-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default SideCart;
