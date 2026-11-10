import { Mail } from 'lucide-react';

import Container from '../ui/Container';
import MVLogo from '../../assets/logo/mv-logo.png';

import { NAVIGATION } from '../../constants/navigation';

import {
    goToHome,
    scrollToSection,
} from '../../utils/sectionNavigation';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">
            <Container>
                <div className="
                    grid
                    grid-cols-1
                    gap-10
                    py-10
                    sm:py-12
                    md:grid-cols-3
                ">
                    {/* Brand */}
                    <div>
                        <button
                            type="button"
                            onClick={goToHome}
                            className="group flex items-center gap-3"
                        >
                            <img
                                src={MVLogo}
                                alt="Magna Vertex Technologies Logo"
                                className="
                                    h-10
                                    w-10
                                    rounded-full
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            />

                            <span className="
                                font-serif
                                text-lg
                                font-bold
                                tracking-wide
                            ">
                                Magna Vertex Technologies
                            </span>
                        </button>

                        <p className="
                            mt-5
                            max-w-sm
                            text-sm
                            leading-6
                            text-slate-400
                        ">
                            Practical digital solutions designed to
                            help businesses build, improve, and grow.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h2 className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-cyan-400
                        ">
                            Navigation
                        </h2>

                        <nav className="mt-5 flex flex-col gap-3">
                            {NAVIGATION.map((nav) => (
                                <button
                                    key={nav.id}
                                    type="button"
                                    onClick={() => scrollToSection(nav.id)}
                                    className="
                                        w-fit
                                        text-sm
                                        text-slate-400
                                        transition-colors
                                        hover:text-cyan-300
                                    "
                                >
                                    {nav.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div>
                        <h2 className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-cyan-400
                        ">
                            Connect
                        </h2>

                        <div className="mt-5">
                            <a
                                href="mailto:info@magnavertex.com"
                                className="
                                    inline-flex
                                    items-center
                                    gap-3
                                    text-sm
                                    text-slate-400
                                    transition-colors
                                    hover:text-cyan-300
                                "
                            >
                                <Mail className="h-4 w-4" />
                                info@magnavertex.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="
                    flex
                    flex-col
                    gap-3
                    border-t
                    border-white/10
                    py-6
                    text-xs
                    text-slate-500
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">
                    <p>
                        © {new Date().getFullYear()} Magna Vertex Technologies.
                        All rights reserved.
                    </p>

                    <p>Philippines</p>
                </div>
            </Container>
        </footer>
    );
}