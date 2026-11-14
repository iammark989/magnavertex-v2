import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Mail,
    Inbox,
    Clock,
    CheckCircle,
    Search,
    ChevronLeft,
    ChevronRight,
    Eye,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface ContactInquiry {
    id: number;
    name: string;
    email: string;
    company: string | null;
    project_type: string;
    subject: string;
    message: string;
    status: 'new' | 'in_progress' | 'responded' | 'closed';
    created_at: string;
    read_at: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedInquiries {
    data: ContactInquiry[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface InquiryIndexProps {
    inquiries: PaginatedInquiries;
    filters: {
        search: string;
        status: string;
    };
    summary: {
        total: number;
        new: number;
        in_progress: number;
        closed: number;
    };
}

export default function Index({
    inquiries,
    filters,
    summary,
}: InquiryIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/contact-inquiries',
            { search, status },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);

        router.get(
            '/admin/contact-inquiries',
            { search, status: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const statusBadge = (value: ContactInquiry['status']) => {
        const styles = {
            new: 'bg-sky-50 text-sky-700',
            in_progress: 'bg-amber-50 text-amber-700',
            responded: 'bg-green-50 text-green-700',
            closed: 'bg-slate-100 text-slate-600',
        };

        const labels = {
            new: 'New',
            in_progress: 'In Progress',
            responded: 'Responded',
            closed: 'Closed',
        };

        return (
            <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[value]}`}
            >
                {labels[value]}
            </span>
        );
    };

    const projectTypeLabel = (value: string) => {
        const labels: Record<string, string> = {
            'web-application': 'Web Application',
            'business-system': 'Business System',
            'cms-website': 'CMS / Website',
            ecommerce: 'E-Commerce',
            other: 'Other',
        };

        return labels[value] ?? value;
    };

    const formatDate = (value: string) => {
        return new Date(value).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout>
            <Head title="Contact Inquiries" />

            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Contact Inquiries
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage messages and inquiries submitted through your
                        public website.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        {
                            label: 'Total Inquiries',
                            value: summary.total,
                            icon: Mail,
                            color: 'bg-sky-50 text-sky-600',
                        },
                        {
                            label: 'New Inquiries',
                            value: summary.new,
                            icon: Inbox,
                            color: 'bg-blue-50 text-blue-600',
                        },
                        {
                            label: 'In Progress',
                            value: summary.in_progress,
                            icon: Clock,
                            color: 'bg-amber-50 text-amber-600',
                        },
                        {
                            label: 'Closed',
                            value: summary.closed,
                            icon: CheckCircle,
                            color: 'bg-slate-100 text-slate-600',
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                                    >
                                        <Icon size={23} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            {item.label}
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-slate-900">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Inquiries Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Website Inquiries
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                View and manage messages from potential clients.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-2 sm:flex-row"
                        >
                            <div className="relative flex-1 sm:w-64">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search inquiries..."
                                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(event) =>
                                    handleStatusChange(event.target.value)
                                }
                                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            >
                                <option value="">All Statuses</option>
                                <option value="new">New</option>
                                <option value="in_progress">In Progress</option>
                                <option value="responded">Responded</option>
                                <option value="closed">Closed</option>
                            </select>

                            <button
                                type="submit"
                                className="cursor-pointer rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Inquiry
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Contact
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Company
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Project Type
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {inquiries.data.length > 0 ? (
                                    inquiries.data.map((inquiry) => (
                                        <tr
                                            key={inquiry.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    {!inquiry.read_at && (
                                                        <span
                                                            className="h-2 w-2 shrink-0 rounded-full bg-sky-500"
                                                            title="Unread inquiry"
                                                        />
                                                    )}

                                                    <p
                                                        className={`font-medium ${
                                                            !inquiry.read_at
                                                                ? 'text-slate-900'
                                                                : 'text-slate-600'
                                                        }`}
                                                    >
                                                        {inquiry.subject}
                                                    </p>

                                                    {!inquiry.read_at && (
                                                        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                                                            UNREAD
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {formatDate(inquiry.created_at)}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium text-slate-800">
                                                    {inquiry.name}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {inquiry.email}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {inquiry.company || '—'}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {projectTypeLabel(
                                                    inquiry.project_type,
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                {statusBadge(inquiry.status)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        router.visit(`/admin/contact-inquiries/${inquiry.id}`)
                                                    }
                                                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-12 text-center"
                                        >
                                            <Mail
                                                size={32}
                                                className="mx-auto mb-3 text-slate-300"
                                            />

                                            <p className="font-medium text-slate-700">
                                                No inquiries found
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Try adjusting your search or
                                                status filter.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                            Showing {inquiries.from ?? 0} to{' '}
                            {inquiries.to ?? 0} of {inquiries.total} inquiries
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            {inquiries.links.map((link, index) => {
                                const isPrevious = index === 0;
                                const isNext =
                                    index === inquiries.links.length - 1;

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url) {
                                                router.visit(link.url, {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-xs font-medium transition ${
                                            link.active
                                                ? 'bg-sky-600 text-white'
                                                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        } disabled:cursor-not-allowed disabled:opacity-40`}
                                    >
                                        {isPrevious ? (
                                            <ChevronLeft size={16} />
                                        ) : isNext ? (
                                            <ChevronRight size={16} />
                                        ) : (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}