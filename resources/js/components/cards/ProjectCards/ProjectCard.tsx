interface ProjectCardProps {
    title: string;
    description: string;
    technologies: readonly string[];
    featured_image?: string | null;
    featured?: boolean;
}

export default function ProjectCard({
    title,
    description,
    technologies,
    featured_image,
    featured = false,
}: ProjectCardProps) {
    return (
        <article
            className={`
                group
                h-full
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
            {/* Project Visual */}
            <div className="
                relative
                flex
                min-h-52
                items-center
                justify-center
                overflow-hidden
                bg-slate-100
            ">
                {featured_image ? (
                    <img
                        src={featured_image}
                        alt={`${title} project preview`}
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
                    <div className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-slate-100
                        via-cyan-50
                        to-slate-100
                    ">
                        <span className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-slate-400
                        ">
                            Project Preview
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
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

                {/* Technologies */}
                <div className="
                    mt-5
                    flex
                    flex-wrap
                    gap-2
                ">
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
            </div>
        </article>
    );
}