'use client'
import React from "react";
import Navbar from "../../components/navbar/page";
import { useState, useEffect } from "react";
import ProductCard from "../../components/productCard/page";
import axios from 'axios'
import { useSearchParams } from "next/navigation";
import Footer from "../../components/footer/page";

const Categoryprod = ()=>{
    const params = useSearchParams();
  const index = params.get("index");
  
     const parsedIndex  = JSON.parse(index)
     const id=parsedIndex+1
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

    const [catdata, setCatdata] =useState<Prod[]>([])

    useEffect(() => {
        axios.get<Product[]>(`http://localhost:5000/product/getbycategory/${id}`)
            .then((res) => {
                const products: Product[] = res.data;
                const data: Prod[] = products.map((el) => ({
                    id: el.id,
                    name: el.name,
                    price: el.price,
                    rating: el.rating,
                    image: el.images[0]?.Url || ''
                }));
                setCatdata(data);
                console.log("data", catdata)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);
  
  return <div>
    <Navbar/>
    <div className="p-4" style={{marginBottom:"50px"}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-8">
        {catdata.map((el) => (
          <ProductCard key={el.id} el={el} />
        ))}
      </div>
      
    </div>

    <Footer/>
</div>
}

export default Categoryprod