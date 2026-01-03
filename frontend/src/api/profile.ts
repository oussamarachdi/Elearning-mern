import api from "./axios";

export const getProfile = async () => {
    const response = await api.get("/profile/me");
    return response.data;
};

export const createProfile = async (profileData: any) => {
    const response = await api.post("/profile", profileData);
    return response.data;
};

export const updateProfile = async (id: string, profileData: any) => {
    const response = await api.put(`/profile/${id}`, profileData);
    return response.data;
};

export const deleteProfile = async (id: string) => {
    const response = await api.delete(`/profile/${id}`);
    return response.data;
};
