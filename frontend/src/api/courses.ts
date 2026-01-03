import api from "./axios";

export const getCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const getCourseById = async (id: string) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (courseData: any) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};

export const updateCourse = async (id: string, courseData: any) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};
