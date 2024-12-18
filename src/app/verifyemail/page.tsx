
import React from 'react';
import VerifyEmailPage from '../verifyemail/VerifyUserEmail';



export default function VerifyEmail({ params }:{params:{id: string}}) {
    return <VerifyEmailPage params={params} />;
}
