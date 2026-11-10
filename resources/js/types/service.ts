export interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    description?: string | null;
    icon: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active?: boolean;
}