'use client';
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import ProductCard from "../../components/productCard/page";
import { useRouter } from 'next/navigation'
import Navbar from "../../components/navbar/page";
import Category from "../../components/Category/page";
import Carousel from "../../components/carousel/page";
import Footer from "../../components/footer/page";
const LandingPage = () => {
    const [products, setProducts] = useState<Prod[]>([]);
    const router = useRouter();

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

    const dataa: Prod[] = products.sort((a: any, b: any) => parseFloat(b.rating) - parseFloat(a.rating));
    const bestSelling: Prod[] = dataa.slice(0, 5);
    const firstproducts: Prod[] = products.slice(0, 10);

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex", marginLeft: "90px", marginTop: "80px" }}>
                <div className="categories" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <p>Woman's Fashion</p>
                    <p>Men's Fashion</p>
                    <p>Electronics</p>
                    <p>Home & Lifestyle</p>
                    <p>Medicine</p>
                    <p>Baby's & Toys</p>
                    <p>Groceries & Pets</p>
                    <p>Health & Beauty</p>
                </div>
                <div className="Carousel" style={{ width: '1000px', height: '400px', borderRadius: '0', marginLeft: "100px" }}>
                    <Carousel />
                </div>
            </div>
            <div style={{ marginTop: "60px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#DB4444", height: "40px", width: "20px", borderRadius: "5px", marginLeft: "70px" }}></div>
                    <div style={{ marginLeft: "10px", paddingTop: "10px", fontSize: "24px", fontWeight: "bold" }}>
                        Best Selling
                    </div>
                </div>
                <div style={{ display: "flex", gap: "20px", marginLeft: "100px", marginTop: "20px" }}>
                    {bestSelling.map((el) => {
                        return <ProductCard key={el.id} el={el} />;
                    })}
                </div>
            </div>
            <div style={{ marginTop: "80px" }}> 
                <img src="/Capture d'écran 2024-08-08 213510.png" style={{ width: "1170px", height: "500px", marginLeft: "150px" }} />
            </div>
            <div className="mt-24" style={{ marginLeft: "90px" }}> 
                <Category />
            </div> 
            <div style={{ marginTop: "100px" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ml-8">
                    {firstproducts.map((el) => {
                        return <ProductCard key={el.id} el={el} />;
                    })}
                </div>
                <button onClick={() => { router.push('/pages/Allproduct') }} style={{ backgroundColor: "#DB4444", width: "234px", height: "56px", gap: "10px", marginTop: "50px", marginLeft: "45%", color: "white" }}>
                    View All Products
                </button>
            </div>

            <div className="container mx-auto mt-24" style={{ marginLeft: "90px" }}>
    <div className="flex items-center mb-4">
        <div className="bg-red-500 w-5 h-10 rounded-sm mr-2"></div>
        <span className="text-gray-500">Featured</span>
    </div>
 <div>
    <h2 className="text-2xl font-bold mb-4">New Arrival</h2>
    <div className="imagecontainer" style={{display: "flex", gap: "20px"}}>
        <div className="firstimage">
            <img src="/Capture d'écran 2024-08-11 174910.png" style={{height: "600px", width: "570px"}}/>
        </div>
        <div className="secondimages" style={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <div className="firstsecondimage">
                <img src="/Capture d'écran 2024-08-11 175047.png" style={{height: "284px", width: "570px"}}/>
            </div>
            <div className="secondsecondimages" style={{display: "flex", gap: "20px"}}>
                <div>
                    <img src="/Capture d'écran 2024-08-11 175134.png" style={{height: "284px", width: "270px"}}/>
                </div>
                <div>
                    <img src="/Capture d'écran 2024-08-11 175214.png" style={{height: "284px", width: "270px", marginLeft:"9px"}}/>
                </div>
            </div>
           
          
        </div>
    </div>
    </div>
   
    
</div>
<div style={{ marginBottom: "100px" }}>
<div style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "10px", gap: "40px", marginTop: "100px" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "black" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white" />
            </svg>
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
            <p>MONEY BACK GUARANTEE</p>
            <p>We return money within 30 days</p>
        </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "black" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M20 8h-3V4H3v13h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h1v-5l-3-4zM6 18.5A1.5 1.5 0 1 1 7.5 17 1.5 1.5 0 0 1 6 18.5zm10 0A1.5 1.5 0 1 1 17.5 17 1.5 1.5 0 0 1 16 18.5zM18 12h-5V6h2v4h3z" fill="white" />
            </svg>
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
            <p>FREE AND FAST DELIVERY</p>
            <p>Free delivery for all orders over $140</p>
        </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "black" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 18a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3z" />
                <path d="M3 18a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3z" />
                <path d="M12 22v-2a2 2 0 0 1 2-2h2" />
            </svg>
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
            <p>24/7 CUSTOMER SERVICE</p>
            <p>Friendly 24/7 customer support</p>
        </div>
    </div>
</div>

</div>

<Footer/>


 </div>
    );
};

export default LandingPage;
