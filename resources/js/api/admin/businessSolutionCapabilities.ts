import api from "../api"

export interface BusinessSolutionCapability {
    id: number;
    business_solution_id: number;
    title: string;
    description: string;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
}

export interface BusinessSolutionCapabilityForm {
    title: string;
    description: string;
    sort_order: number;
}

export const getCapabilities = async (
    businessSolutionId: number
) => {
    const response = await api.get(
        `/api/admin/business-solutions/${businessSolutionId}/capabilities`
    );

    return response.data.data;
};

export const createCapability = async (
    businessSolutionId: number,
    data: BusinessSolutionCapabilityForm
) => {
    const response = await api.post(
        `/api/admin/business-solutions/${businessSolutionId}/capabilities`,
        data
    );

    return response.data;
};

export const updateCapability = async (
    businessSolutionId: number,
    capabilityId: number,
    data: BusinessSolutionCapabilityForm
) => {
    const response = await api.put(
        `/api/admin/business-solutions/${businessSolutionId}/capabilities/${capabilityId}`,
        data
    );

    return response.data;
};

export const deleteCapability = async (
    businessSolutionId: number,
    capabilityId: number
) => {
    const response = await api.delete(
        `/api/admin/business-solutions/${businessSolutionId}/capabilities/${capabilityId}`
    );

    return response.data;
};