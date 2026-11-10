import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CheckCircle2,
    Cloud,
    FileText,
    Globe,
    MessageCircle,
} from "lucide-react";

import Container from "../../components/ui/Container";
import MainLayout from "../../layouts/MainLayout";

import {
    getService,
    type Service,
} from "../../api/services";

const SERVICE_ICONS = {
    globe: Globe,
    "building-2": Building2,
    "file-text": FileText,
    cloud: Cloud,
} as const;

export default function ServiceDetailPage() {
    const { slug } = useParams<{ slug: string }>();

    const [service, setService] =
        useState<Service | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!slug) {
            setError("Service not found.");
            setLoading(false);
            return;
        }

        const loadService = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getService(slug);

                setService(data);
            } catch (error) {
                console.error(
                    "Failed to load service:",
                    error
                );

                setError(
                    "We couldn't find the service you're looking for."
                );
            } finally {
                setLoading(false);
            }
        };

        loadService();
    }, [slug]);

    
    const navigate = useNavigate();
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
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F8FBFF]">

                <section className="py-32">
                    <Container>
                        <div className="flex min-h-[300px] items-center justify-center">

                            <div className="text-center">

                                <div
                                    className="
                                        mx-auto
                                        h-10
                                        w-10
                                        animate-spin
                                        rounded-full
                                        border-2
                                        border-slate-200
                                        border-t-cyan-500
                                    "
                                />

                                <p className="mt-4 text-sm text-slate-500">
                                    Loading service...
                                </p>

                            </div>

                        </div>
                    </Container>
                </section>

            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error / Not Found
    |--------------------------------------------------------------------------
    */

    if (error || !service) {
        return (
            <MainLayout>
            <main className="min-h-screen bg-[#F8FBFF]">

                <section className="py-32">
                    <Container>

                        <div className="mx-auto max-w-xl text-center">

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-cyan-50
                                    text-cyan-600
                                "
                            >
                                <Globe className="h-7 w-7" />
                            </div>

                            <h1
                                className="
                                    mt-6
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Service Not Found
                            </h1>

                            <p className="mt-4 text-slate-600">
                                {error ||
                                    "The requested service could not be found."}
                            </p>

                             <button
                            onClick={() =>
                                scrollToSection("services")
                            }
                                className="
                                    mt-8
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-cyan-600
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-cyan-700
                                    cursor-pointer
                                "
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Services
                            </button>

                        </div>

                    </Container>
                </section>

            </main>
            </MainLayout>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Icon
    |--------------------------------------------------------------------------
    */

    const Icon =
        SERVICE_ICONS[
            service.icon as keyof typeof SERVICE_ICONS
        ] ?? Globe;

    return (
        <MainLayout>
        <main className="bg-[#F8FBFF]">

            {/* =========================================================
                Hero
            ========================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-gradient-to-br
                    from-[#071B35]
                    via-[#0F4C81]
                    to-[#F8FBFF]
                    py-24
                    sm:py-28
                "
            >

                {/* Decorative glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-32
                        top-10
                        h-80
                        w-80
                        rounded-full
                        bg-cyan-300/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-32
                        bottom-0
                        h-72
                        w-72
                        rounded-full
                        bg-cyan-400/10
                        blur-3xl
                    "
                />

                <Container>

                    <div className="relative mx-auto max-w-4xl">

                        {/* Back */}

                        <button
                            onClick={() =>
                                scrollToSection("services")
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-white/70
                                transition
                                hover:text-white
                                cursor-pointer
                            "
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Services
                        </button>

                        {/* Icon */}

                        <div
                            className="
                                mt-10
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white/20
                                bg-white/10
                                text-cyan-300
                                backdrop-blur-sm
                            "
                        >
                            <Icon className="h-8 w-8" />
                        </div>

                        {/* Label */}

                        <span
                            className="
                                mt-7
                                block
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-cyan-300
                            "
                        >
                            Our Service
                        </span>

                        {/* Title */}

                        <h1
                            className="
                                mt-4
                                max-w-3xl
                                text-4xl
                                font-bold
                                tracking-tight
                                text-white
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            {service.title}
                        </h1>

                        {/* Short description */}

                        <p
                            className="
                                mt-6
                                max-w-3xl
                                text-lg
                                leading-8
                                text-white/75
                                sm:text-xl
                            "
                        >
                            {service.short_description}
                        </p>

                    </div>

                </Container>
            </section>

            {/* =========================================================
                Main Content
            ========================================================== */}

            <section className="py-20 sm:py-24">

                <Container>

                    <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

                        {/* Main */}

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
                                What We Do
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
                                Digital solutions designed
                                <span className="text-cyan-500">
                                    {" "}around your business
                                </span>
                            </h2>

                            {service.description ? (
                                <div
                                    className="
                                        mt-7
                                        whitespace-pre-line
                                        text-base
                                        leading-8
                                        text-slate-600
                                        sm:text-lg
                                    "
                                >
                                    {service.description}
                                </div>
                            ) : (
                                <p
                                    className="
                                        mt-7
                                        text-base
                                        leading-8
                                        text-slate-600
                                        sm:text-lg
                                    "
                                >
                                    We work with businesses to
                                    design and develop practical
                                    digital solutions that improve
                                    operations, customer experiences,
                                    and long-term growth.
                                </p>
                            )}

                        </div>

                        {/* Sidebar */}

                        <aside>

                            <div
                                className="
                                    sticky
                                    top-28
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-6
                                    shadow-sm
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-cyan-50
                                        text-cyan-600
                                    "
                                >
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>

                                <h3
                                    className="
                                        mt-5
                                        text-lg
                                        font-bold
                                        text-slate-900
                                    "
                                >
                                    Built for your needs
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-slate-600
                                    "
                                >
                                    We focus on practical,
                                    scalable solutions that align
                                    with your business goals.
                                </p>

                                <div
                                    className="
                                        mt-6
                                        space-y-3
                                    "
                                >

                                    {[
                                        "Business-focused approach",
                                        "Modern technology",
                                        "Scalable architecture",
                                        "Responsive user experience",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="
                                                flex
                                                items-start
                                                gap-3
                                                text-sm
                                                text-slate-600
                                            "
                                        >
                                            <CheckCircle2
                                                className="
                                                    mt-0.5
                                                    h-4
                                                    w-4
                                                    shrink-0
                                                    text-cyan-500
                                                "
                                            />

                                            <span>
                                                {item}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </aside>

                    </div>

                </Container>
            </section>

            {/* =========================================================
                CTA
            ========================================================== */}

            <section className="pb-24">

                <Container>

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            bg-[#071B35]
                            px-6
                            py-12
                            sm:px-10
                            sm:py-14
                        "
                    >

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-20
                                -top-20
                                h-64
                                w-64
                                rounded-full
                                bg-cyan-400/10
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                relative
                                mx-auto
                                max-w-3xl
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white/10
                                    text-cyan-300
                                "
                            >
                                <MessageCircle className="h-6 w-6" />
                            </div>

                            <h2
                                className="
                                    mt-5
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    sm:text-3xl
                                "
                            >
                                Have a project in mind?
                            </h2>

                            <p
                                className="
                                    mx-auto
                                    mt-4
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-white/65
                                    sm:text-base
                                "
                            >
                                Let's discuss your business
                                requirements and explore how we
                                can build the right digital
                                solution for you.
                            </p>

                            <div
                                className="
                                    mt-7
                                    flex
                                    flex-col
                                    justify-center
                                    gap-3
                                    sm:flex-row
                                "
                            >

                                 <button
                                    onClick={() =>
                                        scrollToSection("contact")
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-cyan-500
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-cyan-400
                                        cursor-pointer
                                    "
                                >
                                    Start a Conversation
                                    <ArrowRight className="h-4 w-4" />
                                </button>

                                 <button
                                    onClick={() =>
                                        scrollToSection("services")
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/15
                                        bg-white/5
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-white/10
                                        cursor-pointer
                                    "
                                >
                                    View All Services
                                </button>

                            </div>

                        </div>

                    </div>

                </Container>

            </section>

        </main>
        </MainLayout>
    );
}