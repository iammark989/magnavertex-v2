import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    LogOut,
    Menu,
    UserRound,
} from 'lucide-react';

interface AuthUser {
    id: number;
    name: string;
    username: string | null;
    email: string;
    image: string | null;
    role: {
        name: string;
        slug: string;
    } | null;
}

interface SharedProps {
    [key: string]: unknown;

    auth: {
        user: AuthUser | null;
    };
}

interface AdminTopbarProps {
    onMenuClick: () => void;
}

export default function AdminTopbar({
    onMenuClick,
}: AdminTopbarProps) {
    const { auth } = usePage<SharedProps>().props;
    const user = auth.user;

    const [profileOpen, setProfileOpen] = useState(false);

    const initials = user?.name
        ?.split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('') || 'U';

    const handleLogout = () => {
        setProfileOpen(false);
        router.post('/admin/logout');
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
                    aria-label="Open sidebar"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h1 className="text-sm font-semibold text-slate-800 sm:text-base">
                        Administration
                    </h1>
                    <p className="hidden text-xs text-slate-500 sm:block">
                        Magna Vertex Technologies
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                        {user?.name ?? 'Administrator'}
                    </p>
                    <p className="text-xs text-slate-500">
                        {user?.role?.name ?? 'No role assigned'}
                    </p>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100"
                        aria-label="Open profile menu"
                        aria-expanded={profileOpen}
                    >
                        {user?.image ? (
                            <img
                                src={`/storage/${user.image}`}
                                alt={user.name}
                                className="h-9 w-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                                {initials}
                            </div>
                        )}

                        <ChevronDown
                            size={16}
                            className={`text-slate-500 transition-transform ${
                                profileOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {profileOpen && (
                        <>
                            {/* Mobile backdrop */}
                            <button
                                type="button"
                                onClick={() => setProfileOpen(false)}
                                className="fixed inset-0 z-40 cursor-default"
                                aria-label="Close profile menu"
                            />

                            <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                                <div className="border-b border-slate-100 px-4 py-3 sm:hidden">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {user?.name ?? 'Administrator'}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {user?.role?.name ?? 'No role assigned'}
                                    </p>
                                </div>

                                {user?.role?.slug !== 'super-admin' && (
                                    <Link
                                        href="/admin/account"
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
                                    >
                                        <UserRound size={18} />
                                        My Account
                                    </Link>
                                )}

                                <div className="my-1 border-t border-slate-100" />

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}