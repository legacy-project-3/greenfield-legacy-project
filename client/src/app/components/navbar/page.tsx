'use client'
import React from 'react';
import { useState } from 'react';
import { Input } from "@material-tailwind/react";
import Link from 'next/link';

interface Prod {
    id: number;
    name: string;
    price: string;
    rating: string;
    image: string;
}


const Navbar = () => {
    
    const [isOpen, setIsopen] = useState<boolean>(false);
    const toggleDropdown = () => {
        setIsopen(!isOpen);
    }
    return (
        <div>
           <div className="bg-black text-white h-12 w-full mx-auto mb-2 flex items-center justify-between px-4">
                <div className="text-center flex-grow">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! Shop Now
                </div>
                <div className="ml-auto">
                    English
                </div>
            </div>
            <div className="flex flex-wrap place-items-center">
                <section className="relative mx-auto">
                    <nav className="flex justify-between text-black w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                            <div className="text-3xl font-bold font-heading">
                                Exclusive
                            </div>
                            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                              <li className="hover:underline">
                              <Link href="/pages/LandingPage">Home</Link>
                              </li>
                            <li className="hover:underline">
                               <Link href="/pages/Contact">Contact</Link>
                            </li>
                           <li className="hover:underline">
                            <Link href="/pages/About">About</Link>
                           </li>
                          <li className="hover:underline">
                             {! localStorage.getItem("token") && <Link href="/pages/signup">Signup</Link>}
                           </li>
                           </ul>
                            <div className="max-w-md mx-auto">
                                <div className="relative flex items-center w-full h-12 overflow-hidden bg-gray-200">
                                    <div className="grid place-items-center h-full w-12 text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-gray-200"
                                        type="text"
                                        id="search"
                                        placeholder="Search something.."
                                    />
                                </div>
                            </div>
                            <div className="hidden xl:flex items-center space-x-5 relative">
                                <div className="hover:text-black-200">
                                    <Link href={{pathname:"/pages/Whishlist"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    </Link>
                                   
                                </div>
                                <div className="flex items-center hover:text-gray-200">
                                    <Link href="/pages/cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    </Link>
                                    
                                    <span className="flex absolute -mt-5 ml-4">
                                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                    </span>
                                </div>
                                <a className="flex items-center hover:text-gray-200 relative" onClick={toggleDropdown}>
                                    <div className="bg-pink-500 rounded-full p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg" style={{ top: '100%' }}>
                                            { localStorage.getItem("token") && <div>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Manage my Account</a>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My order</a>
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My cancellations</a>
                                            </div>}
                                            
                                            { ! localStorage.getItem("token") && <Link href="/pages/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>}
                                            {localStorage.getItem("token") && <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100"><button onClick={()=>{ localStorage.clear()}}>Logout</button></Link>}
                                        </div>
                                    )}
                                </a>
                            </div>
                        </div>
                        <a className="xl:hidden flex mr-6 items-center" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="flex absolute -mt-5 ml-4">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                            </span>
                        </a>
                        <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </a>
                    </nav>
                </section>
            </div>
        </div>
    );
};

export default Navbar;
