'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/productCard/page';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';



const Allproduct= () => {
  const [products, setProducts] = useState<Prod[]>([]);
  interface Image {
    id: number;
    Url: string;
    createdAt: string;
    updatedAt: string;
    productId: number;
  }
  
  interface Product {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: string;
    rating: string;
    color: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    images: Image[];
  }
  
  interface Prod {
    id: number;
    name: string;
    price: string;
    rating: string;
    image: string;
  }

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/product/getprodpic')
      .then((res) => {
        const products: Product[] = res.data;
        const data: Prod[] = products.map((el) => ({
          id: el.id,
          name: el.name,
          price: el.price,
          rating: el.rating,
          image: el.images[0]?.Url || ''
        }));
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <Navbar/>
       <div>
     
     <div className="p-4" style={{marginBottom:"50px"}}>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-8">
       {products.map((el) => (
         <ProductCard key={el.id} el={el} />
       ))}
     </div>
   </div>
   </div>
   <Footer/>
    </div>
   
    
  );
}

export default Allproduct;
