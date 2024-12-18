"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [loadingLogout, setLoadingLogout] = useState(false);

    const getUserDetails = async () => {
        try {
            setLoadingDetails(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`); // Use base URL
            console.log("User details", res.data.data._id);
            setData(res.data.data._id);
            toast.success("User details fetched successfully");
        } catch (error) {
            console.log("Error in fetching user details", error);
            toast.error("Error in fetching user details");
        } finally {
            setLoadingDetails(false);
        }
    };

    const logout = async () => {
        try {
            setLoadingLogout(true);
            await axios.get("/api/users/logout"); // Use base URL
            toast.success("User logged out successfully");
            router.push("/login");
        } catch (error) {
            console.log("Error in logging out", error);
            toast.error("Error in logging out");
        } finally {
            setLoadingLogout(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile!</h1>
            <hr/>
            <h2>
                {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr/>
            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
                disabled={loadingLogout}
            >
                {loadingLogout ? "Logging out..." : "Log Out"}
            </button>
            <button
                className="bg-orange-400 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}
                disabled={loadingDetails}
            >
                {loadingDetails ? "Fetching details..." : "Get User Details"}
            </button>
        </div>
    );
}
