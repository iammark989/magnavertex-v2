import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface RoleForm {
    name: string;
    description: string;
}

interface EditProps {
    role: Role;
}

export default function Edit({ role }: EditProps) {
    const { data, setData, put, processing, errors } =
        useForm<RoleForm>({
            name: role.name,
            description: role.description ?? '',
        });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    const inputClass = (field: keyof RoleForm) =>
        `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${
            errors[field] ? 'border-red-400' : 'border-slate-300'
        }`;

    return (
        <AdminLayout>
            <Head title="Edit Role" />

            <div className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link
                                href="/admin/roles"
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>

                            <h1 className="text-2xl font-semibold text-slate-800">
                                Edit Role
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            Update role information.
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                        <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                            <ShieldCheck size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Role Information
                            </h2>
                            <p className="text-xs text-slate-500">
                                Update the role name and description.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 p-6">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Role Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={inputClass('name')}
                                    placeholder="Enter role name"
                                    required
                                />

                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Role Slug
                                </label>

                                <input
                                    type="text"
                                    value={role.slug}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Role slug cannot be changed.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className={inputClass('description')}
                                placeholder="Enter role description"
                            />

                            {errors.description && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                            <Link
                                href="/admin/roles"
                                className="rounded-lg border border-slate-300 px-5 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={16} />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}