'use client'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useSearchParams } from "next/navigation";
import axios from 'axios';

const Productdetail = () => {
  const params = useSearchParams();
  const id = params.get("id");
  console.log("id", id);

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
    axios.get(`http://localhost:3001/product/oneProduct/${id}`).then((res:any) => {
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
      <>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 fill-yellow-600"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        ))}
        {halfStars && (
          <svg
            key="half"
            className="w-5 fill-yellow-600"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            <rect x="7" y="0" width="7" height="13" fill="#CED5D8" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 fill-[#CED5D8]"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
        ))}
      </>
    );
  };

  return (
    <div className="font-sans">
      <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
        <div className="flex gap-6">
          {/* Left Section: Images */}
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

          {/* Right Section: Product Information */}
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

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-4">
                <button className="text-xl font-bold px-4 py-2 bg-[#DB4444] text-white p-4 rounded border border-gray-400">
                  -
                </button>
                <span className="text-xl font-bold ">1</span>
                <button className="text-xl font-bold px-4 py-2 bg-[#DB4444] text-white p-4 rounded border border-gray-400">
                  +
                </button>
              </div>
              <button
                style={{
                  backgroundColor: "#DB4444",
                  width: "150px",
                  height: "56px",
                  color: "white",
                }}
              >
                Add to Cart
              </button>
              <FontAwesomeIcon
                icon={faHeartRegular}
                className="text-2xl text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
