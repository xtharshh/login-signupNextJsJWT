import VerifyEmailPage from '../VerifyUserEmail';
import axios from 'axios';
export async function generateStaticParams() {
    const response = await axios.get('/api/users'); // Fetch user data or simulate it
    const users = response.data;

    return users.map((user: { id: string }) => ({
        params: { id: user.id },
    }));
}

type PageProps = {
    params: { id: string };
}

export default function Page({ params }: PageProps) {
    return <VerifyEmailPage params={params} />;
}
