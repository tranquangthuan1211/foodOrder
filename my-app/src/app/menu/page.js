'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import {useEffect, useState} from "react";
import urlFetch from "@/URl";
import Header from "@/components/layout/Header";
import { getCookie } from "cookies-next";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([])
  const handleAdd = (item) => {
    setCart([...cart, item]);
  }
  useEffect(() => {
    fetch(urlFetch.catogories)
    .then(res => res.json())
    .then(categories => setCategories(categories))
    fetch(urlFetch.MenuItem)
    .then(res => res.json())
    .then(menuItems => setMenuItems(menuItems));
  }, []);
  return (
    <section className="mt-8" style={{minHeight:"540px"}}>
      <Header cookies = {getCookie('c_user')} cart = {cart}/>
      {menuItems ? (
        categories.length > 0 && categories.map(c => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems.filter(item => item.category === c._id).map(item => (
                <MenuItem key={item._id} item = {item} handleAdd = {handleAdd}/>
              ))}
            </div>
          </div>
        ))
      ) : 
       (<h1>loading...</h1>)
      }
    </section>
  );
}