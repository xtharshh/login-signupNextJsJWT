"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {useRouter} from 'next/navigation';
import { sendEmail } from '@/helpers/mailer';
import Link from 'next/link';

export default function SignupPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    });
    const router=useRouter();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup=async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            //user taken frm the above usestate of email username and password
            console.log("User signed up successfully",response);
            toast.success("User signed up successfully");
            
            router.push("/login");
 
        }
        catch(error:any){
            console.log("Error in signing up",error);
            toast.error("Error in signing up");
        }

    }
    useEffect(()=>{
        if(user.password.length>8 || user.email.length>0 || user.username.length>0){
            setButtonDisabled(false);
        }
    },[user]);

    return (

        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading?"processing":"Signup"}</h1>
            <hr/>
            <label htmlFor="username">Username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="username" placeholder="username " type="text" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
            <label htmlFor='email'>Email</label>
            <input type="email" id="email" placeholder="email" value={user.email} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <label htmlFor='password'>password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} placeholder="password" onChange={(e)=>setUser({...user,password:e.target.value})}/>
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignup}> 
            {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login">Already have an account? Login</Link>
        </div>
    )

}

//..user means saare users jo already exist karrahe hai wo as it is rahenge