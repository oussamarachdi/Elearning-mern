import api from "./axios";

export const generateCourseDescription = async (title: string) => {
    const response = await api.post("/ai/generate-description", { title });
    return response.data;
};
