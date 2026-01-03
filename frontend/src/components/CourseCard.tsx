import { Link } from "react-router-dom";
import type { Course } from "../types/Course";

interface CourseCardProps {
    course: Course;
    onAction?: (e: React.MouseEvent) => void;
    actionLabel?: string;
    actionColor?: string; // e.g., "purple", "green", "red"
}

export default function CourseCard({
    course,
    onAction,
    actionLabel = "Enroll Now",
    actionColor = "purple"
}: CourseCardProps) {

    // Helper to extract YouTube Thumbnail
    const getThumbnail = (url?: string) => {
        if (!url) return null;
        const videoId = url.split("v=")[1]?.split("&")[0];
        if (videoId) return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        return null;
    };

    const thumbnail = getThumbnail(course.youtubeUrl);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition flex flex-col h-full group">
            {/* Thumbnail or Gradient Fallback */}
            <div className="h-48 relative overflow-hidden bg-gray-100">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-30">
                            {course.title.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {course.category || "Course"}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <Link to={`/courses/${course._id}`} className="block group-hover:text-purple-600 transition">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {course.title}
                    </h3>
                </Link>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                    {course.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Price</span>
                        <span className="text-lg font-bold text-gray-900">
                            {course.price ? `$${course.price}` : "Free"}
                        </span>
                    </div>

                    {onAction && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAction(e);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-bold text-white transition shadow-lg shadow-${actionColor}-200 bg-${actionColor}-600 hover:bg-${actionColor}-700`}
                            style={{ backgroundColor: `var(--color-${actionColor}-600)` }} // Fallback if dynamic class fails
                        >
                            {actionLabel}
                        </button>
                    )}

                    {!onAction && (
                        <Link
                            to={`/courses/${course._id}`}
                            className="text-purple-600 font-bold text-sm hover:underline"
                        >
                            View Details
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
