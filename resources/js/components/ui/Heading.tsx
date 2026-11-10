import type { ReactNode } from "react";

interface HeadingProps {
    children: ReactNode;
}

export default function Heading({
    children,
}: HeadingProps) {
    return (
        <h2 className="font-heading text-4xl font-bold text-slate-900 md:text-5xl">
            {children}
        </h2>
    );
}