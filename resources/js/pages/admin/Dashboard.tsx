import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';

interface ContactSummary {
    total: number;
    unread: number;
    new: number;
    in_progress: number;
    responded: number;
    closed: number;
}

interface RecentInquiry {
    id: number;
    name: string;
    email: string;
    subject: string;
    project_type: string;
    status: 'new' | 'in_progress' | 'responded' | 'closed';
    read_at: string | null;
    created_at: string;
}

interface DashboardProps {
    contactSummary: ContactSummary;
    recentInquiries: RecentInquiry[];
}

interface DashboardSummary {
    services: number;
    businessSolutions: number;
    users: number;
}

interface DashboardProps {
    dashboardSummary: DashboardSummary;
    contactSummary: ContactSummary;
    recentInquiries: RecentInquiry[];
}

const statusStyles: Record<RecentInquiry['status'], string> = {
    new: 'bg-sky-50 text-sky-700',
    in_progress: 'bg-amber-50 text-amber-700',
    responded: 'bg-emerald-50 text-emerald-700',
    closed: 'bg-slate-100 text-slate-600',
};

const statusLabels: Record<RecentInquiry['status'], string> = {
    new: 'New',
    in_progress: 'In Progress',
    responded: 'Responded',
    closed: 'Closed',
};

export default function Dashboard({
    dashboardSummary,
    contactSummary,
    recentInquiries,
}: DashboardProps) {
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
                            {dashboardSummary.services}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Business Solutions
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {dashboardSummary.businessSolutions}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Contact Inquiries
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {contactSummary.total}
                        </p>
                        <p className="mt-1 text-xs text-sky-600">
                            {contactSummary.unread} unread inquiries
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Users
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {dashboardSummary.users}
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Recent Contact Inquiries
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                The latest messages submitted through your website.
                            </p>
                        </div>

                        <Link
                            href="/admin/contact-inquiries"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                        >
                            View All Inquiries
                        </Link>
                    </div>

                    {recentInquiries.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {recentInquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {inquiry.subject}
                                            </p>

                                            {!inquiry.read_at && (
                                                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
                                                    Unread
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {inquiry.name} · {inquiry.email}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {new Date(inquiry.created_at).toLocaleDateString(
                                                'en-PH',
                                                {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                },
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-3">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[inquiry.status]}`}
                                        >
                                            {statusLabels[inquiry.status]}
                                        </span>

                                        <Link
                                            href={`/admin/contact-inquiries/${inquiry.id}`}
                                            className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-slate-200 px-4 py-10 text-center">
                            <p className="text-sm font-medium text-slate-600">
                                No contact inquiries yet.
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                New website inquiries will appear here.
                            </p>
                        </div>
                    )}
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