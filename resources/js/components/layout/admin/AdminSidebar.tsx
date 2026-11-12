import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    BriefcaseBusiness,
    MessageSquare,
    Users,
    ShieldCheck,
    X,
    Globe,
} from 'lucide-react';

interface AuthUser {
    role: {
        slug: string;
    } | null;
}

interface SharedProps {
    [key: string]: unknown;
    auth: {
        user: AuthUser | null;
    };
}

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigation = [
    {
        label: 'MAIN MENU',
        items: [
            {
                name: 'Dashboard',
                href: '/admin/dashboard',
                icon: LayoutDashboard,
            },
        ],
    },
    {
        label: 'WEBSITE MANAGEMENT',
        items: [
            {
                name: 'Services',
                href: '/admin/services',
                icon: BriefcaseBusiness,
            },
            {
                name: 'Business Solutions',
                href: '/admin/business-solutions',
                icon: Globe,
            },
            {
                name: 'Contact Inquiries',
                href: '/admin/inquiries',
                icon: MessageSquare,
            },
        ],
    },
];

export default function AdminSidebar({
    isOpen,
    onClose,
}: AdminSidebarProps) {
    const page = usePage<SharedProps>();
    const { auth } = page.props;
    const url = page.url;
    const isSuperAdmin =
        auth.user?.role?.slug === 'super-admin';

    const isActive = (href: string) => {
        const currentPath = url.split('?')[0].replace(/\/$/, '') || '/';
        return currentPath === href ||
            currentPath.startsWith(`${href}/`);
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <button
                    type="button"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
                    aria-label="Close sidebar"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Branding */}
                <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white">
                            <Globe size={21} />
                        </div>

                        <div>
                            <p className="text-sm font-bold tracking-wide text-slate-900">
                                MAGNA VERTEX
                            </p>
                            <p className="text-[10px] font-medium tracking-widest text-slate-500">
                                ADMINISTRATION
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
                    {navigation.map((section) => (
                        <div key={section.label}>
                            <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
                                {section.label}
                            </p>

                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                                active
                                                    ? 'bg-sky-50 text-sky-700'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            <Icon size={19} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Super Admin only */}
                    {isSuperAdmin && (
                        <div>
                            <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
                                ADMINISTRATION
                            </p>

                            <div className="space-y-1">
                                <Link
                                    href="/admin/users"
                                    onClick={onClose}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                        isActive('/admin/users')
                                            ? 'bg-sky-50 text-sky-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <Users size={19} />
                                    User Management
                                </Link>

                                <Link
                                    href="/admin/roles"
                                    onClick={onClose}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                        isActive('/admin/roles')
                                            ? 'bg-sky-50 text-sky-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <ShieldCheck size={19} />
                                    Role Management
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Sidebar footer */}
                <div className="border-t border-slate-200 p-4">
                    <p className="text-xs text-slate-400">
                        Magna Vertex Technologies
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                        Administration Panel
                    </p>
                </div>
            </aside>
        </>
    );
}