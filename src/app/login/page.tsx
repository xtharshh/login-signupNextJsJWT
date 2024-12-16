"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {useRouter} from 'next/navigation';
import { sendEmail } from '@/helpers/mailer';
import Link from 'next/link';

export default function LoginPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        
    });
    const router=useRouter();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin=async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            //user taken frm the above usestate of email username and password
            console.log("User Login successfully",response);
            toast.success("User login successfully");
            
            router.push("/profile");
 
        }
        catch(error:any){
            console.log("Error in signing up",error);
            toast.error("Error in signing up");
        }

    }
    useEffect(()=>{
        if(user.password.length>8 || user.email.length>0){
            setButtonDisabled(false);
        }
    },[user]);

    return (

        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading?"processing":"Login"}</h1>
            <hr/>
           
            <label htmlFor='email'>Email</label>
            <input type="email" id="email" placeholder="email" value={user.email} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <label htmlFor='password'>password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} placeholder="password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}> 
            {buttonDisabled ? "No Login" : "Login"}
            </button>
            <Link href="/signup">Sign up</Link>
        </div>
    )

}

//..user means saare users jo already exist karrahe hai wo as it is rahenge