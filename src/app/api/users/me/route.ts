import {connect} from '@/dbconfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

import { sendEmail } from '@/helpers/mailer';
import { getDataFromToken } from '@/helpers/getDataFromToken';
connect();


export async function POST(request: NextRequest){
    //extract data from token
    const userId=await getDataFromToken(request);
    const user=await User.findOne({_id:userId}).select("-password");
    //check if there is no user
    return NextResponse.json({message:"user found",data:user});


}