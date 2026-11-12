import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    UserRound,
    ShieldCheck,
    LockKeyhole,
    Save,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface Role {
    id: number;
    name: string;
    slug: string;
}

interface User {
    id: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    suffix: string | null;
    username: string;
    email: string;
    mobile: string | null;
    role_id: number;
    is_active: boolean;
}

interface EditUserProps {
    user: User;
    roles: Role[];
}

interface UserForm {
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    username: string;
    email: string;
    mobile: string;
    role_id: string;
    password: string;
    password_confirmation: string;
    is_active: boolean;
}

export default function Edit({ user, roles }: EditUserProps) {
    const { data, setData, put, processing, errors } = useForm<UserForm>({
        first_name: user.first_name ?? '',
        middle_name: user.middle_name ?? '',
        last_name: user.last_name ?? '',
        suffix: user.suffix ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        mobile: user.mobile ?? '',
        role_id: String(user.role_id ?? ''),
        password: '',
        password_confirmation: '',
        is_active: user.is_active,
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        put(`/admin/users/${user.id}`);
    };

    const inputClass = (field: keyof UserForm) =>
        `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${
            errors[field] ? 'border-red-400' : 'border-slate-300'
        }`;

    return (
        <AdminLayout>
            <Head title="Edit User" />

            <div className="mx-auto max-w-5xl space-y-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/users"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Edit User
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Update account information and access settings.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                <UserRound size={20} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Personal Information
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Update the user's basic information.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 p-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">First Name *</label>
                                <input value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} className={inputClass('first_name')} />
                                {errors.first_name && <p className="mt-1 text-xs text-red-600">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Middle Name</label>
                                <input value={data.middle_name} onChange={(e) => setData('middle_name', e.target.value)} className={inputClass('middle_name')} />
                                {errors.middle_name && <p className="mt-1 text-xs text-red-600">{errors.middle_name}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Last Name *</label>
                                <input value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className={inputClass('last_name')} />
                                {errors.last_name && <p className="mt-1 text-xs text-red-600">{errors.last_name}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Suffix</label>
                                <input value={data.suffix} onChange={(e) => setData('suffix', e.target.value)} className={inputClass('suffix')} placeholder="e.g. Jr., Sr., III" />
                                {errors.suffix && <p className="mt-1 text-xs text-red-600">{errors.suffix}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Mobile Number</label>
                                <input type="tel" value={data.mobile} onChange={(e) => setData('mobile', e.target.value)} className={inputClass('mobile')} placeholder="09XX XXX XXXX" />
                                {errors.mobile && <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Account Information */}
                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                <LockKeyhole size={20} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">Account Information</h2>
                                <p className="text-xs text-slate-500">Update login credentials.</p>
                            </div>
                        </div>

                        <div className="grid gap-5 p-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Username *</label>
                                <input value={data.username} onChange={(e) => setData('username', e.target.value)} className={inputClass('username')} />
                                {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address *</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass('email')} />
                                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">New Password</label>
                                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className={inputClass('password')} placeholder="Leave blank to keep current password" />
                                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm New Password</label>
                                <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className={inputClass('password_confirmation')} placeholder="Re-enter new password" />
                                {errors.password_confirmation && <p className="mt-1 text-xs text-red-600">{errors.password_confirmation}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Role and Status */}
                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">Access and Account Status</h2>
                                <p className="text-xs text-slate-500">Manage the user's role and availability.</p>
                            </div>
                        </div>

                        <div className="grid gap-5 p-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">User Role *</label>
                                <select value={data.role_id} onChange={(e) => setData('role_id', e.target.value)} className={inputClass('role_id')}>
                                    <option value="">Select a role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                                {errors.role_id && <p className="mt-1 text-xs text-red-600">{errors.role_id}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Account Status</label>
                                <select value={data.is_active ? '1' : '0'} onChange={(e) => setData('is_active', e.target.value === '1')} className={inputClass('is_active')}>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {errors.is_active && <p className="mt-1 text-xs text-red-600">{errors.is_active}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <Link
                            href="/admin/users"
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={17} />
                            {processing ? 'Saving...' : 'Update User'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}