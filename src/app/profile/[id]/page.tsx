"use client";
import React from "react";


export async function ProfilePage (props: {params: Promise<{id: string}>}) {
    const params=await props.params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <h2 className="p-3 bg-green-500 rounded text-black">{params.id}</h2>
        
        </div>
    )
}