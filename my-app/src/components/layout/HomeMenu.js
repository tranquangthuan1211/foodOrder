'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import { useState,useEffect } from "react";
import urlFetch from "@/URl";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu(props) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch(urlFetch.catogories)
    .then(res => res.json())
    .then(categories => setCategories(categories))
    fetch(urlFetch.MenuItem)
    .then(res => res.json())
    .then(menuItems => setMenuItems(menuItems));
  }, []);
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="uppercase text-gray-600">
          Check out
        </h3>
        <h2 className="text-primary font-bold text-4xl">
          Menu
        </h2>
      </div>
      <div >
        {menuItems ? (
          categories.length > 0 && categories.map(c => (
            <div key={c._id}>
              <div className="text-center">
                <SectionHeaders mainHeader={c.name} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                {menuItems.filter(item => item.category === c._id).map(item => (
                  <MenuItem key={item._id} item = {item} handleAdd = {props.handleAdd} />
                ))}
              </div>
            </div>
          ))
        ) : 
        (<h1>loading...</h1>)
        }
      </div>

    </section>
  );
}