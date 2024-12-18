import VerifyEmailPage from '../VerifyUserEmail';
import axios from 'axios';

type Params = {
    id: string;
}

export async function generateStaticParams() {
    // Simulate fetching all user IDs or use actual fetching logic
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`);
    const users = response.data;

    return users.map((user: { id: string }) => ({
        id: user.id,
    }));
}

type PageProps = {
    params: Params;
}

export default function Page({ params }: PageProps) {
    const { id } = params;

    // Validate the id (if necessary)
    if (!id) {
        return <div>Page not found</div>; // Or use your custom notFound handler
    }

    return <VerifyEmailPage params={{ id }} />;
}
