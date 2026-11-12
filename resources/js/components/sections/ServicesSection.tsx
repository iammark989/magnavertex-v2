import Container from '../ui/Container';
import ServiceCard from '../cards/ServicesCards/ServiceCard';

import type { Service } from '../../types/service';

import {
    Globe,
    Building2,
    FileText,
    Cloud,
} from 'lucide-react';

const SERVICE_ICONS = {
    globe: Globe,
    'building-2': Building2,
    'file-text': FileText,
    cloud: Cloud,
} as const;

interface ServicesSectionProps {
    services: Service[];
}

export default function ServicesSection({
    services,
}: ServicesSectionProps) {
    return (
        <section
            id="services"
            className="
                relative
                overflow-hidden
                bg-[#F8FBFF]
                py-24
                sm:py-28
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-64
                    w-64
                    -translate-x-1/2
                    rounded-full
                    bg-cyan-300/10
                    blur-3xl
                "
            />

            <Container>
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-cyan-600
                    ">
                        Our Services
                    </span>

                    <h2 className="
                        mt-4
                        text-3xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        sm:text-4xl
                        lg:text-5xl
                    ">
                        Digital Solutions Built
                        <span className="text-cyan-500">
                            {' '}for Business
                        </span>
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        leading-7
                        text-slate-600
                        sm:text-lg
                    ">
                        We create modern digital solutions that help
                        businesses improve operations, connect with
                        customers, and grow online.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="
                    mx-auto
                    mt-14
                    grid
                    max-w-5xl
                    grid-cols-1
                    gap-6
                    sm:grid-cols-2
                    lg:gap-8
                ">
                    {services
                    .filter((service) => service.is_featured)
                    .map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.short_description}
                            icon={
                                service.icon &&
                                service.icon in SERVICE_ICONS
                                    ? SERVICE_ICONS[
                                        service.icon as keyof typeof SERVICE_ICONS
                                    ]
                                    : Globe
                            }
                            slug={service.slug}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}