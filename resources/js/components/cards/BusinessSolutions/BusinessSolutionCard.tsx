
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
               
               
            </div>
        </article>
    );
}