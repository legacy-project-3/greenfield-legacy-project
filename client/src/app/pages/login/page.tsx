"use client"

import React, { useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleLogIn = async (): Promise<void> => {
    const user = { email, password };

    try {
      const response:any = await axios.post('http://127.0.0.1:5000/users/login', user);
      localStorage.setItem("token", response.data.token);
      const decodedToken: any = jwtDecode(response.data.token);
      console.log(decodedToken.userId, "decodedToken");

      let url;
      switch (decodedToken.role) {
        case "admin":
          url = "http://localhost:3001/";
          break;
        case "seller":
          url = `http://localhost:3002/`;
          break;
        default:
          url = "http://localhost:3000/";
      }
      setRedirectUrl(url);
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div>
      <Navbar/>
       <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl items-center justify-center gap-16 p-8">
        <div className="hidden md:flex">
          <img
            src="https://www.chilliapple.co.uk/blog/app/uploads/2023/03/chilliapple-Blog-Image-benefits-of-Having-Mobile-App-for-eCommerce-Business.jpg"
            alt="Login Illustration"
            className="w-[519px] h-[763px] object-cover"
          />
        </div>
        <div className="w-full max-w-md">
          <h3 className="text-3xl font-semibold mb-4 text-black">Log in to Exclusive</h3>
          <p className="text-sm text-black mb-8">Enter your details below</p>
          
          <input
            type="email"
            placeholder="Email or Phone Number"
            className="w-full p-4 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 text-black"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 mb-6 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 text-black"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {redirectUrl ? (
            <Link href={{pathname: redirectUrl, query: {userid: localStorage.getItem("token")}}}>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg mb-4">
                Log In
              </button>
            </Link>
          ) : (
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg mb-4"
              onClick={handleLogIn}
            >
              Log In
            </button>
          )}
          <div className="text-right">
            <a href="#" className="text-sm text-red-600">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
   
  );
};

export default Login;