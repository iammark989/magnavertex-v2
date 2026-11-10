import api from "../api";

/**
 * Business Solution - list item
 */
export interface BusinessSolutionListItem {
    id: number;
    title: string;
    slug: string;
    category: string;
    short_description: string;
    featured_image: string | null;
    is_featured: boolean;
    is_active: boolean;
    created_at: string;
}

/**
 * Pagination metadata
 */
export interface BusinessSolutionListMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

/**
 * List response
 */
export interface BusinessSolutionListResponse {
    data: BusinessSolutionListItem[];
    meta: BusinessSolutionListMeta;
}

/**
 * Filters
 */
export interface BusinessSolutionFilters {
    search?: string;
    status?: boolean;
    featured?: boolean;
    page?: number;
    per_page?: number;
}

/** Gallery Image */
export interface BusinessSolutionGalleryImage {
    id: number;
    image: string;
    caption: string | null;
    sort_order: number;
}

/** Capabilities */
export interface BusinessSolutionCapability {
    id: number;
    title: string;
    description: string;
    sort_order: number;
}

export interface BusinessSolutionDetail {
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

    capabilities: BusinessSolutionCapability[];

    images: BusinessSolutionGalleryImage[];
}

export interface BusinessSolutionDetailResponse {
    data: BusinessSolutionDetail;
}

export const getAdminBusinessSolution = async (
    id: number
): Promise<BusinessSolutionDetail> => {
    const response = await api.get(
        `/api/admin/business-solutions/${id}`
    );

    return response.data.data;
};

/**
 * Get admin business solutions
 */
export const getAdminBusinessSolutions = async (
    filters: BusinessSolutionFilters = {}
): Promise<BusinessSolutionListResponse> => {
    const response = await api.get(
        "/api/admin/business-solutions",
        {
            params: filters,
        }
    );

    return response.data;
};

/**
 * Business Solution form data
 */
export interface BusinessSolutionFormData {
    title: string;
    slug: string;
    category: string;
    short_description: string;
    business_challenge: string;
    solution_description: string;
    ideal_for: string;
    technologies: string[];
    featured_image: File | null;
    demo_url: string | null;
    is_featured: boolean;
    is_active: boolean;

    capabilities: {
    title: string;
    description: string;
    sort_order: number;
    }[];

    images: {
        image: File;
        caption: string;
        sort_order: number;
    }[];
}

/**
 * Create Business Solution
 */
export const createAdminBusinessSolution = async (
    data: BusinessSolutionFormData
) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append(
        "short_description",
        data.short_description
    );
    formData.append(
        "business_challenge",
        data.business_challenge
    );
    formData.append(
        "solution_description",
        data.solution_description
    );
    formData.append("ideal_for", data.ideal_for);
    if (data.demo_url) {
    formData.append("demo_url", data.demo_url);
    }

    formData.append(
        "is_featured",
        data.is_featured ? "1" : "0"
    );

    formData.append(
        "is_active",
        data.is_active ? "1" : "0"
    );

    /**
     * Technologies
     */
    data.technologies.forEach((technology, index) => {
        formData.append(
            `technologies[${index}]`,
            technology
        );
    });

    /**
     * Featured Image
     */
    if (data.featured_image) {
        formData.append(
            "featured_image",
            data.featured_image
        );
    }

    /**
     * Capabilities
     */
    data.capabilities.forEach((capability, index) => {
        formData.append(
            `capabilities[${index}][title]`,
            capability.title
        );

        formData.append(
            `capabilities[${index}][description]`,
            capability.description
        );

        formData.append(
            `capabilities[${index}][sort_order]`,
            String(index + 1)
        );
    });

    /**
     * Gallery Images
     */
    data.images.forEach((image, index) => {
        formData.append(
            `images[${index}][image]`,
            image.image
        );

        formData.append(
            `images[${index}][caption]`,
            image.caption
        );

        formData.append(
            `images[${index}][sort_order]`,
            String(image.sort_order || index + 1)
        );
    });

    const response = await api.post(
        "/api/admin/business-solutions",
        formData
    );

    return response.data;
};