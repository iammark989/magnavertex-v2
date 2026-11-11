import { useState, type ReactNode } from 'react';
import AdminSidebar from '../components/layout/admin/AdminSidebar';
import AdminTopbar from '../components/layout/admin/AdminTopbar';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({
    children,
}: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                <AdminSidebar
                    isOpen={sidebarOpen}
                    onClose={closeSidebar}
                />

                <div className="flex min-w-0 flex-1 flex-col">
                    <AdminTopbar
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="mx-auto w-full max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}