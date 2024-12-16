"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {

    // const router=useRouter();

    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail=async()=>{
        try{
        await axios.post("/api/users/verifyemail", {token});
        setVerified(true);
        setError(false); 
        }
        catch(error:any){
            console.log("Error in verifying email",error.response.data);
            setError(true);
        }
    }
    
    useEffect(()=>{
        setError(false);
        const urlToken=window.location.search.split("=")[1];
        setToken(urlToken || "");
        //= taken because it is the url passed by the mailer to the user
        //it uses the browsers search bar with url contained in it
        
        // const {query} =router;
        // const urlTokenTwo=query.token;
        // //at the google search after question mark the query is passed is retireved from here

    
    },[]);

    useEffect(()=>{
        setError(false);
        if(token.length > 0){
            verifyUserEmail();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token]);


    return( 
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h1 className="p-2 bg-orange-500 text-black">
            {token?`${token}`:"no token"}
        </h1>
        {verified && (
            <div>
                <h1>Verified</h1>
                <Link href="/login">Login</Link>
            </div>
        )}
        {error && (
            <div>
                <h1>Verify Again</h1>
                
            </div>
        )}
        
    </div>



    )
    }
