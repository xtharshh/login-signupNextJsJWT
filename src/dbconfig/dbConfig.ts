import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function connect() {
    try {
        
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected');
        });
        connection.on('error', (error) => {
            console.log('MongoDB error connecting'+error);
            process.exit();
        });
        NextResponse.json({ message: 'DB is connected' });
        console.log('DB is connected');
    } catch (error) {
        console.log('Error:', error);
    }

}
connect();
if(!connect){
    console.log('DB is not connected');
}
