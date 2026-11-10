import type { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
    id?: string;
    children: ReactNode;
}

export default function Section({
    id,
    children,
}: SectionProps) {
    return (
        <section
            id={id}
            className="py-24"
        >
            <Container>
                {children}
            </Container>
        </section>
    );
}