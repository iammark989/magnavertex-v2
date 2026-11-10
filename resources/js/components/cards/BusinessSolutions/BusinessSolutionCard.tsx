import { Link } from "@inertiajs/react";

interface BusinessSolutionCardProps {
    title: string;
    slug: string;
    short_description: string;
    technologies: readonly string[];
    featured_image?: string | null;
    featured?: boolean;
}

export default function BusinessSolutionCard({
    title,
    slug,
    short_description,
    technologies,
    featured_image,
    featured = false,
}: BusinessSolutionCardProps) {
    return (
        <article
            className={`
                group
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-300
                hover:shadow-lg
                hover:shadow-cyan-500/10
                ${featured ? "lg:col-span-2" : ""}
            `}
        >
            {/* Solution Visual */}
            <div
                className="
                    relative
                    flex
                    min-h-52
                    items-center
                    justify-center
                    overflow-hidden
                    bg-slate-100
                "
            >
                {featured_image ? (
                    <img
                        src={featured_image}
                        alt={`${title} solution preview`}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-[1.02]
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            bg-gradient-to-br
                            from-slate-100
                            via-cyan-50
                            to-slate-100
                        "
                    >
                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-slate-400
                            "
                        >
                            Solution Preview
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <h3
                    className="
                        text-xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-600
                    "
                >
                    {short_description}
                </p>

                {/* Technologies */}
                <div
                    className="
                        mt-5
                        flex
                        flex-wrap
                        gap-2
                    "
                >
                    {technologies.map((technology) => (
                        <span
                            key={technology}
                            className="
                                rounded-md
                                border
                                border-slate-200
                                bg-slate-50
                                px-2.5
                                py-1
                                text-xs
                                font-medium
                                text-slate-600
                            "
                        >
                            {technology}
                        </span>
                    ))}
                </div>

                {/* Action */}
                <div className="mt-6">
                    <Link
                        href={`/business-solutions/${slug}`}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-cyan-600
                            transition-colors
                            hover:text-cyan-700
                        "
                    >
                        Learn More

                        <span
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                            "
                        >
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}