import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

import { scrollToElement } from '../../utils/sectionNavigation';

export default function ScrollToTop() {
    const { url } = usePage();

    useEffect(() => {
        // Check the actual browser URL for a section hash.
        const hash = window.location.hash;

        if (hash) {
            const sectionId = decodeURIComponent(hash.substring(1));

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    scrollToElement(sectionId);
                });
            });

            return;
        }

        // No section requested: return to the top.
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
        });
    }, [url]);

    return null;
}