
import React from 'react';
import VerifyEmailPage from '../verifyemail/VerifyUserEmail';



export default function VerifyEmail({ params }:{params:{id:string | null;}}) {
    return <VerifyEmailPage params={params} />;
}
