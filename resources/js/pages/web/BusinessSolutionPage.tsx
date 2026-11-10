import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import type { BusinessSolution } from "../../types/businessSolution";
import { getBusinessSolution } from "../../api/businessSolutions";

import { getImageUrl } from "../../utils/image";

export default function BusinessSolutionPage() {
    const navigate = useNavigate();

    const { slug } = useParams<{ slug: string }>();

    const [solution, setSolution] =
        useState<BusinessSolution | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Gallery Lightbox
    |--------------------------------------------------------------------------
    */

    const [selectedGalleryImage, setSelectedGalleryImage] =
        useState<string | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Navigation
    |--------------------------------------------------------------------------
    */

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            return;
        }

        navigate("/", {
            state: {
                scrollTo: id,
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Load Business Solution
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const loadSolution = async () => {
            if (!slug) {
                setError(true);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const data = await getBusinessSolution(slug);

                setSolution(data);
            } catch (error) {
                console.error(
                    "Failed to load business solution:",
                    error
                );

                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadSolution();
    }, [slug]);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <MainLayout>
                <section className="flex min-h-[70vh] items-center justify-center bg-[#F8FBFF]">
                    <p className="text-sm text-slate-500">
                        Loading solution...
                    </p>
                </section>
            </MainLayout>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error / Not Found
    |--------------------------------------------------------------------------
    */

    if (error || !solution) {
        return (
            <MainLayout>
                <section className="flex min-h-[70vh] items-center justify-center bg-[#F8FBFF] px-6">
                    <div className="text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
                            Business Solution
                        </span>

                        <h1 className="mt-4 text-3xl font-bold text-slate-900">
                            Solution Not Found
                        </h1>

                        <p className="mx-auto mt-4 max-w-md text-slate-600">
                            The business solution you're looking for may
                            no longer be available.
                        </p>

                        <button
                            onClick={() =>
                                scrollToSection("solutions")
                            }
                            className="
                                mt-7
                                inline-flex
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-xl
                                bg-cyan-600
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-cyan-700
                            "
                        >
                            Back to Business Solutions
                        </button>
                    </div>
                </section>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <main className="bg-[#F8FBFF]">

                {/* =========================================================
                    Hero
                ========================================================== */}

                <section className="relative overflow-hidden">
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-br
                            from-[#071B35]
                            via-[#0F4C81]
                            to-[#F8FBFF]
                            opacity-[0.08]
                        "
                    />

                    <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">

                        {/* Breadcrumb */}

                        <button
                            onClick={() =>
                                scrollToSection("solutions")
                            }
                            className="
                                inline-flex
                                cursor-pointer
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-cyan-600
                                transition
                                hover:text-cyan-700
                            "
                        >
                            <span>←</span>
                            Back to Business Solutions
                        </button>

                        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                            {/* Text */}

                            <div>
                                <span
                                    className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.25em]
                                        text-cyan-600
                                    "
                                >
                                    {solution.category}
                                </span>

                                <h1
                                    className="
                                        mt-4
                                        text-4xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        sm:text-5xl
                                        lg:text-6xl
                                    "
                                >
                                    {solution.title}
                                </h1>

                                <p
                                    className="
                                        mt-6
                                        max-w-2xl
                                        text-lg
                                        leading-8
                                        text-slate-600
                                    "
                                >
                                    {solution.short_description}
                                </p>

                                {/* Technologies */}

                                {solution.technologies?.length > 0 && (
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        {solution.technologies.map(
                                            (technology) => (
                                                <span
                                                    key={technology}
                                                    className="
                                                        rounded-lg
                                                        border
                                                        border-slate-200
                                                        bg-white
                                                        px-3
                                                        py-1.5
                                                        text-sm
                                                        font-medium
                                                        text-slate-600
                                                        shadow-sm
                                                    "
                                                >
                                                    {technology}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* Demo */}

                                {solution.demo_url && (
                                    <div className="mt-8">
                                        <a
                                            href={solution.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                inline-flex
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-cyan-600
                                                px-6
                                                py-3
                                                text-sm
                                                font-semibold
                                                text-white
                                                shadow-sm
                                                transition
                                                hover:bg-cyan-700
                                            "
                                        >
                                            View Demo
                                            <span className="ml-2">
                                                ↗
                                            </span>
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Featured Image */}

                            <div
                                className="
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-xl
                                    shadow-slate-900/10
                                "
                            >
                                {solution.featured_image ? (
                                    <img
                                        src={getImageUrl(
                                            solution.featured_image
                                        )}
                                        alt={`${solution.title} preview`}
                                        className="
                                            aspect-[16/10]
                                            w-full
                                            object-cover
                                        "
                                    />
                                ) : (
                                    <div
                                        className="
                                            flex
                                            aspect-[16/10]
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

                        </div>
                    </div>
                </section>

                {/* =========================================================
                    Business Challenge
                ========================================================== */}

                <section className="bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-4xl px-6 sm:px-8">

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-cyan-600
                            "
                        >
                            The Business Challenge
                        </span>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-4xl
                            "
                        >
                            Understanding the Need
                        </h2>

                        <p
                            className="
                                mt-6
                                whitespace-pre-line
                                text-base
                                leading-8
                                text-slate-600
                                sm:text-lg
                            "
                        >
                            {solution.business_challenge}
                        </p>

                    </div>
                </section>

                {/* =========================================================
                    Solution
                ========================================================== */}

                <section className="bg-[#F8FBFF] py-20 sm:py-24">
                    <div className="mx-auto max-w-4xl px-6 sm:px-8">

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-cyan-600
                            "
                        >
                            Our Approach
                        </span>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-4xl
                            "
                        >
                            A Solution Built Around Your Workflow
                        </h2>

                        <p
                            className="
                                mt-6
                                whitespace-pre-line
                                text-base
                                leading-8
                                text-slate-600
                                sm:text-lg
                            "
                        >
                            {solution.solution_description}
                        </p>

                    </div>
                </section>

                {/* =========================================================
                    Capabilities
                ========================================================== */}

                {solution.capabilities &&
                    solution.capabilities.length > 0 && (
                        <section className="bg-white py-20 sm:py-24">
                            <div className="mx-auto max-w-6xl px-6 sm:px-8">

                                <div className="max-w-2xl">
                                    <span
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.25em]
                                            text-cyan-600
                                        "
                                    >
                                        Key Capabilities
                                    </span>

                                    <h2
                                        className="
                                            mt-4
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                            sm:text-4xl
                                        "
                                    >
                                        What This Solution Can Handle
                                    </h2>
                                </div>

                                <div
                                    className="
                                        mt-12
                                        grid
                                        gap-5
                                        sm:grid-cols-2
                                        lg:grid-cols-3
                                    "
                                >
                                    {solution.capabilities.map(
                                        (capability) => (
                                            <div
                                                key={capability.id}
                                                className="
                                                    rounded-2xl
                                                    border
                                                    border-slate-200
                                                    bg-[#F8FBFF]
                                                    p-6
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-cyan-50
                                                        text-cyan-600
                                                    "
                                                >
                                                    ✓
                                                </div>

                                                <h3
                                                    className="
                                                        mt-5
                                                        text-lg
                                                        font-semibold
                                                        text-slate-900
                                                    "
                                                >
                                                    {capability.title}
                                                </h3>

                                                {capability.description && (
                                                    <p
                                                        className="
                                                            mt-3
                                                            text-sm
                                                            leading-6
                                                            text-slate-600
                                                        "
                                                    >
                                                        {
                                                            capability.description
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>

                            </div>
                        </section>
                    )}

                {/* =========================================================
                    Gallery
                ========================================================== */}

                {solution.images &&
                    solution.images.length > 0 && (
                        <section className="bg-[#F8FBFF] py-20 sm:py-24">
                            <div className="mx-auto max-w-7xl px-6 sm:px-8">

                                <div className="max-w-2xl">
                                    <span
                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.25em]
                                            text-cyan-600
                                        "
                                    >
                                        Project Gallery
                                    </span>

                                    <h2
                                        className="
                                            mt-4
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                            sm:text-4xl
                                        "
                                    >
                                        A Closer Look at the Solution
                                    </h2>

                                    <p
                                        className="
                                            mt-5
                                            text-base
                                            leading-7
                                            text-slate-600
                                            sm:text-lg
                                        "
                                    >
                                        Explore selected screens and
                                        visual highlights from this
                                        business solution.
                                    </p>
                                </div>

                                <div
                                    className="
                                        mt-12
                                        grid
                                        gap-6
                                        sm:grid-cols-2
                                        lg:grid-cols-3
                                    "
                                >
                                    {solution.images.map(
                                        (galleryImage) => (
                                            <figure
                                                key={galleryImage.id}
                                                className="group"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedGalleryImage(
                                                            galleryImage.image
                                                        )
                                                    }
                                                    className="
                                                        block
                                                        w-full
                                                        cursor-pointer
                                                        overflow-hidden
                                                        rounded-2xl
                                                        border
                                                        border-slate-200
                                                        bg-white
                                                        text-left
                                                        shadow-sm
                                                        transition
                                                        duration-300
                                                        hover:-translate-y-1
                                                        hover:shadow-lg
                                                    "
                                                >
                                                    <div className="overflow-hidden">
                                                        <img
                                                            src={getImageUrl(
                                                                galleryImage.image
                                                            )}
                                                            alt={
                                                                galleryImage.caption ||
                                                                `${solution.title} gallery image`
                                                            }
                                                            className="
                                                                aspect-video
                                                                w-full
                                                                object-cover
                                                                transition
                                                                duration-500
                                                                group-hover:scale-105
                                                            "
                                                        />
                                                    </div>
                                                </button>

                                                {galleryImage.caption && (
                                                    <figcaption
                                                        className="
                                                            mt-3
                                                            px-1
                                                            text-sm
                                                            leading-6
                                                            text-slate-500
                                                        "
                                                    >
                                                        {
                                                            galleryImage.caption
                                                        }
                                                    </figcaption>
                                                )}
                                            </figure>
                                        )
                                    )}
                                </div>

                            </div>
                        </section>
                    )}

                {/* =========================================================
                    Gallery Lightbox
                ========================================================== */}

                {selectedGalleryImage && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-50
                            flex
                            items-center
                            justify-center
                            bg-slate-950/90
                            p-4
                            backdrop-blur-sm
                        "
                        onClick={() =>
                            setSelectedGalleryImage(null)
                        }
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedGalleryImage(null)
                            }
                            className="
                                absolute
                                right-5
                                top-5
                                z-10
                                flex
                                h-10
                                w-10
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                text-2xl
                                text-white
                                transition
                                hover:bg-white/20
                            "
                            aria-label="Close image preview"
                        >
                            ×
                        </button>

                        <img
                            src={getImageUrl(
                                selectedGalleryImage
                            )}
                            alt={`${solution.title} gallery preview`}
                            className="
                                max-h-[90vh]
                                max-w-[95vw]
                                rounded-2xl
                                object-contain
                                shadow-2xl
                            "
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        />
                    </div>
                )}

                {/* =========================================================
                    Ideal For
                ========================================================== */}

                <section className="bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-4xl px-6 sm:px-8">

                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-cyan-600
                            "
                        >
                            Ideal For
                        </span>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-4xl
                            "
                        >
                            Who Can Benefit From This Solution?
                        </h2>

                        <p
                            className="
                                mt-6
                                whitespace-pre-line
                                text-base
                                leading-8
                                text-slate-600
                                sm:text-lg
                            "
                        >
                            {solution.ideal_for}
                        </p>

                    </div>
                </section>

                {/* =========================================================
                    CTA
                ========================================================== */}

                <section className="bg-[#F8FBFF] py-20 sm:py-24">
                    <div
                        className="
                            mx-auto
                            max-w-4xl
                            px-6
                            text-center
                            sm:px-8
                        "
                    >
                        <h2
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-4xl
                            "
                        >
                            Have a Similar Business Need?
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-2xl
                                text-base
                                leading-7
                                text-slate-600
                                sm:text-lg
                            "
                        >
                            Let's discuss your workflow, requirements,
                            and how a custom digital solution can help
                            your organization.
                        </p>

                        <button
                            onClick={() =>
                                scrollToSection("contact")
                            }
                            className="
                                mt-8
                                inline-flex
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-xl
                                bg-cyan-600
                                px-7
                                py-3.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-cyan-700
                            "
                        >
                            Discuss Your Business Need
                        </button>
                    </div>
                </section>

            </main>
        </MainLayout>
    );
}