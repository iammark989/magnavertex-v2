import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeft,
    ShieldCheck,
    Save,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface RoleForm {
    name: string;
    slug: string;
    description: string;
}

export default function Create() {
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const { data, setData, post, processing, errors } = useForm<RoleForm>({
        name: '',
        slug: '',
        description: '',
    });

    const generateSlug = (value: string) =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

    const handleNameChange = (value: string) => {
        setData((previous) => ({
            ...previous,
            name: value,
            slug: slugManuallyEdited
                ? previous.slug
                : generateSlug(value),
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/admin/roles');
    };

    const inputClass = (field: keyof RoleForm) =>
        `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${
            errors[field] ? 'border-red-400' : 'border-slate-300'
        }`;

    return (
        <AdminLayout>
            <Head title="Create Role" />

            <div className="mx-auto max-w-3xl space-y-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/roles"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Create Role
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Add a new role to the system.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                <ShieldCheck size={20} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Role Information
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Provide the role name and description.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5 p-6">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Role Name *
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className={inputClass('name')}
                                    placeholder="e.g. Sales Manager"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Role Slug *
                                </label>
                                <input
                                    value={data.slug}
                                    onChange={(e) => {
                                        setSlugManuallyEdited(true);
                                        setData('slug', generateSlug(e.target.value));
                                    }}
                                    className={inputClass('slug')}
                                    placeholder="e.g. sales-manager"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Unique identifier used internally by the system.
                                </p>
                                {errors.slug && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.slug}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={inputClass('description')}
                                    placeholder="Describe the responsibilities of this role..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <Link
                            href="/admin/roles"
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={17} />
                            {processing ? 'Saving...' : 'Create Role'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}