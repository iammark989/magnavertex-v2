import type { ReactNode } from "react";

interface LogoProps {
    children: ReactNode;
}

export default function Logo({
    children,
}: LogoProps) {
    return (
        <div className="font-serif text-xl font-bold tracking-wide text-slate-900">
            {children}
        </div>
    );
}