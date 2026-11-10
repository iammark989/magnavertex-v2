import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function ScrollToTop() {
    const { url } = usePage();

    useEffect(() => {
        const currentUrl = new URL(url, window.location.origin);
        const hash = currentUrl.hash;

        if (hash) {
            const sectionId = decodeURIComponent(hash.substring(1));

            window.requestAnimationFrame(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });

            return;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
        });
    }, [url]);

    return null;
}