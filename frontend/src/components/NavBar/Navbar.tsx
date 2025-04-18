import React from "react";
import "./Navbar.css";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries";
import Loading from "../Loading";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { setCategory } from "@/store/slices/categorySlice";
import { Link } from "react-router-dom";
import CartBubble from "../CartBubble/CartBubble";

interface NavbarProps {
  toggleSideCart: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleSideCart }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="navbar">
      <ul className="navbar-links">
        <div className="categories">
          {data.categories.map((category: any) => (
            <li key={category.name}>
              <Link
                to={category.name}
                className={selectedCategory === category.name ? "active" : ""}
                onClick={() => dispatch(setCategory(category.name))}
              >
                {category.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </div>
      </ul>
      <img src="e-commerce-logo.svg" />
      <div className="cart-wrapper">
        <CartBubble />
        <img
          src="icon-navbarcart.svg"
          alt="Cart Icon"
          onClick={toggleSideCart}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
