import api from "../api";

/**
 * Admin Service - list item
 */
export interface AdminService {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    description: string | null;
    icon: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Pagination metadata
 */
export interface AdminServiceListMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

/**
 * List response
 */
export interface AdminServiceListResponse {
    data: AdminService[];
    meta: AdminServiceListMeta;
}

/**
 * Filters
 */
export interface AdminServiceFilters {
    search?: string;
    status?: boolean;
    featured?: boolean;
    page?: number;
    per_page?: number;
}

/**
 * Service form data
 */
export interface AdminServiceFormData {
    title: string;
    slug: string;
    short_description: string;
    description: string;
    icon: string;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

/**
 * Get admin services
 */
export const getAdminServices = async (
    filters: AdminServiceFilters = {}
): Promise<AdminServiceListResponse> => {
    const response = await api.get(
        "/api/admin/services",
        {
            params: filters,
        }
    );

    return response.data;
};

/**
 * Get single admin service
 */
export const getAdminService = async (
    id: number
): Promise<AdminService> => {
    const response = await api.get(
        `/api/admin/services/${id}`
    );

    return response.data.data;
};

/**
 * Create service
 */
export const createAdminService = async (
    data: AdminServiceFormData
) => {
    const response = await api.post(
        "/api/admin/services",
        data
    );

    return response.data;
};

/**
 * Update service
 */
export const updateAdminService = async (
    id: number,
    data: AdminServiceFormData
) => {
    const response = await api.put(
        `/api/admin/services/${id}`,
        data
    );

    return response.data;
};

/**
 * Delete service
 */
export const deleteAdminService = async (
    id: number
) => {
    const response = await api.delete(
        `/api/admin/services/${id}`
    );

    return response.data;
};