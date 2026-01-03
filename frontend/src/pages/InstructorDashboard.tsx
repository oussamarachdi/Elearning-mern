import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { isInstructor } from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { getCourses, deleteCourse, updateCourse } from "../api/courses";

export default function InstructorDashboard() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInstructor()) navigate("/login");
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const allCourses = await getCourses();
      // Filter courses where instructor._id matches current user id
      // Note: user object from context might have _id or id
      const userId = user?._id;
      if (userId) {
        const filtered = allCourses.filter((c: any) => c.instructor?._id === userId || c.instructor === userId);
        setMyCourses(filtered);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const generate = async () => {
    if (!title.trim()) return setMessage("Please enter a course title first.");

    try {
      setLoadingAI(true);
      setMessage("");

      const res = await api.post("/ai/generate-description", { title });
      setDescription(res.data.description);
      setMessage("✨ AI description generated!");
    } catch {
      setMessage("❌ Failed to generate AI description");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!title.trim() || !description.trim())
      return setMessage("Please fill title + description");

    try {
      setCreating(true);
      if (editingCourse) {
        await updateCourse(editingCourse._id, { title, description, youtubeUrl });
        setMessage("🎉 Course Updated Successfully");
        setEditingCourse(null);
      } else {
        await api.post("/courses", { title, description, youtubeUrl });
        setMessage("🎉 Course Created Successfully");
      }

      setTitle("");
      setDescription("");
      setYoutubeUrl("");
      fetchMyCourses();
    } catch {
      setMessage(`❌ Failed to ${editingCourse ? "update" : "create"} course`);
    } finally {
      setCreating(false);
    }
  };

  const handleEditClick = (course: any) => {
    setEditingCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setYoutubeUrl(course.youtubeUrl || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        fetchMyCourses();
      } catch (error) {
        alert("Failed to delete course");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setTitle("");
    setDescription("");
    setYoutubeUrl("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2">Instructor Dashboard</h1>
        <p className="text-gray-600">
          Create and manage your courses 🚀
        </p>
      </div>

      {/* Create/Edit Form */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingCourse ? "Edit Course" : "Create New Course"}
        </h2>

        <label className="block font-semibold mb-2">Course Title</label>
        <input
          className="border w-full p-3 rounded-lg mb-5 focus:ring-2 focus:ring-purple-400 outline-none transition"
          placeholder="Enter your course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {!editingCourse && (
          <button
            onClick={generate}
            disabled={loadingAI}
            className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition disabled:opacity-50 mb-6"
          >
            {loadingAI ? "Generating with AI..." : "✨ Generate with AI"}
          </button>
        )}

        <label className="block font-semibold mb-2">Description</label>
        <textarea
          className="border w-full p-4 rounded-lg mt-2 focus:ring-2 focus:ring-purple-400 outline-none transition"
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block font-semibold mt-6 mb-2">YouTube Video URL (Optional)</label>
        <input
          className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
          placeholder="https://youtube.com/watch?v=..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleCreateOrUpdate}
            disabled={creating}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-bold"
          >
            {creating ? "Saving..." : (editingCourse ? "Update Course" : "Create Course")}
          </button>

          {editingCourse && (
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition font-bold"
            >
              Cancel
            </button>
          )}
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700 font-medium">{message}</p>
        )}
      </div>

      {/* My Courses List */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">My Created Courses</h2>
        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course) => (
              <div key={course._id} className="relative group">
                <CourseCard
                  course={course}
                  onAction={() => handleEditClick(course)}
                  actionLabel="Edit Course"
                  actionColor="blue"
                />
                <button
                  onClick={() => handleDeleteClick(course._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                  title="Delete Course"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">You haven't created any courses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
