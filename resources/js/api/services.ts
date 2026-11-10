import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/services`,
    headers: {
        Accept: "application/json",
    },
});

export interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    description: string | null;
    icon: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

export const getServices = async (): Promise<Service[]> => {
    const response = await api.get("");

    return response.data.data;
};

export const getService = async (
    slug: string
): Promise<Service> => {
    const response = await api.get(`/${slug}`);

    return response.data.data;
};