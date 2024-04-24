'use client';
import Link from "next/link";
import { useState,useEffect } from "react";
import urlFetch from "@/URl";
import { BsCart4 } from "react-icons/bs";
import Cart from "./Cart";
import { deleteCookie } from "cookies-next";
import { useRouter } from 'next/router'

export default function Header(props) {
  const [user,setUser] = useState(null)
  const [displayCart, setDisplayCart] = useState(false)
  useEffect(() => {
    fetch(urlFetch.home, {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:props.cookies}),
      })
    .then((res) => res.json())
    .then((res) => setUser(res.user))

  },[props.cookies])
  const handleDisplay = () => {
    setDisplayCart(!displayCart);
  }
  const signOut = () => {
    deleteCookie("c_user");
    window.location.reload();
  }
  return (
      <header className="flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href="/">
              Pizza
        </Link>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/contact'}>Contact</Link>
        </nav>
        {user ? (
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            {user.admin ? (null): (
              <div> 
                <h1 style={{position:'absolute', width:"16px", height:'16px', backgroundColor:"orange", display:"flex", justifyContent:'center', alignItems:'center', borderRadius:"50%"}}>1</h1>
                <BsCart4 style={{width:'30px', height:"30px"}} onClick={() => handleDisplay()}/>
                {displayCart ? (
                  <Cart id = {user.email} cart = {props.cart}/>
                ): null}
              </div>
            )}
            <Link href={'/profile'} className="whitespace-nowrap">
              {user.name}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full text-white px-8 py-2">
              Logout
            </button>
          </nav>
        ):(
          <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link href={'/login'}>Login</Link>
            <Link className="bg-primary rounded-full text-white px-8 py-2" href={'/register'}>
              Register
            </Link>
          </nav>
        )}
      </header>
  )
}