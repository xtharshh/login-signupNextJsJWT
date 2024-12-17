import VerifyEmailPage from '../verifyemail/VerifyUserEmail';

export async function getServerSideProps(context: { params: { id: string | null; }; }) {
    const { id } = context.params;
    return {
        props: { params: { id } }, // Pass the params directly as props
    };
}

export default function VerifyEmail({ params }:{params:{id:string | null;}}) {
    return <VerifyEmailPage params={params} />;
}
