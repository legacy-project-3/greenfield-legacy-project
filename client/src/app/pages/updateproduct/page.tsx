'use client'

import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { jwtDecode } from "jwt-decode"


const Updateproduct = ()=>{
  
  const [id,setId]= useState<string | null>(null);  
  const [imagePreview, setImagePreview] = useState<string[]>([])
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [quantity, setQuantity]= useState<number>(0)
  const [price, setPrice] =useState<number>(0)
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([])
  const [categoryId, setCategoryId] = useState<string>("");
   
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files) as File[];
      fileArray.forEach((file: File) => {
        transformImages(file);
      });
    }
  };



  const transformImages = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setImagePreview(prev => [...prev, reader.result as string]); 
      }
    };
  }

  type DecodedToken = {
    userId: string;
    
  };
    
  


type Category = {
    id: string;
    name: string;
  };
  
  useEffect(() => {
    axios.get<Category[]>("http://localhost:5000/category/get")
      .then((res) => {
        const data = res.data;
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);







  const updateProduct = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

    const userId = decodedToken.userId;
    if (!userId) {
      console.error("No userId found in token");
      return;
    }

    interface ProductResponse {
        id: number;
        name:string;
        description:string;
        quantity:string;
        price:any;
      }

    axios.put<ProductResponse>(`http://localhost:3000/product/update/${id}`, {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        categoryId: categoryId,
        userId: userId
      })
      .then((res) => {
        const productId: number = res.data.id;
        imagePreview.forEach((el) => {
          axios.put(`http://localhost:3000/images/update/${id}`, {
            Url: el,
            productId: productId
          })
          .then(() => {
            console.log("Image added successfully to the product and to the database");
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
















    return (
       
        <div className="bg-white border border-4 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Add Product</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
  
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                name="product-name"
                id="product-name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Apple Imac 27”"
                onChange={(e)=>{setName(e.target.value)}}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                name="brand"
                id="brand"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Apple"
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="$2300"
                onChange={(e)=>{setPrice(Number(e.target.value))}}
                required
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="product-details"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Product Description
              </label>
              <textarea
                id="product-details"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                placeholder="Details"
                onChange={(e)=>{setDescription(e.target.value)}}
              ></textarea>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="image-upload"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Upload Images
              </label>
              <input
                type="file"
                multiple = {true}
                id="image-upload"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                onChange={handleImage}
                
              />
              <div className="flex space-x-4 mt-4">
                {imagePreview && imagePreview.map((el, index)=>{
                  return <div>
                    <img
                    key={index}
                    src={el}
                    className="h-40 w-auto rounded-lg shadow-md"
                    />
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
  
        <div className="p-6 border-t border-gray-200 rounded-b flex justify-end">
          <button
            className="text-white bg-[#DB4444] hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit" onClick={()=>{updateProduct()}}
          >
            Save all
          </button>
        </div>
      </div>
    )
}

export default Updateproduct




























    "use client";
    import { useSearchParams } from "next/navigation";


    export default function UpdateProduct(){

        const searchParams = useSearchParams();
        const product:any = searchParams.get('product');
        const productData:any = JSON.parse(product);
        console.log(productData,'cikon');

        return(
            <div>
                <h1>Update Product</h1>
            </div>
        )



}


// "use client";
// import React from "react";

// function UpdateProduct() {
//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             <img
//               className="w-full h-48 object-cover"
//               src="https://via.placeholder.com/600x360"
//               alt="Placeholder Image"
//             />
//           </div>
//           <div className="p-4">
//             <div className="text-lg font-medium text-gray-800 mb-2">Title</div>
//             <p className="text-gray-500 text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Update
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
 
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             <img
//               className="w-full h-48 object-cover"
//               src="https://via.placeholder.com/600x360"
//               alt="Placeholder Image"
//             />
//           </div>
//           <div className="p-4">
//             <div className="text-lg font-medium text-gray-800 mb-2">Title</div>
//             <p className="text-gray-500 text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Update
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             <img
//               className="w-full h-48 object-cover"
//               src="https://via.placeholder.com/600x360"
//               alt="Placeholder Image"
//             />
//           </div>
//           <div className="p-4">
//             <div className="text-lg font-medium text-gray-800 mb-2">Title</div>
//             <p className="text-gray-500 text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Update
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             <img
//               className="w-full h-48 object-cover"
//               src="https://via.placeholder.com/600x360"
//               alt="Placeholder Image"
//             />
//           </div>
//           <div className="p-4">
//             <div className="text-lg font-medium text-gray-800 mb-2">Title</div>
//             <p className="text-gray-500 text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Update
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             <img
//               className="w-full h-48 object-cover"
//               src="https://via.placeholder.com/600x360"
//               alt="Placeholder Image"
//             />
//           </div>
//           <div className="p-4">
//             <div className="text-lg font-medium text-gray-800 mb-2">Title</div>
//             <p className="text-gray-500 text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Update
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             <img
//               className="w-full h-48 object-cover"
//               src="https://via.placeholder.com/600x360"
//               alt="Placeholder Image"
//             />
//           </div>
//           <div className="p-4">
//             <div className="text-lg font-medium text-gray-800 mb-2">Title</div>
//             <p className="text-gray-500 text-sm">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, mi sed egestas tincidunt, libero dolor bibendum nisl, non aliquam quam massa id lacus.
//             </p>
//             <div className="flex justify-between mt-4">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//                 Update
//               </button>
//               <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateProduct;
