// components/CategoryIcons.js
'use client'
import React from 'react';
import { FaTv, FaTshirt, FaCouch, FaBook, FaPuzzlePiece } from 'react-icons/fa';
import Link from 'next/link';

const categories = [
  { name: 'Electronics', icon: FaTv },
  { name: 'Clothing', icon: FaTshirt },
  { name: 'Home & Garden', icon: FaCouch },
  { name: 'Books', icon: FaBook },
  { name: 'Toys', icon: FaPuzzlePiece },
];

const Category = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center mb-4">
        <div className="bg-red-500 w-5 h-10 rounded-sm mr-2"></div>
        <span className="text-gray-500">Categories</span>
      </div>
      <h2 className="text-2xl font-bold mb-4">Browse By Category</h2>
      <div className="flex space-x-4">
        {categories.map((category, index) => (
          <div key={category.name} className="flex flex-col items-center justify-center w-40 h-40 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition-colors">
            <Link href={{pathname:`/pages/${index}`, query: {index: index}}}>
            <category.icon className="text-3xl mb-2" />
            <span className="text-sm">{category.name}</span>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;