
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />

            <main className="min-h-screen bg-slate-50 p-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Welcome to Magna Vertex Technologies administration.
                    </p>
                </div>
            </main>
        </>
    );
}
