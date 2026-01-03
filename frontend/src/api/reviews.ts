import api from "./axios";

export const createReview = async (courseId: string, reviewData: { rating: number; comment: string }) => {
    const response = await api.post(`/reviews/${courseId}`, reviewData);
    return response.data;
};

export const getReviews = async (courseId: string) => {
    const response = await api.get(`/reviews/${courseId}`);
    return response.data;
};

export const updateReview = async (id: string, reviewData: { rating: number; comment: string }) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
};

export const deleteReview = async (id: string) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
};
