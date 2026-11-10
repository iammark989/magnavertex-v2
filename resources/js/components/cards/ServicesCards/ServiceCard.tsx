import type { LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    slug: string;
}

export default function ServiceCard({
    title,
    description,
    icon: Icon,
    slug,
}: ServiceCardProps) {
    return (
        <Link
            href={slug ? `/services/${slug}` : '/services'}
            className="
                group
                relative
                block
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-300
                hover:shadow-lg
                hover:shadow-cyan-500/10
                before:absolute
                before:left-0
                before:top-0
                before:h-1
                before:w-0
                before:bg-cyan-500
                before:transition-all
                before:duration-300
                group-hover:before:w-full
            "
        >
            <div className="
                mb-5
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-100
                bg-cyan-50
                text-cyan-600
                transition-all
                duration-300
                group-hover:border-cyan-500
                group-hover:bg-cyan-500
                group-hover:text-white
            ">
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="
                text-xl
                font-bold
                tracking-tight
                text-slate-900
            ">
                {title}
            </h3>

            <p className="
                mt-3
                text-sm
                leading-6
                text-slate-600
            ">
                {description}
            </p>
        </Link>
    );
}