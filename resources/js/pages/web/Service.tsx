import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CheckCircle2,
    Cloud,
    FileText,
    Globe,
    MessageCircle,
} from 'lucide-react';

import Container from '../../components/ui/Container';
import WebLayout from '../../layouts/WebLayout';
import { scrollToSection } from '../../utils/sectionNavigation';
import type { Service } from '../../types/service';

interface ServicePageProps {
    service: Service;
}

const SERVICE_ICONS = {
    globe: Globe,
    'building-2': Building2,
    'file-text': FileText,
    cloud: Cloud,
} as const;

const BENEFITS = [
    'Business-focused approach',
    'Modern technology',
    'Scalable architecture',
    'Responsive user experience',
];

export default function ServicePage({ service }: ServicePageProps) {
    const ServiceIcon =
        SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS] ?? Globe;

    return (
        <WebLayout>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#071B3A] via-[#0B2D59] to-[#075985] py-24 text-white">
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

                <Container>
                    <div className="relative z-10">
                        <button
                            type="button"
                            onClick={() => scrollToSection('services')}
                            className="cursor-pointer mb-10 inline-flex items-center gap-2 text-sm font-medium text-sky-200 transition hover:text-white"
                        >
                            <ArrowLeft size={18} />
                            Back to Services
                        </button>

                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-sky-300 backdrop-blur">
                            <ServiceIcon size={32} />
                        </div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                            Our Service
                        </p>

                        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                            {service.title}
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
                            {service.short_description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Main Content */}
            <section className="bg-white py-20">
                <Container>
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-600">
                                What We Do
                            </p>

                            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                                Digital solutions designed around your business
                            </h2>

                            <div className="text-base leading-8 text-slate-600">
                                {service.description ? (
                                    <p className="whitespace-pre-line">
                                        {service.description}
                                    </p>
                                ) : (
                                    <p>
                                        We deliver practical digital solutions
                                        designed to support your business
                                        operations, improve efficiency, and
                                        help your organization grow.
                                    </p>
                                )}
                            </div>
                        </div>

                        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-8 lg:sticky lg:top-28">
                            <h3 className="mb-3 text-xl font-bold text-slate-900">
                                Built for your needs
                            </h3>

                            <p className="mb-6 text-sm leading-6 text-slate-600">
                                We focus on delivering reliable, maintainable,
                                and scalable solutions that align with your
                                business goals.
                            </p>

                            <ul className="space-y-4">
                                {BENEFITS.map((benefit) => (
                                    <li
                                        key={benefit}
                                        className="flex items-center gap-3 text-sm font-medium text-slate-700"
                                    >
                                        <CheckCircle2
                                            size={19}
                                            className="shrink-0 text-sky-600"
                                        />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="bg-slate-50 py-16">
                <Container>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071B3A] to-[#0B3B69] px-8 py-12 text-white md:px-14 md:py-16">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

                        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-xl">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-sky-300">
                                    <MessageCircle size={25} />
                                </div>

                                <h2 className="text-3xl font-bold md:text-4xl">
                                    Have a project in mind?
                                </h2>

                                <p className="mt-4 leading-7 text-slate-300">
                                    Let's discuss how we can help turn your
                                    ideas into practical digital solutions.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('contact')}
                                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
                                >
                                    Start a Conversation
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => scrollToSection('services')}
                                    className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                                >
                                    View All Services
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </WebLayout>
    );
}