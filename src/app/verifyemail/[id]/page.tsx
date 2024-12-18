import { GetServerSideProps } from 'next';
import VerifyEmailPage from '../VerifyUserEmail';

type Params = {
    id: string;
}

type VerifyEmailProps = {
    paramsPromise: Promise<Params>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as Params;
    const paramsPromise = Promise.resolve({ id }); // Simulate async fetch

    return {
        props: { paramsPromise }, // Pass the params promise as props
    };
}

export default function VerifyEmail({ paramsPromise }: VerifyEmailProps) {
    return <VerifyEmailPage paramsPromise={paramsPromise} />;
}
