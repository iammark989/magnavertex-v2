import { router } from '@inertiajs/react';

export function scrollToSection(id: string) {
    const section = document.getElementById(id);

    // If the section already exists on the current page,
    // scroll directly to it.
    if (window.location.pathname === '/' && section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        return;
    }

    // Otherwise, return to the homepage and scroll to the section.
    router.visit(`/#${encodeURIComponent(id)}`, {
        preserveScroll: true,

        onSuccess: () => {
            window.requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        },
    });
}

export function goToHome() {
    const hero = document.getElementById('hero');

    if (window.location.pathname === '/' && hero) {
        hero.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        return;
    }

    router.visit('/');
}