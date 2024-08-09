"use client"
import axios from "axios";
import React, { useState } from "react";
// import Navbar from '../../components/navbar/navbar';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  type UserResponse = {
    token: string;
    user: {
      type: string;
    };
  };

  const handleLogIn = (): void => {
    const user = { email, password };

    axios
      .post<UserResponse>("http://localhost:5000/users/login", user )
      .then((response) => {
        console.log(response);
        console.log("success");
        localStorage.setItem("token", response.data.token);
        console.log(localStorage);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log('Requesting login with:', { email, password });


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* <Navbar /> */}
      <div className="flex w-full max-w-6xl items-center justify-center gap-16 p-8">
        <div className="hidden md:flex">
          <img
            src="https://www.chilliapple.co.uk/blog/app/uploads/2023/03/chilliapple-Blog-Image-benefits-of-Having-Mobile-App-for-eCommerce-Business.jpg"
            alt="Login Illustration"
            className=" w-[519px] h-[763px] object-cover"
            
            
          />  


        </div>
        <div className="w-full max-w-md">
          <h3 className="text-3xl font-semibold mb-4 text-black  ">Log in to Exclusive</h3>
          <p className="text-sm text-black mb-8">Enter your details below</p>
                    
          <input
            type="email"
            placeholder="Email or Phone Number"
            className="w-full p-4 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 mb-6 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg mb-4"
            onClick={handleLogIn}
          >
            Log In
          </button>
          <div className="text-right">
            <a href="#" className="text-sm text-red-600">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;














// "use client";
// import axios, { AxiosError } from "axios";
// import React, { useState } from "react";

// type UserResponse = {
//   token: string;
//   user: {
//     type: string;
//   };
// };

// const Login: React.FC = () => {
//   const [mail, setMail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const handleLogIn = async (): Promise<void> => {
//     try {
//       console.log("Attempting to log in with:", { mail, password });

//       const response = await axios.post<UserResponse>("http://localhost:3000/users/login", {
//         mail,
//         password,
//       });

//       console.log("Login successful:", response.data);
//       localStorage.setItem("user", response.data.token);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Axios error:", error.response?.data);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="flex w-full max-w-6xl items-center justify-center gap-16 p-8">
//         <div className="hidden md:flex">
//           <img
//             src="https://www.chilliapple.co.uk/blog/app/uploads/2023/03/chilliapple-Blog-Image-benefits-of-Having-Mobile-App-for-eCommerce-Business.jpg"
//             alt="Login Illustration"
//             className="w-[519px] h-[763px] object-cover"
//           />
//         </div>
//         <div className="w-full max-w-md">
//           <h3 className="text-3xl font-semibold mb-4 text-black">Log in to Exclusive</h3>
//           <p className="text-sm text-black mb-8">Enter your details below</p>

//           <input
//             type="email"
//             placeholder="Email or Phone Number"
//             className="w-full p-4 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 text-black"
//             onChange={(e) => setMail(e.target.value)}
//             value={mail}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-4 mb-6 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 text-black"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           <button
//             className="w-full bg-red-600 text-white py-3 rounded-lg mb-4"
//             onClick={handleLogIn}
//           >
//             Log In
//           </button>
//           <div className="text-right">
//             <a href="#" className="text-sm text-red-600">
//               Forgot Password?
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
