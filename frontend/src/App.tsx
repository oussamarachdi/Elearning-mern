import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import InstructorDashboard from "./pages/InstructorDashboard";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
        </Route>
      </Routes>
    </Layout>
  );
}
