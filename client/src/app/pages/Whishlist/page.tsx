'use client'
import React from "react";
import axios from 'axios'
import WhishCard from '../../components/WhishCard/page'
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/page";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/productCard/page";
import { jwtDecode } from "jwt-decode"
const Whishlist = () =>{
  const params = useSearchParams();
  const bestSelling = JSON.parse(params.get("bestSelling") || "")
    const [whish, setWish] = useState <newdataa[]>([])
    const [refresh, setRefresh] = useState <boolean>(false)

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
      
      interface ProdResponse {
        id: number;
        createdAt: string;
        updatedAt: string;
        userId: number;
        productId: number;
        product: Product;
      }
      
      interface newdataa {
        id:number,
        name: string,
        rating: string, 
        price: string,
        image: string
      }

      useEffect(() => {
        const token =localStorage.getItem("token") 
        const decodedToken = jwtDecode(token)
        
        const userid = decodedToken.userId 
        axios.get<ProdResponse[]>(`http://localhost:3001/whishlist/whishOneuser/${userid}`)
          .then((res) => {
            const data: ProdResponse[] = res.data
            const newdata: newdataa[] = data.map((el)=>{
                return {
                    id:el.id,
                    name: el.product.name,
                    price: el.product.price,
                    rating: el.product.rating,
                    image: el.product.images[0].Url

                }
            })
            setWish(newdata)
            console.log("new", newdata)
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
      }, [refresh]);
    return <div>
      <Navbar/>
      <div style={{display: "flex", gap: "20px", marginLeft: "50px", marginTop:"100px" }}>
      {whish.map((el)=>{
        return <WhishCard el={el} refresh={refresh} setRefresh={setRefresh}/>
      })}
         </div>
      
                <div style={{display:"flex", marginTop:"200px", paddingBottom:"0px"}}>
                    <div style={{backgroundColor:"#DB4444", height:"40px", width:"20px", borderRadius:"5px", marginLeft:"40px" }}></div>
                    <div style={{marginLeft: "10px", paddingTop:"10px"}}>For you</div>
                </div>
      <div style={{ display: "flex", gap: "20px", marginLeft: "50px", marginTop:"70px" }}>
        {bestSelling.map((el)=>{
          return <ProductCard el={el}/>
        })}
      </div>
      
    </div>
}

export default Whishlist