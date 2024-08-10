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






