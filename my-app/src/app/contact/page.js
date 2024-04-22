import React from 'react'
import { IoIosHome,IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import Link from 'next/link';

export default function Contact() {
  return (
    <div style={{margin:"-18px -40px", paddingBottom:"8px"}}>
        <div className="flex items-center gap-8 font-semibold"
            style={{width:"100%",position:'absolute', justifyContent:'center',color:"#fff"}}
        >
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/contact'}>Contact</Link>
        </div>
        <img style={{width:"100%", height:"300px"}} src='https://media-cdn.tripadvisor.com/media/photo-s/15/c5/84/65/khong-gian-nha-hang-vu.jpg' alt='anh'/>
        <div style={{padding:"40px 50px",}}>
            <h1 style={{color:"#50494a", fontWeight:"800", fontSize:"2rem"}}>Chúng tôi xin được phục phụ quý khách tại</h1>
            <div >
                <div style={{display:'flex', alignItems:"center"}}>
                    <IoIosHome style={{color:"#50494a", width:"20px", height:"20px"}}/>
                    <p style={{color:"#50494a"}}>CN1: 63 Điện Biên Phủ, Quận Bình Thạnh, Hồ Chí Minh</p>
                </div>
                <div style={{display:'flex', alignItems:"center"}}>
                    <MdLocalPhone style={{color:"#50494a" , width:"20px", height:"20px"}}/>
                    <p style={{color:"#50494a"}}>0977109327</p>
                </div>
                <div style={{display:'flex', alignItems:"center"}}>
                    <IoMdMail style={{color:"#50494a",  width:"20px", height:"20px"}}/>
                    <p style={{color:"#50494a"}}>tranthuan.1211@gmail.com</p>
                </div>
                <div style={{display:'flex', alignItems:"center"}}>
                    <FaCalendarAlt style={{color:"#50494a", width:"20px", height:"20px"}}/>
                    <p style={{color:"#50494a"}}>T2 - Cn: 8h - 22h</p>
                </div>
            </div>
        </div>
        <img style={{width:'100%', height:"300px"}} src='./map.png' alt='anh'/>
    </div>
  )
}
