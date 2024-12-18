import { notFound } from 'next/navigation';
import VerifyEmailPage from '../VerifyUserEmail';
import axios from 'axios';

type Params = {
    id: string;
}

type PageProps = {
    params: Params;
}

export async function generateStaticParams() {
    // Simulate fetching all user IDs or use actual fetching logic
    const response = await axios.get('/api/users');
    
    const users = response.data;

    return users.map((user: { id: string }) => ({
        id: user.id,
    }));
}

export default function Page({ params }: PageProps) {
    const { id } = params;

    // Validate the id (if necessary)
    if (!id) {
        return notFound();
    }

    return <VerifyEmailPage params={{ id }} />;
}
