import React from "react";
import pizza from '../assets/pizza.jpg'
import burger from '../assets/burger.jpg'
import pasta from '../assets/pasta.jpg'
import sushi from '../assets/sushi.jpg'
import steak from '../assets/steak.jpg'
import salid from '../assets/salid.jpg'
import icecream from '../assets/icecream.jpg'
import sandwich from '../assets/sandwich.jpg'
import tacos from '../assets/tacos.jpg'
import pencakes from '../assets/pencakes.jpg'

const foodItems = [
  { id: 1, name: "Pizza", image: pizza, price: 12 },
  { id: 2, name: "Burger", image:burger, price: 8 },
  { id: 3, name: "Pasta", image:pasta, price: 10 },
  { id: 4, name: "Sushi", image: sushi, price: 15 },
  { id: 5, name: "Steak", image: steak, price: 20 },
  { id: 6, name: "Salid", image: salid, price: 7 },
  { id: 7, name: "Ice Cream", image: icecream, price: 5 },
  { id: 8, name: "Sandwich", image: sandwich, price: 6 },
  { id: 9, name: "Tacos", image: tacos, price: 9 },
  { id: 10, name: "Pancakes", image: pencakes, price: 8 },
];

function Product({ cart, setCart, searchTerm  }) {

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredItems.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
          <img src={item.image} alt={item.name} className="w-32 h-32 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-500">Price: ₹{item.price.toFixed(2)}</p>
          <button
           onClick={() => addToCart(item)}
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product;
