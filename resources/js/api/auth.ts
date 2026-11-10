import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const getCsrfCookie = async () => {
    await api.get("/sanctum/csrf-cookie");
};

export const loginAdmin = async (
    email: string,
    password: string,
    remember = false
) => {
    await getCsrfCookie();

    const response = await api.post("/api/admin/login", {
        email,
        password,
        remember,
    });

    return response.data;
};

export const getAuthenticatedAdmin = async () => {
    const response = await api.get("/api/admin/user");

    return response.data;
};

export const logoutAdmin = async () => {
    const response = await api.post("/api/admin/logout");

    return response.data;
};

export default api;