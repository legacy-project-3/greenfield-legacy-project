'use client'
import React from "react";
import axios from 'axios'
import WhishCard from '../../components/WhishCard/page'
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/page";

import ProductCard from "../../components/productCard/page";
import Footer from "../../components/footer/page";
import { jwtDecode } from "jwt-decode"
const Whishlist = () =>{

    const [whish, setWish] = useState <newdataa[]>([])
    const [refresh, setRefresh] = useState <boolean>(false)
    const [products, setProducts] = useState <Product[]>([])
    const [userId, setUserId] = useState<number>(0)

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
        image: string,
        productId: number
      }

      interface Prod {
        id: number;
        name: string;
        price: string;
        rating: string;
        image: string;
    }

     useEffect(()=>{
      const token =localStorage.getItem("token") 
        const decodedToken = jwtDecode(token)
        
        const userid = decodedToken.userId 
        setUserId(userid)
     }, [])
      const fetchpro = ()=>{
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
                const dataa: Prod[] = data.sort((a: any, b: any) => parseFloat(b.rating) - parseFloat(a.rating));
                const bestSelling: Prod[] = dataa.slice(0, 5);
                setProducts(bestSelling)
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
      }
      const fetchdata = ()=>{
        
        axios.get<ProdResponse[]>(`http://localhost:5000/whishlist/whishOneuser/${jwtDecode(localStorage.getItem("token")).userId}`)
          .then((res) => {
            const data: ProdResponse[] = res.data
            const newdata: newdataa[] = data.map((el)=>{
                return {
                    id:el.id,
                    name: el.product.name,
                    price: el.product.price,
                    rating: el.product.rating,
                    image: el.product.images[0].Url,
                    productId: el.productId

                }
            })
            setWish(newdata)
            console.log("new", newdata)
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
      }

      useEffect(() => {
        fetchdata()
        fetchpro()
      }, [refresh]);

     const moveAlltoBag = async ()=>{
     
      whish.forEach(async (el)=>{
        console.log("el.id", el)
         await  axios.post("http://localhost:5000/cart/add", {
          userId: userId,
          productId: el.productId
        }).then( ()=>{
         axios.delete(`http://localhost:5000/whishlist/delete/${el.id}`)
         
          
        })
        
        .then(() => {

          console.log("product added successfully to the cart")
          fetchdata()
        })
        .catch((err) => {
          console.log(err)
        })
      })
      
      }
    return <div>
      <Navbar/>
      <button onClick={()=>{ moveAlltoBag()}} style={{ backgroundColor: "#DB4444", width: "234px", height: "56px", gap: "10px", marginTop: "50px", marginLeft: "1200px", color: "white" }}>Move All to Bag</button>
      <div style={{display: "flex", gap: "20px", marginLeft: "50px", marginTop:"100px" }}>
      {whish.map((el)=>{
        return <WhishCard el={el} refresh={refresh} setRefresh={setRefresh}/>
      })}
         </div>
      
                <div style={{display:"flex", marginTop:"200px", paddingBottom:"0px"}}>
                    <div style={{backgroundColor:"#DB4444", height:"40px", width:"20px", borderRadius:"5px", marginLeft:"40px" }}></div>
                    <div style={{marginLeft: "10px", paddingTop:"10px"}}>For you</div>
                </div>
      <div style={{ display: "flex", gap: "20px", marginLeft: "50px", marginTop:"70px", marginBottom:"100px"}}>
        {products.map((el)=>{
          return <ProductCard el={el}/>
        })}
      </div>

      <Footer/>
      
    </div>
}

export default Whishlist