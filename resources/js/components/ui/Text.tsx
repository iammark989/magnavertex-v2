import type { ReactNode } from "react";

interface TextProps {
    children: ReactNode;
}

export default function Text({
    children,
}: TextProps) {
    return (
        <p className="mt-8 max-w-xl text-lg leading-8 text-base text-white md:text-lg">
            {children}
        </p>
    );
}