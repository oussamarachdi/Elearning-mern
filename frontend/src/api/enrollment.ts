import api from "./axios";

export const enrollCourse = async (courseId: string) => {
    const response = await api.post(`/enroll/enroll/${courseId}`);
    return response.data;
};

export const getMyCourses = async () => {
    const response = await api.get("/enroll/my-courses");
    return response.data;
};

export const cancelEnrollment = async (courseId: string) => {
    const response = await api.delete(`/enroll/${courseId}`);
    return response.data;
};
