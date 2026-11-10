import Container from "../ui/Container";
import AboutValue from "./AboutSection/AboutValue";
import MVLogo from "../../assets/logo/mv-logo.png"

import { ABOUT_VALUES } from "../../constants/about";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="
                relative
                overflow-hidden
                bg-white
                py-24
                sm:py-28
            "
        >
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
                        About Magna Vertex
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
                        Technology Built Around
                        <span className="text-cyan-500">
                            {" "}Your Business
                        </span>
                    </h2>
                </div>


                {/* Main Content */}
                <div className="
                    mx-auto
                    mt-14
                    grid
                    max-w-5xl
                    grid-cols-1
                    items-center
                    gap-12
                    lg:grid-cols-2
                    lg:gap-20
                ">

                    {/* Brand Visual */}
                    <div className="
                        relative
                        flex
                        justify-center
                    ">
                        <div className="
                            flex
                            aspect-square
                            w-full
                            max-w-sm
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-cyan-100
                            bg-[#F8FBFF]
                            shadow-sm
                        ">
                            <div className="
                                flex
                                h-40
                                w-40
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-cyan-200
                                bg-white
                                shadow-lg
                                shadow-cyan-500/10
                            ">
                               <img
                                    src={MVLogo}
                                    alt="Magna Vertex Technologies Logo"
                                    className="
                                        h-28
                                        w-28
                                        object-contain
                                        select-none
                                        pointer-events-none
                                    "
                                />
                            </div>
                        </div>
                    </div>


                    {/* Content */}
                    <div>
                        <h3 className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            sm:text-3xl
                        ">
                            We build technology with purpose.
                        </h3>

                        <p className="
                            mt-5
                            text-base
                            leading-7
                            text-slate-600
                        ">
                            Magna Vertex Technologies creates modern
                            digital solutions that help businesses improve
                            the way they work, connect with their customers,
                            and grow online.
                        </p>

                        <p className="
                            mt-4
                            text-base
                            leading-7
                            text-slate-600
                        ">
                            From web applications and business systems to
                            content platforms and cloud solutions, we focus
                            on building practical technology that solves
                            real business challenges.
                        </p>

                        {/* Values */}
                        <div className="
                            mt-10
                            grid
                            gap-7
                            sm:grid-cols-3
                        ">
                            {ABOUT_VALUES.map((value) => (
                                <AboutValue
                                    key={value.id}
                                    title={value.title}
                                    description={value.description}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </Container>
        </section>
    );
}