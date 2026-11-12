import { Head } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Welcome to Magna Vertex Technologies administration.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Services
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            --
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Business Solutions
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            --
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Contact Inquiries
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            --
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Users
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            --
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Welcome to your Admin Panel
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Manage your website content, business solutions,
                        contact inquiries, and administrative users from
                        one central location.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}