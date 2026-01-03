import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function MyCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/enroll/my-courses")
      .then(res => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
        My Learning Journey
      </h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((enrollment) => (
            <CourseCard
              key={enrollment._id}
              course={enrollment.course}
              onAction={() => navigate(`/courses/${enrollment.course._id}`)}
              actionLabel="Continue Learning"
              actionColor="blue"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-500 mb-6">Start your learning journey today!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
}
