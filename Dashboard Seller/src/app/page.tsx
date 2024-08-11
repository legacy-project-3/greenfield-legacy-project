"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {jwtDecode} from "jwt-decode";

export default function Home() {
  const searchParams = useSearchParams();
  const [userid, setUserid] = useState<string | null>(null);

  const fetchToken=async()=>{
    try{
      const userIdParam = await searchParams.get('userid');
    if (userIdParam) {
      await setUserid(userIdParam)
      const decodedToken: any = jwtDecode(userIdParam);
      await localStorage.setItem("token",decodedToken.userId);
        console.log(decodedToken.userId,"decodedToken");
      console.log('Received user ID:', userIdParam);
    }
  }
    catch(error){
      console.log(error);
    }
  }
    
    
  

  useEffect(() => {
    fetchToken()
    
    
  
  }, [searchParams]);
  console.log(userid,"userid");

  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}