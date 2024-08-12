'use client'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular, faStar, faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";
import axios from 'axios';
import { jwtDecode } from "jwt-decode"

const Productdetail = () => {
  const params = useSearchParams();
  const id = params.get("id");
  

  const [oneProd, setOneprod] = useState<Prod | null>(null);
  const [mainImage, setMainimage] = useState<string>("");

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
    description: string;
    images: Image[];
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/product/oneProduct/${id}`).then((res:any) => {
      console.log("res", res.data);
      const prod: Product = res.data[0];
      const dataa: Prod = {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        rating: prod.rating,
        images: prod.images,
      };
      setOneprod(dataa);
      if (prod.images && prod.images.length > 0) {
        setMainimage(prod.images[0].Url);
      }
      console.log("oneproduct", dataa);
    });
  }, [id]);

  const handleImageClick = (clickedImage: string) => {
    if (oneProd && mainImage) {
      const updatedImages = oneProd.images.map((image) =>
        image.Url === clickedImage ? { ...image, Url: mainImage } : image
      );
      setOneprod({ ...oneProd, images: updatedImages });
      setMainimage(clickedImage);
    }
  };

  const renderStars = (rating: string) => {
    const ratingValue = parseFloat(rating);
    const fullStars = Math.floor(ratingValue);
    const halfStars = ratingValue % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`full-${i}`}
            icon={faStarSolid}
            className="text-yellow-500"
          />
        ))}
        {halfStars && (
          <FontAwesomeIcon
            key="half"
            icon={faStarHalfAlt}
            className="text-yellow-500"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon
            key={`empty-${i}`}
            icon={faStarEmpty}
            className="text-gray-400"
          />
        ))}
      </div>
    );
  };

  const addToCart = (id: number) => {
    const token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token)
    const userid = decodedToken.userId
    
    axios.post("http://localhost:5000/cart/add", {
      userId: userid,
      productId: id
    }).then(() => {
      console.log("product added successfully to the cart")
    }).catch((err) => {
      console.log(err)
    })
  }

  const addToWhishlist = (id:number) => {
    const token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token)
    const userid = decodedToken.userId
    
    axios.post("http://localhost:5000/whishlist/add", {
      userId: userid,
      productId: id
    }).then(() => {
      console.log("product added successfully to the whishlist")
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Navbar/>
      <div className="font-sans" style={{marginBottom:"50px"}}>
        <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
          <div className="flex gap-6">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                {oneProd?.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image.Url}
                    alt={`Product ${index + 1}`}
                    style={{ width: "170px", height: "138px", objectFit: "cover" }}
                    onClick={() => handleImageClick(image.Url)}
                  />
                ))}
              </div>
              <img
                src={mainImage}
                alt="Main Product"
                style={{ width: "500px", height: "600px", objectFit: "cover" }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {oneProd?.name}
              </h2>

              <div className="flex space-x-2 mt-4">
                {oneProd?.rating && renderStars(oneProd.rating)}
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">
                  ${oneProd?.price}
                </p>
              </div>

              <div className="mt-8">
                <div>{oneProd?.description}</div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button
                  style={{
                    backgroundColor: "#DB4444",
                    width: "150px",
                    height: "56px",
                    color: "white",
                  }}
                  onClick={()=>{addToCart(id)}}
                >
                  Add to Cart
                </button>
                <FontAwesomeIcon
                  icon={faHeartRegular}
                  className="text-2xl text-black"
                  onClick={()=>{addToWhishlist(id)}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Productdetail;
