import {connect} from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        console.log('reqBody:', reqBody);
        const user=await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
//bcryptjs is used to hash the password before storing it in the database dekhoo
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser=await newUser.save();
console.log('Saved User:', savedUser);
console.log('User Email:', savedUser.email);
        const userId=savedUser._id;
        console.log('userId:', userId);
//send verification email
        await sendEmail({email:email,emailType:'VERIFY',userId:savedUser._id});
        return NextResponse.json({message: "User created successfully",success:true, savedUser});


    } catch (error) {
        console.log('Error:', error);
        return NextResponse.json({error: error}, {status: 500});
    }
     
}