"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-bold">Home Page</h1>
            <button
                className="bg-blue-500 text-white p-2 m-2 rounded-lg"
                onClick={() => router.push("/signup")}
            >
                Signup
            </button>
            <button
                className="bg-green-500 text-white p-2 m-2 rounded-lg"
                onClick={() => router.push("/login")}
            >
                Login
            </button>
        </div>
    );
}
