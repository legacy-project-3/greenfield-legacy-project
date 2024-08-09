"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  const searchParams = useSearchParams();
  const [userid, setUserid] = useState<string | null>(null);

  useEffect(() => {
    const userIdParam = searchParams.get('userid');
    
    if (userIdParam) {
      setUserid(userIdParam);
      localStorage.setItem("token",userIdParam);
      console.log('Received user ID:', userIdParam);
    }
  }, [searchParams]);
  console.log(userid,"userid");

  return (
    <>
      <DefaultLayout>
        <ECommerce userId={userid} />
      </DefaultLayout>
    </>
  );
}