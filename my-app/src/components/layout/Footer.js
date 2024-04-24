import React from 'react'
import SectionHeaders from './SectionHeaders'
import { IoIosHome,IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <div style={{backgroundColor:"#000", margin:"20px -40px -20px -40px", padding:"10px 40px"}}>
        <SectionHeaders
          subHeader = {""}
          mainHeader = {"Contact us"}
        />
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div >
                <div style={{display:'flex', alignItems:"center"}}>
                    <IoIosHome style={{color:"#fff", width:"20px", height:"20px"}}/>
                    <p style={{color:"#fff"}}>CN1: 63 Điện Biên Phủ, Quận Bình Thạnh, Hồ Chí Minh</p>
                </div>
                <div style={{display:'flex', alignItems:"center"}}>
                    <MdLocalPhone style={{color:"#fff" , width:"20px", height:"20px"}}/>
                    <p style={{color:"#fff"}}>0977109327</p>
                </div>
                <div style={{display:'flex', alignItems:"center"}}>
                    <IoMdMail style={{color:"#fff",  width:"20px", height:"20px"}}/>
                    <p style={{color:"#fff"}}>tranthuan.1211@gmail.com</p>
                </div>
                <div style={{display:'flex', alignItems:"center"}}>
                    <FaCalendarAlt style={{color:"#fff", width:"20px", height:"20px"}}/>
                    <p style={{color:"#fff"}}>T2 - Cn: 8h - 22h</p>
                </div>
            </div>
            <div>
                <h1 style={{color:"#fff", width:"20px", height:"20px"}}>FaceBook</h1>
                <img style={{height:'100px', width:"300px"}} src='https://media-cdn.tripadvisor.com/media/photo-s/15/c5/84/65/khong-gian-nha-hang-vu.jpg' alt='anh'/>
            </div>
        </div>
    </div>
  )
}
