'use client'

import React from 'react';
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
const About = () => {
  return (
    <div>
        <Navbar/>
      
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 mb-8 text-sm">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">About</span>
      </nav>

      {/* Our Story Section */}
      <section className="flex flex-col md:flex-row justify-between items-start mb-16">
        <div className="w-full md:w-1/2 pr-8">
          <h1 className="text-5xl font-bold font-['Inter'] mb-6">Our Story</h1>
          <div className="text-base font-normal font-['Poppins'] leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
          </div>
          <div className="text-base font-normal font-['Poppins'] leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion.
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <img src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Shopping" className="w-full h-auto rounded-lg" />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { number: "10.5k", text: "Sellers active our site", icon: "store" },
          { number: "33k", text: "Monthly Product Sale", icon: "trending_up" },
          { number: "45.5k", text: "Customer active in our site", icon: "groups" },
          { number: "25k", text: "Annual gross sale in our site", icon: "attach_money" }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="p-6 rounded-lg bg-white border border-gray-200 hover:bg-red-500 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
              <span className="material-icons text-white text-2xl">{stat.icon}</span>
            </div>
            <h3 className="text-3xl font-bold font-['Inter'] mb-2">{stat.number}</h3>
            <p className="text-sm font-['Poppins']">{stat.text}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Tom Cruise", role: "Founder & Chairman", image: "https://play-lh.googleusercontent.com/ai7FC9zp1bG8zLcl97w9rNde_oZ5s086XP1ZkBFdwf72d_owIiUVJu1-XNp6eOO-AGg" },
            { name: "Emma Watson", role: "Managing Director", image: "https://play-lh.googleusercontent.com/ai7FC9zp1bG8zLcl97w9rNde_oZ5s086XP1ZkBFdwf72d_owIiUVJu1-XNp6eOO-AGg" },
            { name: "Will Smith", role: "Product Designer", image: "https://play-lh.googleusercontent.com/ai7FC9zp1bG8zLcl97w9rNde_oZ5s086XP1ZkBFdwf72d_owIiUVJu1-XNp6eOO-AGg"}
          ].map((member, index) => (
            <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
              <img src={member.image} alt={member.name} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-semibold font-['Inter']">{member.name}</h3>
                <p className="text-gray-600 font-['Poppins']">{member.role}</p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140", icon: "local_shipping" },
          { title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support", icon: "headset_mic" },
          { title: "MONEY BACK GUARANTEE", description: "We return money within 30 days", icon: "security" }
        ].map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="material-icons text-black text-3xl">{service.icon}</span>
            </div>
            <h3 className="text-xl font-semibold font-['Poppins'] mb-2">{service.title}</h3>
            <p className="text-gray-600 font-['Poppins']">{service.description}</p>
          </div>
        ))}
      </section>
    </div>
    <Footer/>
    </div>
  );
}

export default About;