import {connect} from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function GET(request: NextRequest){
    try{
        const response=NextResponse.json({message: "Logout successful", success: true});
        await response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
        },);
        return response;
    }
    catch(error){
        console.log('Error:', error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}