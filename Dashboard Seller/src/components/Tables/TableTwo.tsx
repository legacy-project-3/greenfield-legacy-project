"use client"
import Image from "next/image";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "@material-tailwind/react";
import {jwtDecode} from "jwt-decode";

const TableTwo = () => {
  const [products, setProducts] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // const [id, setId] = useState<string>("");
  // console.log(id,"id");
  // const fetchToken=async()=>{
  //   try{
  //     const token = await localStorage.getItem("token");
  //     if(token){
  //     const decodedToken:any = await  jwtDecode(token);
  //     setId(decodedToken.id);
  //       console.log(id);
        
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchToken()
  //   }, []);

 
  

 
    
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/product/prodimage/${localStorage.getItem("token")}`);
      const filteredUsers = response.data;
      setProducts(filteredUsers);
      console.log(filteredUsers,'cikon');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Rating</p>
        </div>
      </div>

      {currentProducts.map((product: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={product.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.images[0].Url} alt="Product" style={{width: '50px', height: '60px'}} />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.quantity}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3"><Rating style={{color:"wheat",borderColor:"black"}} readonly={true} value={parseInt(product.rating)} /></p>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-4 px-4 py-4.5">
        <button 
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={nextPage}
          disabled={indexOfLastProduct >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableTwo;