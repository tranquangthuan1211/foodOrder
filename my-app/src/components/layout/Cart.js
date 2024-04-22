import React from 'react'
import { useEffect, useState } from 'react'
import urlFetch from '@/URl';
import { IoTrashOutline } from "react-icons/io5";

export default function Cart(props) {
    const id = props.id
    const [order, setOrder] = useState([]);
    useEffect(() => {
        setOrder([...props.cart])
    },[id])
    console.log(order)
    if(id === null) {
        return;
    }
    const handleRemove = (index) => {
        setOrder(order.splice(index, 1))
    }
    const [price, setPrice] = useState(0)
    useEffect(() => {
        order.map((item) =>{
            setPrice(item.price + price)
        })
    },[order])
  return (
    <div className="p-6 divide-y divide-slate-400"
        style={{position:'absolute', zIndex:'1', padding:'10px 8px'}}
    >
        {order ? (
            order.map((item,index) => (
                <div key={index} className="flex py-4 first:pt-0 last:pb-0" 
                    style={{width:"300px", justifyContent:'space-between'}}

                    >
                    <img className = "h-10 w-10 rounded-full" src={item.image} alt='anh'
                        style={{width:'40px', height:"40px", borderRadius:"50%"}}
                    />
                    <div className='ml-3 overflow-hidden'>
                        <p >{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                    <IoTrashOutline style={{width:"40px", height:"50px"}}
                        onClick={() => handleRemove(index)}
                    />
                </div>
            ))
    ) : (
        <h1>loading... </h1> 
        )}
        <button
            className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full"
        >
        Đặt {price}</button>
    </div>
  )
}
