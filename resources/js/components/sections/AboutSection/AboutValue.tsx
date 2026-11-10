interface AboutValueProps {
    title: string;
    description: string;
}

export default function AboutValue({
    title,
    description,
}: AboutValueProps) {
    return (
        <article className="
            border-l-2
            border-cyan-400/40
            pl-5
        ">
            <h3 className="
                text-base
                font-bold
                text-slate-900
            ">
                {title}
            </h3>

            <p className="
                mt-2
                text-sm
                leading-6
                text-slate-600
            ">
                {description}
            </p>
        </article>
    );
}