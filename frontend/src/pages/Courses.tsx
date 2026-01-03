import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Course } from "../types/Course";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    api.get("/courses").then(res => setCourses(res.data));
  }, []);

  const enroll = async (id: string) => {
    try {
      await api.post(`/enroll/enroll/${id}`);
      alert("Enrolled!");
    } catch {
      alert("Failed to enroll (login as student?)");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        Explore Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <CourseCard
            key={c._id}
            course={c}
            onAction={() => enroll(c._id)}
            actionLabel="Enroll Now"
            actionColor="purple"
          />
        ))}
      </div>
    </div>
  );
}
