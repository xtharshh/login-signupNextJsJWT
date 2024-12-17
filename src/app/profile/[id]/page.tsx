"use server";
import React from "react";
import PagewithToken from "./pageWithToken";

const ProfilePage = async (props: { params: Promise<{ id: string | null}> }) => {
    const id  = (await props.params).id;
    if(!id){
        return <h1>Invalid ID</h1>
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <PagewithToken id={id}/>
        </div>
    );
};

export default ProfilePage;