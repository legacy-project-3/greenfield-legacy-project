"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { parse } from 'path';
import Swal from 'sweetalert2';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
const CheckoutForm = () => {
  const params= useSearchParams()
  const sum : any = params.get("total")
  const total = JSON.parse(sum)
  console.log("total",total)
  return (
    <div>
      <Navbar/>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                    <input type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                  </div>
                  <div>
                    <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
                    <input type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label htmlFor="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                    </div>
                    <select id="select-country-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                      <option selected>United States</option>
                      <option value="AS">Australia</option>
                      <option value="FR">France</option>
                      <option value="ES">Spain</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label htmlFor="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                    </div>
                    <select id="select-city-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                      <option selected>San Francisco</option>
                      <option value="NY">New York</option>
                      <option value="LA">Los Angeles</option>
                      <option value="CH">Chicago</option>
                      <option value="HU">Houston</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                    <div className="flex items-center">
                      <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                        <svg fill="none" aria-hidden="true" className="me-2 h-4 w-4" viewBox="0 0 20 15">
                          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                          <g>
                            <path fill="#D02F44" fillRule="evenodd" d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z" clipRule="evenodd" />
                            <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                            <g filter="url(#filter0_d_343_121520)">
                              <path
                                fill="url(#paint0_linear_343_121520)"
                                fillRule="evenodd"
                                d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                clipRule="evenodd"
                              />
                            </g>
                          </g>
                          <defs>
                            <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#fff" />
                              <stop offset="1" stopColor="#F0F0F0" />
                            </linearGradient>
                            <clipPath id="clip0_343_121520">
                              <path fill="#fff" d="M0 0h20v15H0z" />
                            </clipPath>
                            <filter id="filter0_d_343_121520" width="8.4" height="8.4" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                              <feOffset />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
                              <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
                            </filter>
                          </defs>
                        </svg>
                        +1
                        <svg className="ms-2 h-2.5 w-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1 5 5 1 1" />
                        </svg>
                      </button>
                      <input type="tel" id="phone-input-3" className="z-0 block w-full rounded-e-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="+1 558 547 589" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address* </label>
                    <input type="text" id="address" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="123 Your address" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Message </label>
                    <textarea id="message" rows={4} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Write your message here..." />
                  </div>
                </div>
              </div>
              <div className="pt-8 sm:pt-10">
                <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Payment details</h2>
                <ul className="flex flex-wrap gap-x-6 gap-y-4">
                  <li>
                    <img className="h-6" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/payments/paypal.svg" alt="PayPal" />
                  </li>
                  <li>
                    <img className="h-6" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/payments/mastercard.svg" alt="MasterCard" />
                  </li>
                  <li>
                    <img className="h-6" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/payments/visa.svg" alt="Visa" />
                  </li>
                  <li>
                    <img className="h-6" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/payments/amex.svg" alt="Amex" />
                  </li>
                  <li>
                    <img className="h-6" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/payments/apple-pay.svg" alt="Apple Pay" />
                  </li>
                  <li>
                    <img className="h-6" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/payments/google-pay.svg" alt="Google Pay" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 w-full lg:mt-0 lg:max-w-xs">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Order summary</h2>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-700">
                <div className="space-y-1 border-b border-gray-200 pb-4 dark:border-gray-600">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">${total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Shipping</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Tax</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">$0.00</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="text-base font-medium text-gray-900 dark:text-white">${total}</span>
                  </div>
                  {/* <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Including $48.00 in taxes</p> */}
                </div>
              
                 <button 
                     type="submit" 
                     onClick={()=>{
                      Swal.fire({
                        width:"750px",

                        icon: "success",
                        title: "Thank you for your purchase",
                        showConfirmButton: false,
                        timer: 1500
                      });
                     }}
                     className="w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                   Proceed To Payment
                 </button>


              </div>
            </div>
          </div>
        </form>
      </section>
      <Footer/>
    </div>
  );
};

export default CheckoutForm;