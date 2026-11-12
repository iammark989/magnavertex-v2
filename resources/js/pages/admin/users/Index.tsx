import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus,
    Search,
    Users,
    Pencil,
    ChevronLeft,
    ChevronRight,
    UserRound,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface UserRole {
    id: number;
    name: string;
    slug: string;
}

interface User {
    id: number;
    name: string;
    username: string | null;
    email: string;
    is_active: boolean;
    created_at: string;
    role: UserRole | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface UserIndexProps {
    users: PaginatedUsers;
    filters: {
        search: string;
    };
}

export default function Index({ users, filters }: UserIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/users',
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AdminLayout>
            <Head title="User Management" />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            User Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage administrator accounts and access roles.
                        </p>
                    </div>

                    <Link
                        href="/admin/users/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                    >
                        <Plus size={18} />
                        Add User
                    </Link>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                            <Users size={23} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Users
                            </p>
                            <p className="text-2xl font-bold text-slate-900">
                                {users.total}
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Administrator Accounts
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                View and manage registered system users.
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
                                    placeholder="Search name, username, email..."
                                    className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">
                                        User
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Username
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Email
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Role
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 font-semibold">
                                        Created
                                    </th>
                                    <th className="px-5 py-4 text-right font-semibold">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                                        <UserRound size={17} />
                                                    </div>
                                                    <span className="font-medium text-slate-800">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {user.username || '—'}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {user.email}
                                            </td>

                                            <td className="px-5 py-4">
                                                {user.role ? (
                                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                                                        {user.role.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-red-500">
                                                        No role assigned
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        user.is_active
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'bg-red-50 text-red-700'
                                                    }`}
                                                >
                                                    {user.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-slate-500">
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                >
                                                    <Pencil size={14} />
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-5 py-12 text-center"
                                        >
                                            <Users
                                                size={32}
                                                className="mx-auto mb-3 text-slate-300"
                                            />
                                            <p className="font-medium text-slate-700">
                                                No users found
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Try adjusting your search.
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
                            Showing {users.from ?? 0} to {users.to ?? 0} of{' '}
                            {users.total} users
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            {users.links.map((link, index) => {
                                const isPrevious = index === 0;
                                const isNext =
                                    index === users.links.length - 1;

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