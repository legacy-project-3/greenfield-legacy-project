'use client';

import React from 'react';
import { FaShoppingCart, FaRegEye, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link';
import axios from 'axios'
import { jwtDecode } from "jwt-decode"

const ProductCard = ({ el }) => {
  console.log('el', el.id)

  const renderRating = (rating: number) => {
    const totalStars = 5;
    const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
    const fullStars = Math.floor(safeRating);
    const halfStar = safeRating % 1 >= 0.5;
    const emptyStars = Math.max(0, totalStars - fullStars - (halfStar ? 1 : 0));

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <svg key={`full-${index}`} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
          </svg>
        ))}
        {halfStar && (
          <svg key="half" className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg key={`empty-${index}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  const addToWhishlist = (id:number) => {
    const token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token)
    const userid = decodedToken.userId
    
    axios.post("http://localhost:5000/whishlist/add", {
      userId: userid,
      productId: id
    }).then(() => {
      console.log("product added successfully to the whishlist")
    }).catch((err) => {
      console.log(err)
    })
  }

  const addToCart = (id:number) => {
    const token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token)
    const userid = decodedToken.userId
    
    axios.post("http://localhost:5000/cart/add", {
      userId: userid,
      productId: id
    }).then(() => {
      console.log("product added successfully to the cart")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="w-[270px] h-[300px] bg-white shadow-lg overflow-hidden relative group">
      <div className="relative">
        <img className="w-full h-[180px] object-cover" src={el.image} alt={el.name} />
        <button className="bg-black text-white font-bold py-2 px-4 absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" onClick={() => addToCart(el.id)}>
          Add To Cart <FaShoppingCart className="ml-2" />
        </button>
      </div>
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <div className="bg-white rounded-full p-1 shadow-md">
          <Link href={{pathname:`/pages/Allproduct/${el.id}`, query: {id:el.id}}}>
            <FaRegEye className="text-gray-500 text-sm" />
          </Link>
        </div>
        <div className="bg-white rounded-full p-1 shadow-md">
          <FaRegHeart className="text-gray-500 text-sm" onClick={() => addToWhishlist(el.id)}/>
        </div>
      </div>
      <div className="p-4">
        <div className="text-lg font-bold">{el.name}</div>
        <span className="text-sm text-pink-700">${el.price}</span>
        <div className="text-orange-400 text-sm mt-1">
          {renderRating(el.rating)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;