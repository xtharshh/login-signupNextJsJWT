import {connect} from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

await connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log('reqBody:', reqBody);
      
        const user=await User.findOne({email: email.toLowerCase()}); //find user by email
        if(!user){
            return NextResponse.json({error: "User doesnt exists"}, {status: 400});
        }
        console.log('User found:', user);

        console.log('Stored hashed password:', user.password);
        //check password
        const validPassword=await bcryptjs.compare(password, user.password);
        
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }
        console.log('password matched');
        
        const tokenData={
            id:user._id,
            email:user.email,
            username:user.username
        }
        console.log('tokenData:', tokenData);
        const token=await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:'1d'});
        const reponse=NextResponse.json({message: "Login successful",success:true, token});
    
        reponse.cookies.set('token', token, {
        
            httpOnly:true,
        }
        )
        return reponse;

    
    }
    catch (error: unknown) {
        console.log('Error:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json({error: error instanceof Error ? error.message : 'Unknown error'}, {status: 500});
    }
}