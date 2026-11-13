import { Head, useForm } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import {
    UserRound,
    LockKeyhole,
    Eye,
    EyeOff,
    ShieldCheck,
    Mail,
    Phone,
    AtSign,
    Save,
} from 'lucide-react';

interface AccountUser {
    name: string | null;
    first_name: string | null;
    middle_name: string | null;
    last_name: string | null;
    suffix: string | null;
    username: string | null;
    email: string;
    mobile: string | null;
    image: string | null;
    role: string | null;
}

interface EditProps {
    user: AccountUser;
}

interface PasswordForm {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export default function Edit({ user }: EditProps) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
    } = useForm<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put('/admin/account/password', {
            onSuccess: () => reset(),
        });
    };

    const fullName = [
        user.first_name,
        user.middle_name,
        user.last_name,
        user.suffix,
    ]
        .filter(Boolean)
        .join(' ') || user.name || 'Not provided';

    const inputClass = (hasError?: boolean) =>
        `w-full rounded-lg border px-3 py-2.5 pr-10 text-sm text-slate-700 outline-none transition focus:ring-2 ${
            hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
        }`;

    const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';

    const detailClass =
        'mt-1 text-sm font-medium text-slate-800 break-words';

    return (
        <AdminLayout>
            <Head title="My Account" />

            <div className="space-y-6">
                {/* Page Heading */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        My Account
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        View your account information and manage your password.
                    </p>
                </div>

                {/* Account Information */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                            <UserRound size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Account Information
                            </h2>
                            <p className="text-xs text-slate-500">
                                Your registered personal and account details.
                            </p>
                        </div>
                    </div>

                    <div className="p-5">
                        {/* Profile Picture */}
                        <div className="mb-6 flex items-center gap-4">
                            {user.image ? (
                                <img
                                    src={`/storage/${user.image}`}
                                    alt={fullName}
                                    className="h-20 w-20 rounded-full border border-slate-200 object-cover"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-2xl font-bold text-sky-700">
                                    {fullName
                                        .split(' ')
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .map((part) => part[0].toUpperCase())
                                        .join('')}
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    {fullName}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {user.role ?? 'No role assigned'}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-2">
                            <div>
                                <p className={labelClass}>Full Name</p>
                                <p className={detailClass}>{fullName}</p>
                            </div>

                            <div>
                                <p className={labelClass}>Username</p>
                                <p className={detailClass}>
                                    {user.username || 'Not provided'}
                                </p>
                            </div>

                            <div>
                                <p className={labelClass}>
                                    <Mail size={14} className="mr-1 inline" />
                                    Email Address
                                </p>
                                <p className={detailClass}>{user.email}</p>
                            </div>

                            <div>
                                <p className={labelClass}>
                                    <Phone size={14} className="mr-1 inline" />
                                    Mobile Number
                                </p>
                                <p className={detailClass}>
                                    {user.mobile || 'Not provided'}
                                </p>
                            </div>

                            <div>
                                <p className={labelClass}>
                                    <ShieldCheck size={14} className="mr-1 inline" />
                                    Assigned Role
                                </p>
                                <p className={detailClass}>
                                    {user.role || 'No role assigned'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Account information is managed by your system
                                administrator. Contact your administrator if
                                you need to update these details.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Change Password */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                            <LockKeyhole size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Change Password
                            </h2>
                            <p className="text-xs text-slate-500">
                                Update your password to keep your account secure.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 p-5">
                        {/* Current Password */}
                        <div>
                            <label className={labelClass}>
                                Current Password *
                            </label>

                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData('current_password', e.target.value)
                                    }
                                    className={inputClass(!!errors.current_password)}
                                    autoComplete="current-password"
                                    placeholder="Enter your current password"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCurrentPassword(!showCurrentPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label="Toggle current password visibility"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.current_password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.current_password}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <label className={labelClass}>
                                New Password *
                            </label>

                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className={inputClass(!!errors.password)}
                                    autoComplete="new-password"
                                    placeholder="Enter your new password"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label="Toggle new password visibility"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password}
                                </p>
                            )}

                            <p className="mt-1 text-xs text-slate-400">
                                Minimum 8 characters.
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className={labelClass}>
                                Confirm New Password *
                            </label>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    className={inputClass(
                                        !!errors.password_confirmation
                                    )}
                                    autoComplete="new-password"
                                    placeholder="Confirm your new password"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label="Toggle confirm password visibility"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.password_confirmation && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end border-t border-slate-100 pt-5">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={16} />
                                {processing ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}