import { router, usePage, type PageProps } from '@inertiajs/react';
import { LogOut, Menu, UserCircle } from 'lucide-react';

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

interface SharedProps extends PageProps {
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

    const initials = user?.name
        ?.split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('') || 'U';

    const handleLogout = () => {
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

                {user?.image ? (
                    <img
                        src={`/storage/${user.image}`}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                        {initials || <UserCircle size={20} />}
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    title="Logout"
                >
                    <LogOut size={17} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>
    );
}