'use client'
import React, { useState, useEffect } from "react";
import "./cart.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2";
import Footer from "../../components/footer/page";
import Navbar from "../../components/navbar/page";
import Link from "next/link";
const Cart = () => {

    interface Prosss {
        id: number,
        quantity: number,
        createdAt: string;
        updatedAt: string;
        userId: string,
        productId: number;
        product: Product

    }

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

    interface Res {
        id: number;
        name: string;
        price: string;
        quantity: number;
        image: string;
    }
  const [cartdata, setCartdata] = useState<Res[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState<number>(0)
  useEffect(()=>{
    const token =localStorage.getItem("token") 
      const decodedToken = jwtDecode(token)
      
      const userid = decodedToken.userId 
      setUserId(userid)
   }, [])
  

  useEffect(() => {
 
  
 
  axios.get(`http://localhost:5000/cart/getOne/${jwtDecode(localStorage.getItem("token")).userId}`)
      .then((res) => {
        const dataa: Prosss[] = res.data;
        const newdata: Res [] = dataa.map((el) => {
          
          return {
            id: el.id,
            name: el.product.name,
            image: el.product.images[0].Url,
            price: el.product.price,
            quantity: el.quantity,
          };
        });
        setCartdata(newdata);
      });
  }, [refresh]);

  const deleteProduct = (id:number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/cart/delete/${id}`)
          .then(() => {
            setRefresh(!refresh);
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const updateQuantity = (itemid:number, newquantity:number) => {
    if (newquantity <= 0) return;
    axios
      .put(`http://localhost:5000/cart/update/${itemid}`, {
        quantity: newquantity,
      })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log("error updating the item", error);
      });
  };

  const total = cartdata.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div>
      <Navbar/>
       <div className="cartpage" style={{marginBottom:"50px"}}>
        
        <div className="home-cart">
          <div className="home">
            Home /
          </div>
          <div>
            Cart
          </div>
        </div>
        <div className="cart-container" style={{marginBottom:"100px"}}>
          <div className="cart-header">
            <div className="cart-cell">Product</div>
            <div className="cart-cell">Price</div>
            <div className="cart-cell">Quantity</div>
            <div className="cart-cell">Subtotal</div>
            <div className="cart-cell">Delete</div>
          </div>
          {cartdata.map((item) => (
            <div key={item.id} className="cart-row">
              <div className="cart-cell product-cell">
                <img src={item.image} alt={item.name} className="product-image" />
                <div className="name">{item.name}</div>
              </div>
              <div className="cart-cell">${item.price}</div>
              <div className="cart-cell">
                <div className="item-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="cart-cell">${item.price * item.quantity}</div>
              <div className="cart-cell">
                <button  onClick={() => deleteProduct(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="shop-cart">
            <div className="coupon">
              <input className="inputcoupon" placeholder="Coupon code"></input>
              <button className="checkout">Apply coupon</button>
            </div>
            <div className="total">
              <p className="ptotal">Cart total</p>
              <div className="subtotal">
                <div className="subtotal-total">Subtotal</div>
                <div className="subtotal-not">${total.toFixed(3)}</div>
              </div>
              <div className="subtotal">
                <div className="subtotal-total">Shipping</div>
                <div className="subtotal-not">free</div>
              </div>
              <div className="subtotal">
                <div className="subtotal-total">Total</div>
                <div className="subtotal-not">${total.toFixed(3)}</div>
              </div>
              <Link href={{pathname:"/pages/Checkout", query :{total: total.toString()}}}>
              <button className="checkout">Proceed to checkout</button>
              </Link>
             
            </div>
          </div>
        </div>
        
      </div>
      <Footer/>
    </div>
    
   
  );
};

export default Cart;
