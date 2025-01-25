import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { Badge } from "@material-tailwind/react";

function Header({ cart, onSearch,isAuthenticated, onLogout  }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      onSearch(e.target.value); // Pass the search term to the parent component
    };
    // Calculate total quantity from the cart
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-black text-white p-4 flex flex-wrap justify-between items-center px-10 md:px-20">
      <h1 className="text-2xl font-bold">Food App</h1>
       {/* Search Bar */}
       <div className="flex-grow md:mx-4 my-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-96 px-4 py-2 rounded border-0 outline-none text-gray-800"
        />
      </div>

      <nav className="flex items-center gap-8">
        <Link to="/product" >Product</Link>
        <Link to="/cart" >
                <Badge content={totalQuantity } className="m-[-4px]">
                <FaCartPlus  className="text-2xl text-white"/>
                </Badge>

        </Link>
        <Link to="/order" >Order</Link>
        {
            isAuthenticated ?  <button
            onClick={onLogout}
             className="bg-red-500 px-4 py-2 rounded"
           >
             Logout
           </button> :
            <Link to="/login"> <button
            
             className="bg-red-500 px-4 py-2 rounded"
           >Login</button></Link>
        }
       
      </nav>
    </header>
  );
}

export default Header;
