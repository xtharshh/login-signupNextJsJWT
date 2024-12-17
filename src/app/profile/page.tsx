"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import {toast} from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
    const router=useRouter();
    const [data, setData] =useState("nothing");
    const getUserDetails=async()=>{
        const res=await axios.post("/api/users/me");
        console.log("User details",res.data.data._id);
        setData(res.data.data._id);

    
    }
    const logout=async()=>{
        try{
            await axios.get("/api/users/logout");
            toast.success("User logged out successfully");
            router.push("/login");
        }
        catch(error){
            console.log("Error in logging out",error.response.data);
            toast.error("Error in logging out");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile!</h1>
            <hr/>
            <h2>{data==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Log Out</button>
            <button className="bg-orange-400 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User Details</button>
        </div>
    )
}