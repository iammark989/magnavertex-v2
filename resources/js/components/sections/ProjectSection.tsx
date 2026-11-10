import Container from "../ui/Container";
import ProjectCard from "../cards/ProjectCards/ProjectCard";

import { PROJECTS } from "../../constants/projects";

const SOLUTION_CATEGORIES = [
    {
        id: "ecommerce",
        title: "E-Commerce & Retail",
        description:
            "Digital solutions for product catalogs, online selling, inventory, orders, and retail operations.",
    },
    {
        id: "operations",
        title: "Business Operations",
        description:
            "Systems that help businesses organize workflows, information, processes, and day-to-day operations.",
    },
    {
        id: "hr",
        title: "Employee & HR Management",
        description:
            "Digital tools for managing employee information, internal processes, and workforce operations.",
    },
    {
        id: "recruitment",
        title: "Recruitment & Applicant Management",
        description:
            "Solutions for job publishing, applications, candidate management, and recruitment workflows.",
    },
    {
        id: "sales",
        title: "Sales & Customer Management",
        description:
            "Systems for organizing customers, sales activities, orders, services, and customer-related information.",
    },
    {
        id: "custom",
        title: "Custom Business Applications",
        description:
            "Purpose-built applications designed around your organization's specific workflows and requirements.",
    },
];

export default function ProjectsSection() {


    return (
        <section
            id="solutions"
            className="
                relative
                overflow-hidden
                bg-[#F8FBFF]
                py-24
                sm:py-28
            "
        >
            <Container>

                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-cyan-600
                        "
                    >
                        Business Solutions
                    </span>

                    <h2
                        className="
                            mt-4
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Digital Solutions Built
                        <span className="text-cyan-500">
                            {" "}Around Your Business
                        </span>
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
                        Practical digital solutions designed to help
                        businesses improve their operations, manage
                        information, and support their goals.
                    </p>
                </div>

                {/* Solution Categories */}
                <div className="mx-auto mt-14 max-w-6xl">
                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {SOLUTION_CATEGORIES.map((category) => (
                            <div
                                key={category.id}
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-6
                                    shadow-sm
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-md
                                "
                            >
                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-slate-900
                                    "
                                >
                                    {category.title}
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        leading-6
                                        text-slate-600
                                    "
                                >
                                    {category.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Demonstration Solutions */}
                <div className="mt-24">

                    <div className="mx-auto max-w-2xl text-center">
                        <span
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-cyan-600
                            "
                        >
                            Demonstration Solutions
                        </span>

                        <h3
                            className="
                                mt-4
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-3xl
                            "
                        >
                            See What We Can Build
                        </h3>

                        <p
                            className="
                                mt-4
                                text-base
                                leading-7
                                text-slate-600
                            "
                        >
                            Explore examples of systems developed to
                            demonstrate practical solutions for real
                            business needs.
                        </p>
                    </div>

                    <div
                        className="
                            mx-auto
                            mt-12
                            grid
                            max-w-5xl
                            grid-cols-1
                            gap-6
                            lg:grid-cols-2
                            lg:gap-8
                        "
                    >
                        {PROJECTS.map((project) => (
                            <ProjectCard
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                technologies={project.technologies}
                                featured_image={project.featured_image}
                                featured={project.featured}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div
                    className="
                        mx-auto
                        mt-20
                        max-w-3xl
                        rounded-3xl
                        border
                        border-cyan-100
                        bg-white
                        px-6
                        py-10
                        text-center
                        shadow-sm
                        sm:px-10
                    "
                >
                    <h3
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-3xl
                        "
                    >
                        Have a Business Need We Can Help With?
                    </h3>

                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-2xl
                            text-base
                            leading-7
                            text-slate-600
                        "
                    >
                        Every business has different workflows and
                        requirements. We can design and develop a
                        solution around the way your organization works.
                    </p>

                    <button
                        onClick={() => {document
                                                .getElementById('contact')
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                })}}
                        className="
                            mt-7
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
                            cursor-pointer
                            hover:bg-cyan-700
                        "
                    >
                        Discuss Your Business Need
                    </button>
                </div>

            </Container>
        </section>
    );
}