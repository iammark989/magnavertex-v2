import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus,
    Search,
    Trash2,
    ShieldCheck,
    Pencil,
    ChevronLeft,
    ChevronRight,
    Users,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    users_count: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedRoles {
    data: Role[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
}

interface RoleIndexProps {
    roles: PaginatedRoles;
    filters: {
        search: string;
    };
}

export default function Index({ roles, filters }: RoleIndexProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/roles',
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleDelete = (role: Role) => {
        if (role.users_count > 0) {
            alert('This role cannot be deleted because it is assigned to one or more users.');
            return;
        }

        if (!window.confirm(
            `Are you sure you want to delete the "${role.name}" role? This action cannot be undone.`
        )) {
            return;
        }

        router.delete(`/admin/roles/${role.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Role Management" />

            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Role Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage system roles and user access levels.
                        </p>
                    </div>

                    <Link
                        href="/admin/roles/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                    >
                        <Plus size={18} />
                        Add Role
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                <ShieldCheck size={23} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total Roles</p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {roles.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <Users size={23} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Assigned Users</p>
                                <p className="mt-1 text-2xl font-bold text-slate-900">
                                    {roles.data.reduce(
                                        (total, role) => total + role.users_count,
                                        0,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                System Roles
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                View and manage available user roles.
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
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search role name or slug..."
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
                        <table className="w-full min-w-[750px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Role Name</th>
                                    <th className="px-5 py-4 font-semibold">Slug</th>
                                    <th className="px-5 py-4 font-semibold">Description</th>
                                    <th className="px-5 py-4 font-semibold">Assigned Users</th>
                                    <th className="px-5 py-4 text-right font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {roles.data.length > 0 ? (
                                    roles.data.map((role) => (
                                        <tr
                                            key={role.id}
                                            className="transition hover:bg-slate-50/70"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                                        <ShieldCheck size={17} />
                                                    </div>
                                                    <span className="font-medium text-slate-800">
                                                        {role.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {role.slug}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {role.description || '—'}
                                            </td>

                                            <td className="px-5 py-4 text-slate-600">
                                                {role.users_count}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/roles/${role.id}/edit`}
                                                        className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </Link>

                                                    {!['super-admin', 'admin', 'editor'].includes(role.slug) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(role)}
                                                            disabled={role.users_count > 0}
                                                            title={
                                                                role.users_count > 0
                                                                    ? 'Cannot delete a role assigned to users'
                                                                    : 'Delete role'
                                                            }
                                                            className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            <Trash2 size={14} />
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center">
                                            <ShieldCheck
                                                size={32}
                                                className="mx-auto mb-3 text-slate-300"
                                            />
                                            <p className="font-medium text-slate-700">
                                                No roles found
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

                    <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                            Showing {roles.from ?? 0} to {roles.to ?? 0} of {roles.total} roles
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            {roles.links.map((link, index) => {
                                const isPrevious = index === 0;
                                const isNext = index === roles.links.length - 1;

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