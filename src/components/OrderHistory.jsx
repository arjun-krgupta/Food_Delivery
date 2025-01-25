import React, { useEffect, useState } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Order History</h2>

      {/* Display order history */}
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border-b py-4">
            <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
            <p className="text-sm text-gray-600">Date: {order.date}</p>
            <div className="space-y-2 mt-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                    <span>{item.name}</span>
                  </div>
                  <div>
                    ₹{item.price} x {item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <p className="text-xl font-semibold">Total: ₹{order.totalPrice}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
