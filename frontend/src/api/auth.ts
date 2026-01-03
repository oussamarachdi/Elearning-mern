import api from "./axios";

export const register = async (userData: any) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const login = async (credentials: any) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

export const refreshToken = async (token: string) => {
    const response = await api.post("/auth/refresh", { token });
    return response.data;
};
