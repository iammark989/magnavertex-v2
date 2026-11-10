import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import Container from '../ui/Container';
import Logo from '../ui/Logo';

import { NAVIGATION } from '../../constants/navigation';
import MVLogo from '../../assets/logo/mv-logo.png';

import {
    goToHome,
    scrollToSection,
} from '../../utils/sectionNavigation';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const handleSectionNavigation = (id: string) => {
        setOpen(false);
        scrollToSection(id);
    };

    const handleGoHome = () => {
        setOpen(false);
        goToHome();
    };

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/20 backdrop-blur-md">
            <Container>
                <nav className="
                    flex
                    h-20
                    items-center
                    justify-between
                    px-4
                    sm:px-6
                    lg:px-8
                ">
                    {/* Logo */}
                    <Logo>
                        <button
                            type="button"
                            aria-label="Go to home"
                            onClick={handleGoHome}
                            className="group flex cursor-pointer items-center gap-3"
                        >
                            <img
                                src={MVLogo}
                                alt="Magna Vertex Technologies Logo"
                                className="
                                    h-10
                                    w-10
                                    rounded-full
                                    object-cover
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                    sm:h-11
                                    sm:w-11
                                "
                            />

                            <div className="hidden sm:block">
                                <h1 className="
                                    font-serif
                                    text-lg
                                    font-bold
                                    tracking-wide
                                    text-white
                                    lg:text-xl
                                ">
                                    Magna Vertex Technologies
                                </h1>
                            </div>
                        </button>
                    </Logo>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        {NAVIGATION.map((nav) => (
                            <button
                                key={nav.id}
                                type="button"
                                onClick={() => handleSectionNavigation(nav.id)}
                                className="
                                    relative
                                    cursor-pointer
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white/80
                                    transition-colors
                                    duration-300
                                    hover:text-cyan-300
                                    after:absolute
                                    after:bottom-0
                                    after:left-1/2
                                    after:h-px
                                    after:w-0
                                    after:-translate-x-1/2
                                    after:bg-cyan-300
                                    after:transition-all
                                    after:duration-300
                                    hover:after:w-full
                                "
                            >
                                {nav.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label={
                            open
                                ? 'Close navigation menu'
                                : 'Open navigation menu'
                        }
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="
                            rounded-lg
                            p-2
                            text-cyan-700
                            transition
                            duration-300
                            hover:bg-white/70
                            hover:text-cyan-900
                            md:hidden
                        "
                    >
                        {open ? (
                            <X className="h-7 w-7" />
                        ) : (
                            <Menu className="h-7 w-7" />
                        )}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div
                    className={`
                        overflow-hidden
                        transition-all
                        duration-300
                        md:hidden
                        ${
                            open
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                        }
                    `}
                >
                    <div className="
                        mx-4
                        mb-4
                        rounded-xl
                        border
                        border-cyan-400/10
                        bg-slate-950/80
                        p-3
                        shadow-xl
                        backdrop-blur-md
                    ">
                        <div className="flex flex-col">
                            {NAVIGATION.map((nav) => (
                                <button
                                    key={nav.id}
                                    type="button"
                                    onClick={() => handleSectionNavigation(nav.id)}
                                    className="
                                        cursor-pointer
                                        rounded-lg
                                        px-4
                                        py-3
                                        text-left
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        duration-200
                                        hover:bg-cyan-400/10
                                        hover:text-cyan-300
                                    "
                                >
                                    {nav.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}