import {connect} from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request:NextRequest)
{
    try{
        const reqBody=await request.json();
        const {token}=reqBody;
        console.log('reqBody:', reqBody);
const user=await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() }
});
        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
        }
        console.log('user:', user);
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=null;

        await user.save();//this  will happen inside the database so await used

        return NextResponse.json({message: "Email verified successfully",success:true},{status:200});
    }
    catch(error){
        console.log('Error:', error);
        return NextResponse.json({error: error.message}, {status: 500});
    }

}