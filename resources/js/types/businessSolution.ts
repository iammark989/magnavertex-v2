import type { BusinessSolutionCapability } from "./businessSolutionCapability"
import type { BusinessSolutionImage } from "./businessSolutionImage"

export interface BusinessSolution {
    id: number
    title: string
    slug: string
    category: string
    short_description: string
    business_challenge: string
    solution_description: string
    ideal_for: string
    technologies: string[]
    featured_image: string | null
    demo_url: string | null

    is_featured: boolean;
    capabilities?: BusinessSolutionCapability[];
    images?: BusinessSolutionImage[] | null;
}