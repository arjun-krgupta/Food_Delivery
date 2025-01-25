import React from "react";

const foodItems = [
  { id: 1, name: "Pizza", image: "https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg", price: 12 },
  { id: 2, name: "Burger", image: "https://media.istockphoto.com/id/182744943/photo/burger.jpg?s=612x612&w=0&k=20&c=pi20IieXf8UNk6SeJy-cHxubaVD7L5Rnw2i0Qo8vNyM=", price: 8 },
  { id: 3, name: "Pasta", image: "https://media.istockphoto.com/id/155433174/photo/bolognese-pens.jpg?s=612x612&w=0&k=20&c=A_TBqOAzcOkKbeVv8qSDs0bukfAedhkA458JEFolo_M=", price: 10 },
  { id: 4, name: "Sushi", image: "https://www.shutterstock.com/image-photo/sushi-platter-vibrant-fresh-restaurant-260nw-2497859739.jpg", price: 15 },
  { id: 5, name: "Steak", image: "https://www.shutterstock.com/image-photo/closeup-seared-steak-600nw-2468790433.jpg", price: 20 },
  { id: 6, name: "Salad", image: "https://cdn.jwplayer.com/v2/media/wGEqBtuf/thumbnails/qSXwlEH3.jpg", price: 7 },
  { id: 7, name: "Ice Cream", image: "https://cdn.pixabay.com/photo/2024/06/02/17/01/ice-cream-8804687_640.jpg", price: 5 },
  { id: 8, name: "Sandwich", image: "https://www.livofy.com/health/wp-content/uploads/2021/09/Club-Sandwich-with-Super-Mayo.jpg", price: 6 },
  { id: 9, name: "Tacos", image: "https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg", price: 9 },
  { id: 10, name: "Pancakes", image: "https://www.allrecipes.com/thmb/dOTb-yf_t1CXgw91lg69Wvzrl8E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-162760-fluffy-pancakes-DDMFS-beauty-3x4-35d4b54b54464701b32870d4b1646bfe.jpg", price: 8 },
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
