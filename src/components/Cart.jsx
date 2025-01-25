import React from "react";

function Cart({ cart, setCart }) {
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Update the cart
  };

  // Function to update item quantity
  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart); // Update the cart
  };

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-16 h-16" />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.price * item.quantity}</p>
                <button
                 onClick={() => removeItem(item.id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold text-xl mt-4">
          Total Price: ₹{totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
