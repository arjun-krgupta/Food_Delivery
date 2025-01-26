import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Cart from "./components/Cart";
import Header from "./components/Header";
import OrderHistory from "./components/OrderHistory";
import OrderPage from "./components/OrderPage";

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking the token in localStorage
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token); // If the token exists, the user is logged in
  }, []);

  const handleLogout = () => {
    // Clear the JWT token from localStorage to log out the user
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false); // Update authentication status
  };

// Load cart from localStorage on component mount
useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    setCart(JSON.parse(storedCart)); // Parse and set the cart from localStorage
  }
}, []);

// Update localStorage whenever the cart changes
useEffect(() => {
  if (cart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart)); // Persist cart in localStorage
  }
}, [cart]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
  };


  return (
    <Router>
     {isAuthenticated && <Header cart={cart} onSearch={handleSearch} isAuthenticated={isAuthenticated} onLogout={handleLogout}/>}
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/product" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Register Route */}
        <Route
          path="/register"
          element= {<Register />}
        />

        {/* Private Routes: Only accessible if authenticated */}
        <Route
          path="/product"
          element={isAuthenticated ? <Product cart={cart} setCart={setCart} searchTerm={searchTerm}  /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart cart={cart} setCart={setCart} /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={isAuthenticated ? <OrderPage cart={cart} setCart={setCart} /> : <Navigate to="/login" />}
        />
        <Route
          path="/order-history"
          element={isAuthenticated ? <OrderHistory /> : <Login />}
        />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
