import React,{ useState } from "react";

function MenuItemForm({ onSubmit }) {
  const [menuItem, setMenuItem] = useState({ name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (menuItem.name && menuItem.price) {
      onSubmit({ ...menuItem, id: Date.now() }); // Generate a unique ID
      setMenuItem({ name: "", price: "" }); // Reset the form
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Add Menu Item</h2>
      <div className="mb-2">
        <label className="block mb-1 text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={menuItem.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter menu item name"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1 text-sm">Price</label>
        <input
          type="number"
          name="price"
          value={menuItem.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter price"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded mt-2"
      >
        Add Item
      </button>
    </form>
  );
}

export default MenuItemForm;
