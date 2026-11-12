import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus,
    Search,
    BriefcaseBusiness,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Star,
    Eye,
    EyeOff,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    description: string | null;
    icon: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedServices {
    data: Service[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface ServiceIndexProps {
    services: PaginatedServices;
    filters: {
        search: string;
    };
}

export default function Index({
    services,
    filters,
}: ServiceIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/services',
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (service: Service) => {
        if (service.is_active) {
            return;
        }

        if (
            !window.confirm(
                `Are you sure you want to permanently delete "${service.title}"? This action cannot be undone. If you only want to hide it from the website, deactivate it instead.`
            )
        ) {
            return;
        }

        router.delete(`/admin/services/${service.id}`, {
            preserveScroll: true,
        });
    };

    const statusBadge = (active: boolean) => (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                active
                    ? 'bg-green-50 text-green-700'
                    : 'bg-slate-100 text-slate-500'
            }`}
        >
            {active ? <Eye size={13} /> : <EyeOff size={13} />}
            {active ? 'Active' : 'Inactive'}
        </span>
    );

    return (
        <AdminLayout>
            <Head title="Services Management" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Services Management
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage the services displayed on your public website.
                        </p>
                    </div>

                    <Link
                        href="/admin/services/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                    >
                        <Plus size={18} />
                        Add Service
                    </Link>
                </div>

                {/* Summary Card */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                <BriefcaseBusiness size={23} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Total Services
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {services.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <Star size={23} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Services on This Page
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {services.data.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Website Services
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                View and manage your available services.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="flex w-full gap-2 sm:w-auto"
                        >
                            <div className="relative flex-1 sm:w-72">
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
                                    placeholder="Search service title or slug..."
                                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Service
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Slug
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Display Order
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Featured
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
                                {services.data.length > 0 ? (
                                    services.data.map((service) => (
                                        <tr
                                            key={service.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                                        <BriefcaseBusiness size={18} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-800">
                                                            {service.title}
                                                        </p>

                                                        <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                                                            {service.short_description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {service.slug}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {service.sort_order}
                                            </td>

                                            <td className="px-5 py-4">
                                                {service.is_featured ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                                        <Star size={13} />
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        No
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                {statusBadge(service.is_active)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/services/${service.id}/edit`}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        disabled={service.is_active}
                                                        title={
                                                            service.is_active
                                                                ? 'Deactivate this service before deleting it.'
                                                                : 'Permanently delete this service.'
                                                        }
                                                        onClick={() => handleDelete(service)}
                                                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                                                            service.is_active
                                                                ? 'cursor-not-allowed border-slate-200 text-slate-300'
                                                                : 'cursor-pointer border-red-200 text-red-600 hover:bg-red-50'
                                                        }`}
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-5 py-12 text-center"
                                        >
                                            <BriefcaseBusiness
                                                size={32}
                                                className="mx-auto mb-3 text-slate-300"
                                            />

                                            <p className="font-medium text-slate-700">
                                                No services found
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Try adjusting your search or add a new service.
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
                            Showing {services.from ?? 0} to {services.to ?? 0} of{' '}
                            {services.total} services
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            {services.links.map((link, index) => {
                                const isPrevious = index === 0;
                                const isNext =
                                    index === services.links.length - 1;

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