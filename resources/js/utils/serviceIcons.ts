import * as LucideIcons from 'lucide-react';
import { Globe, type LucideIcon } from 'lucide-react';

export function getServiceIcon(name?: string | null): LucideIcon {
    if (!name) {
        return Globe;
    }

    const iconName = name
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    const icons = LucideIcons as unknown as Record<
        string,
        LucideIcon
    >;

    return icons[iconName] ?? Globe;
}