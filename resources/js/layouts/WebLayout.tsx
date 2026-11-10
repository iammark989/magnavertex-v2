import type { ReactNode } from 'react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/navigation/ScrollToTop';

interface WebLayoutProps {
    children: ReactNode;
}

export default function WebLayout({
    children,
}: WebLayoutProps) {
    return (
        <>
            <ScrollToTop />

            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}