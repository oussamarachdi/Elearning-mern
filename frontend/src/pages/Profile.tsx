import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile, createProfile } from "../api/profile";
import { getMyCourses } from "../api/enrollment";
import CourseCard from "../components/CourseCard";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState<any>(null);
    const [myCourses, setMyCourses] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: "",
        skills: "",
        country: "",
        avatar: "",
    });

    useEffect(() => {
        fetchProfile();
        fetchMyCourses();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
            if (data) {
                setFormData({
                    bio: data.bio || "",
                    skills: data.skills ? data.skills.join(", ") : "",
                    country: data.country || "",
                    avatar: data.avatar || "",
                });
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    const fetchMyCourses = async () => {
        try {
            const data = await getMyCourses();
            setMyCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const skillsArray = formData.skills.split(",").map((s) => s.trim());
            if (profile?._id) {
                await updateProfile(profile._id, { ...formData, skills: skillsArray });
            } else {
                await createProfile({ ...formData, skills: skillsArray });
            }
            setIsEditing(false);
            fetchProfile();
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        My Profile
                    </h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                <div className="flex items-start gap-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        {profile?.avatar ? (
                            <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-600">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
                        <p className="text-gray-500 mb-2">{user?.email}</p>
                        <div className="flex gap-2">
                            <p className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium capitalize">
                                {user?.role}
                            </p>
                            {profile?.country && (
                                <p className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    📍 {profile.country}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleUpdate} className="mt-8 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                rows={4}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                value={formData.avatar}
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                placeholder="USA, France, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                placeholder="React, Node.js, Design..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition font-medium"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="mt-8 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {profile?.bio || "No bio yet. Click edit to add one!"}
                            </p>
                        </div>

                        {profile?.skills && profile.skills.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.skills.map((skill: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Enrolled Courses</h2>
                {myCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {myCourses.map((enrollment: any) => (
                            <div key={enrollment._id} className="h-full">
                                <CourseCard
                                    course={enrollment.course}
                                    onAction={() => window.location.href = `/courses/${enrollment.course._id}`}
                                    actionLabel="Continue"
                                    actionColor="blue"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
                )}
            </div>
        </div>
    );
}
