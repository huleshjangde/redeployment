import React, { useState,useContext } from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../usecontext/usecontext";
import Cookies from 'js-cookie';
import Image from 'next/image'
 

const Product = () => {
  //api data 
  const apiData = useContext(AppContext);
 const [selectedProducts, setSelectedProducts] = useState([]);

 //checkbox handler
  const handleCheckboxChange = (event, product) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedProducts((prevItems) => [...prevItems, product]);
    } else {
      setSelectedProducts((prevItems) =>
        prevItems.filter((selectedProduct) => selectedProduct.id !== product.id)
      );
    }
  };

  //all selects or unselects
  const handleSelectAll = () => {
  if (selectedProducts.length === apiData.length) {
    // if all selects ( unselect )
    setSelectedProducts([]);
  } else {
    // Select all items
    setSelectedProducts(apiData);
  }
};

//save in firebase
  const handleSave = () => {

    if (selectedProducts.length === 0) {
      // Show a message indicating that no products are selected
      toast.warning('No products selected!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return; // Exit the function without saving
    }
    // Save selectedProducts to firebase database
    const url = 'https://my-intership-11782-default-rtdb.firebaseio.com/users.json';
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(selectedProducts),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save data to Firebase.');
        }
        setSelectedProducts([]); // Deselect all items
        
        // notification
        toast.success('Data saved successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };
    const handleLogout = () => {
      // Clear the login cookies
      Cookies.remove('isLoggedIn');
      Cookies.remove('userData');
  
      // Redirect to the login page 
      window.location.href = '/Login';
    };
  

  return (
    <div className='flex justify-center w-full h-full flex-col items-center pb-10 bg-blue-50'>
   <h1 className='text-3xl font-bold mb-6 w-full bg-white text-center py-8'>PRODUCTS LIST</h1>
    <div className=' w-full h-full lg:w-4/5 md:h-full px-0  md:px-10 flex justify-between flex-col'>
      <form>
        <div className="actions flex gap-10 justify-center mb-7">
 <button
            type="button"
            onClick={handleSelectAll}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Select All
          </button>

           <button
          type="button"
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        </div>

       {/* api fetch items */}
      {apiData.map((product) => (
  <div key={product.id} className="mb-4 bg-blue-100 px-3 md:px-20 hover:bg-blue-200 rounded-md">
    <label className="flex gap-4">
      <input
        type="checkbox"
        onChange={(e) => handleCheckboxChange(e, product)}
        checked={selectedProducts.some((selectedProduct) => selectedProduct.id === product.id)}
      />
      <div className="flex items-center justify-between">
      <Image  src={product.image}
      alt="Picture of the author" width={500}
      height={500} className="w-2/5 md:w-56 h-56 object-cover mr-4"/>
        {/* <img src={product.image} alt={product.title} className="w-2/5 md:w-56 h-56 object-cover mr-4" /> */}
        <span className='text-lg font-semibold'>{product.title}</span>
      </div>
    </label>
  </div>
))}
      </form>
    </div>
    <button onClick={handleLogout} className='text-xl px-6 hover:bg-red-600 py-2 bg-red-500 text-white font-semibold rounded-md'>Logout</button>

    </div>

  );
};

export default Product;
