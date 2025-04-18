import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProductPage from "./pages/ProductPage/ProductPage";
import { GET_PRODUCTS_BY_CATEGORY } from "@/graphql/queries";
import CategoryPage from "@/pages/CategoryPage/CategoryPage"; // Ensure this handles variables correctly
import SideCart from "./components/SideCart/SideCart";
import "./app.css";

function App() {
  const [isSideCartOpen, setIsSideCartOpen] = useState<boolean>(false);
  const toggleSideCart = () => {
    setIsSideCartOpen(!isSideCartOpen);
  };

  const openSideCart = () => {
    setIsSideCartOpen(true);
  };

  return (
    <div className="wrapper">
      <Router>
        <Navbar toggleSideCart={toggleSideCart} />
        <SideCart isOpen={isSideCartOpen} />
        {isSideCartOpen && (
          <div className="overlay" onClick={toggleSideCart}></div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <CategoryPage
                openCart={openSideCart}
                variables={{ category: null }}
              />
            }
          />
          <Route
            path="/all"
            element={
              <CategoryPage
                openCart={openSideCart}
                variables={{ category: null }}
              />
            }
          />
          <Route
            path="/clothes"
            element={
              <CategoryPage
                openCart={openSideCart}
                variables={{ category: "clothes" }}
              />
            }
          />
          <Route
            path="/tech"
            element={
              <CategoryPage
                openCart={openSideCart}
                variables={{ category: "tech" }}
              />
            }
          />
          <Route
            path={`/:id`}
            element={<ProductPage openCart={openSideCart} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
