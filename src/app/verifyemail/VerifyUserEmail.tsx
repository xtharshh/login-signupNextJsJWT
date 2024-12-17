"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Params = {
    id: string | null;
};

type VerifyEmailPageProps = {
    params: Params;
};

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
    const [token, setToken] = useState<string>('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const { id } = params; // Destructure id from params

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token, id }); // Include id in the request
            setVerified(true);
            setError(false); 
        } catch (error) {
            console.log("Error in verifying email", error);
            if (axios.isAxiosError(error) && error.response) {
                console.log("Error response data:", error.response.data);
                setError(true);
            }
        }
    }
    
    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyUserEmail();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h1 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token"}
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
