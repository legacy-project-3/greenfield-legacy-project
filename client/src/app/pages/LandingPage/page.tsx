'use client';
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import ProductCard from "../../components/productCard/page";
import { useRouter } from 'next/navigation'
import Navbar from "../../components/navbar/page";
import Category from "../../components/Category/page";
const LandingPage = () => {
    const [products, setProducts] = useState<Prod[]>([]);
    const router = useRouter()

   

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
        axios.get<Product[]>('http://localhost:3001/product/getprodpic')
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

    const dataa: Prod[] = products.sort((a: any, b: any) => parseFloat(b.rating) - parseFloat(a.rating));
    const bestSelling: Prod[] = dataa.slice(0, 5);
    const firstproducts: Prod[] = products.slice(0, 10);

    return (
        <div>
            <Navbar bestSelling = {bestSelling}/>
          <div>
            <div>Best Selling</div>
            <div style={{ display: "flex", gap: "20px", marginLeft: "50px" }}>
                {bestSelling.map((el) => {
                    return <ProductCard el={el} />;
                })}
            </div>
            <div>
                <img src="/Capture d'écran 2024-08-08 213510.png" style={{width:"1170", height:"500px"}}/>
            </div>
            <div style={{marginTop:"100px"}}>
                <div style={{display:"flex"}}>
                    <div style={{backgroundColor:"#DB4444", height:"40px", width:"20px", borderRadius:"5px", marginLeft:"40px" }}></div>
                    <div style={{marginLeft: "10px", paddingTop:"10px"}}>Browse By Category</div>
                </div>
                <Category/>
            </div>
            <div style={{marginTop: "600px"}}> 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ml-8">
                    {firstproducts.map((el) => {
                        return <ProductCard el={el} />;
                    })}
                </div>
             <button onClick={()=>{router.push('/pages/Allproduct')}} style={{backgroundColor: "#DB4444", width:"234px", height:"56px", gap:"10px", marginTop:"50px", marginLeft:"45%", color: "white"}}> View All Products</button> 
    
      
            </div>
        </div>
        </div>
       
    );
};

export default LandingPage;
