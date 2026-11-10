import { router } from '@inertiajs/react';

/**
 * Scroll to a section while accounting for the fixed navbar.
 */
export function scrollToElement(id: string) {
    const element = document.getElementById(id);

    if (!element) return;

    const navbarOffset = 80;

    const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: 'smooth',
    });
}

/**
 * Navigate to a homepage section.
 */
export function scrollToSection(id: string) {
    // If already on the homepage, scroll directly.
    if (window.location.pathname === '/' &&
        document.getElementById(id)) {
        scrollToElement(id);
        return;
    }

    // Otherwise, navigate home first.
    router.visit(`/#${encodeURIComponent(id)}`, {
        preserveScroll: false,

        onSuccess: () => {
            // Wait for Inertia and React to finish rendering.
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    scrollToElement(id);
                });
            });
        },
    });
}

/**
 * Navigate to the homepage hero section.
 */
export function goToHome() {
    scrollToSection('hero');
}