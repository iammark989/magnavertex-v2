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
    Image as ImageIcon,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface BusinessSolution {
    id: number;
    title: string;
    slug: string;
    category: string;
    short_description: string;
    featured_image: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedSolutions {
    data: BusinessSolution[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface BusinessSolutionIndexProps {
    solutions: PaginatedSolutions;
    filters: {
        search: string;
    };
}

export default function Index({
    solutions,
    filters,
}: BusinessSolutionIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/business-solutions',
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (solution: BusinessSolution) => {
        if (solution.is_active) {
            return;
        }

        if (
            !window.confirm(
                `Are you sure you want to permanently delete "${solution.title}"? This action cannot be undone.`
            )
        ) {
            return;
        }

        router.delete(`/admin/business-solutions/${solution.id}`, {
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
            <Head title="Business Solutions Management" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Business Solutions Management
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage the business solutions displayed on your public website.
                        </p>
                    </div>

                    <Link
                        href="/admin/business-solutions/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                    >
                        <Plus size={18} />
                        Add Business Solution
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                <BriefcaseBusiness size={23} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Total Business Solutions
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {solutions.total}
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
                                    Solutions on This Page
                                </p>

                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {solutions.data.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Solutions Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Business Solutions
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                View and manage your business solutions.
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
                                    placeholder="Search title, slug, or category..."
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
                        <table className="w-full min-w-[1050px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        Business Solution
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Category
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
                                {solutions.data.length > 0 ? (
                                    solutions.data.map((solution) => (
                                        <tr
                                            key={solution.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {solution.featured_image ? (
                                                        <img
                                                            src={solution.featured_image}
                                                            alt={solution.title}
                                                            className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}

                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-800">
                                                            {solution.title}
                                                        </p>

                                                        <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                                                            {solution.short_description}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {solution.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {solution.category}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {solution.sort_order}
                                            </td>

                                            <td className="px-5 py-4">
                                                {solution.is_featured ? (
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
                                                {statusBadge(solution.is_active)}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/business-solutions/${solution.id}/edit`}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        disabled={solution.is_active}
                                                        title={
                                                            solution.is_active
                                                                ? 'Deactivate this business solution before deleting it.'
                                                                : 'Permanently delete this business solution.'
                                                        }
                                                        onClick={() => handleDelete(solution)}
                                                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                                                            solution.is_active
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
                                                No business solutions found
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Try adjusting your search or add a new business solution.
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
                            Showing {solutions.from ?? 0} to {solutions.to ?? 0} of{' '}
                            {solutions.total} business solutions
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            {solutions.links.map((link, index) => {
                                const isPrevious = index === 0;
                                const isNext =
                                    index === solutions.links.length - 1;

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