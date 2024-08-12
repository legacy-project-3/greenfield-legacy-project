import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight, FaGooglePlay, FaQrcode } from 'react-icons/fa';
import { IoLogoAppleAppstore } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          {/* Exclusive Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Exclusive</h2>
            <p className="mb-1">Subscribe</p>
            <p className="mb-2">Get 10% off your first order</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-black border border-white rounded-l-md py-1 px-2 w-full text-white placeholder-white focus:outline-none"
              />
              <button className="bg-black px-2 rounded-r-md border border-white hover:bg-gray-800">
                <FaArrowRight className="text-xs text-white" />
              </button>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Support</h2>
            <p>111 Bijoy sarani, Dhaka,</p>
            <p>DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Account Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Account</h2>
            <ul className="text-white">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Quick Link</h2>
            <ul className="text-white">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download App Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Download App</h2>
            <p className="mb-2">Save $3 with App New User Only</p>
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <FaQrcode className="text-3xl text-white" />
              </div>
              <div className="flex flex-col justify-center space-y-1">
                <div 
                  onClick={() => window.open('https://play.google.com/store', '_blank')}
                  className="flex items-center space-x-1 bg-black px-2 py-1 rounded-md hover:bg-gray-800 cursor-pointer transition duration-300"
                >
                  <FaGooglePlay className="text-sm text-white" />
                  <span className="text-xs text-white">Google Play</span>
                </div>
                <div 
                  onClick={() => window.open('https://www.apple.com/app-store/', '_blank')}
                  className="flex items-center space-x-1 bg-black px-2 py-1 rounded-md hover:bg-gray-800 cursor-pointer transition duration-300"
                >
                  <IoLogoAppleAppstore className="text-sm text-white" />
                  <span className="text-xs text-white">App Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <FaFacebook className="text-lg hover:text-indigo-500 cursor-pointer" />
          <FaTwitter className="text-lg hover:text-sky-100 cursor-pointer" />
          <FaInstagram className="text-lg hover:text-accent-1 cursor-pointer" />
          <FaLinkedin className="text-lg hover:text-indigo-600 cursor-pointer" />
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-xs text-gray-400">
          <p>© Copyright Rimel 2022. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
