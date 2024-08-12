"use client"

import React ,{useState,useEffect}from "react";
import Link from "next/link";
import axios from'axios'
import { jwtDecode } from "jwt-decode";
import Footer from "../../components/footer/page";
import Navbar from "../../components/navbar/page";
function SignUp() {

const [name,setname]=useState<string> ('')
const [email,setemail]=useState<string>('')
const [password,setapassword]=useState<string>('')

const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

const handlelogin = async () => {
  const newuser = {
    email: email,
    password: password,
    role: "seller",
    address: "address",
    firstName: name,
    lastname: "lastname",
    status: "active"
  };

  try {
    const response = await axios.post('http://127.0.0.1:5000/users/register', newuser);
    localStorage.setItem("token", response.data.token);
    const decodedToken: any = jwtDecode(response.data.token);
    console.log(decodedToken.userId,"decodedToken");
    

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
      <div className="w-full min-h-screen flex items-center justify-center gap-16 bg-white">
      
      <img
        style={{ width: "600px", height: "450px" }}
        className="w-80 h-80 bg-red-600"
        src="https://www.chilliapple.co.uk/blog/app/uploads/2023/03/chilliapple-Blog-Image-benefits-of-Having-Mobile-App-for-eCommerce-Business.jpg"
      />

      <div className="flex flex-col w-60 gap-5  text-black    ">
        <h3 className="font-medium text-2xl text-black ">Create an account</h3>
        <span className="font-small">Enter your detail below</span>

        <input
          placeholder="Name"
          className="w-70 h-10 border-b-2 text-black  border-grey outline-none "
          onChange={(e)=>{setname(e.target.value)}}
        />

        <input
          placeholder="Email or phone number"
          className="w-70 h-70 border-b-2 text-black border-grey outline-none"
          onChange={(e)=>{setemail(e.target.value)}}
        />
         
        <input
          placeholder="Password"
          className="w-70 h-70 border-b-2 text-black border-grey outline-none"
          onChange={(e)=>{setapassword(e.target.value)}}
        />
        {redirectUrl ? (
          <Link href={{pathname:redirectUrl,query:{userid:localStorage.getItem("token")}}} >
            <button className="bg-red-600 text-white text-base p-2">
              Create account
            </button>
          </Link>
        ) : (
          <button onClick={handlelogin} className="bg-red-600 text-white text-base p-2">
            Create account
          </button>
        )}
        

        

        <div className="sign in flex ">
          <button
            style={{ width: "300px" }}
            className="box-border border-2 border-gray-500 p-2 bg-white text-black hover:bg-gray-100 flex items-center space-x-4 "
          >

            <img style={{ width: "30px" }} src="data:image/png;base64,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    "
              alt="" />
            Sign up with google
          </button>
        </div>
        <span>
          Already have account ?{" "}
          <a href="login" style={{ textDecoration: "underline" }}>
            log in
          </a>
        </span>
      </div>
      
    </div>
    <Footer/>
    </div>
    
  );
}


export default SignUp;

