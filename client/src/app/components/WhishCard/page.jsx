'use client'
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios'


const renderRating = (rating) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <svg key={index} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
        </svg>
      ))}
      {halfStar && (
        <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg key={index} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

const WishCard = ({ el, refresh, setRefresh }) => {
  

const deleteFromList = (id)=>{
  axios.delete(`http://localhost:3001/whishlist/delete/${id}`).then(()=>{
    console.log("item deleted successfully")
    setRefresh(!refresh)
  }).catch((err)=>{
    console.log(err)
  })
}

  return (
    <div className="w-[270px] h-[300px] bg-white shadow-lg overflow-hidden relative group">
      <div className="relative">
        <img className="w-full h-[180px] object-cover" src={el.image} alt={el.name} />
        <button className="bg-black text-white font-bold py-2 px-4 absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          Add To Cart <FaShoppingCart className="ml-2" />
        </button>
      </div>
      <div className="absolute top-2 right-2 flex flex-col space-y-2" onClick={()=>{deleteFromList(el.id)}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9,3V4H4V6H5V19C5,20.1 5.9,21 7,21H17C18.1,21 19,20.1 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
          />
        </svg>
      </div>
      <div className="p-4">
        <div className="text-lg font-bold">{el.name}</div>
        <span className="text-sm text-pink-700">${el.price}</span>
        <div className="text-orange-400 text-sm mt-1">
          {renderRating(parseFloat(el.rating))} 
        </div>
      </div>
    </div>
  );
};

export default WishCard;
