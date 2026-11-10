export interface BusinessSolutionCapability {
    id: number;
    title: string;
    description: string | null;
    sort_order: number;
}

export interface BusinessSolutionImage {
    id: number;
    image: string;
    caption: string | null;
    sort_order: number;
}

export interface BusinessSolution {
    id: number;
    title: string;
    slug: string;
    category: string;
    short_description: string;
    business_challenge: string;
    solution_description: string;
    ideal_for: string;
    technologies: string[];
    featured_image: string | null;
    demo_url: string | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    capabilities: BusinessSolutionCapability[];
    images: BusinessSolutionImage[];
}
