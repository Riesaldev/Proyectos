import Layout from "@/components/Layout";



const NotFoundPage = () => {
    return (
        <>
            <Layout />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-400 text-white">
                <h1 className="text-4xl">404 Not Found</h1>
                <p className="text-2xl">The page you are looking for does not exist.</p>
                <a href="/" className="text-gray-50 text-2xl hover:text-purple-700">Go back to Home</a>
            </div>
        </>
    );
}

export default NotFoundPage;
