import VerifyEmailPage from '../VerifyUserEmail';
import axios from 'axios';

type Params = {
    id: string;
}

export async function generateStaticParams() {
    // Simulate fetching all user IDs or use actual fetching logic
    const response = await axios.get('/api/users');
    const users = response.data;

    return users.map((user: { id: string }) => ({
        params: { id: user.id },
    }));
}

type PageProps = {
    params: Params;
}

export default function Page({ params }: PageProps) {
    return <VerifyEmailPage params={params} />;
}
