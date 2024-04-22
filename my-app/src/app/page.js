'use client';
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { getCookie } from "cookies-next";
import { useState } from "react";

export default function Home(ctx) {
  const [cart, setCart] = useState([])
  const handleAdd = (item) => {
    setCart([...cart, item]);
  }
  return (
    <div style={{padding:'20px 40px'}}>
      <Header cookies = {getCookie('c_user')} cart = {cart}/>
      <Hero/>
      <HomeMenu handleAdd = {handleAdd}/>
      <section className="text-center my-18">
        <SectionHeaders
          subHeader = {'our story'}
          mainHeader = {'About us'}
        />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            The quality of service can 
            significantly impact the dining experience. Restaurants may offer table service, where waitstaff take orders and serve food directly to customers, or counter service, where customers place orders at a counter and collect their food
            themselves. Service standards often include attentiveness, friendliness, and efficiency.
          </p>
          <p>
            The layout of a restaurant encompasses its seating arrangement, kitchen area, bar (if applicable), and any additional amenities such as outdoor seating or private dining rooms. 
            The layout should be optimized for efficiency, comfort, and aesthetics.
          </p>
        </div>
      </section>
    </div>
  );
}
