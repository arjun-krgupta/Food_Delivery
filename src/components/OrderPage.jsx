import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderPage({ cart, setCart }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  // Calculate total price whenever cart changes
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  // Place order and save the order history
  const handlePlaceOrder = () => {
    // Save order in local storage
    const newOrder = {
      id: Date.now(),
      items: cart,
      totalPrice: totalPrice,
      date: new Date().toLocaleString(),
    };

    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    storedOrders.push(newOrder);
    localStorage.setItem("orderHistory", JSON.stringify(storedOrders));

    // Clear the cart after placing the order
    setCart([]);
    navigate("/order-history"); // Redirect to order history page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <span>{item.name}</span>
              </div>
              <div>
                <span>Price: ₹{item.price}</span> x <span>{item.quantity}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Price */}
      <div className="mt-6 text-right">
        <p className="text-xl font-semibold">Total Price: ₹{totalPrice}</p>
      </div>

      {/* Place Order Button */}
      {cart.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
