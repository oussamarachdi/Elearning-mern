import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getReviews, createReview, deleteReview, updateReview } from "../api/reviews";
import { AuthContext } from "../context/AuthContext";
import type { Course } from "../types/Course";

export default function CourseDetails() {
    const { id } = useParams<{ id: string }>();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [enrolled, setEnrolled] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editRating, setEditRating] = useState(5);
    const [editComment, setEditComment] = useState("");

    useEffect(() => {
        api.get(`/courses/${id}`).then((res) => setCourse(res.data));
        fetchReviews();
        checkEnrollment();
    }, [id]);

    const fetchReviews = () => {
        if (id) getReviews(id).then(setReviews);
    };

    const checkEnrollment = async () => {
        if (!user) return;
        try {
            const res = await api.get("/enroll/my-courses");
            const isEnrolled = res.data.some((e: any) => e.course._id === id);
            setEnrolled(isEnrolled);
        } catch (error) {
            console.error("Failed to check enrollment", error);
        }
    };

    const handleEnroll = async () => {
        if (!user) return navigate("/login");
        try {
            await api.post(`/enroll/enroll/${id}`);
            setEnrolled(true);
            alert("Successfully enrolled!");
        } catch (error) {
            alert("Enrollment failed");
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await createReview(id, { rating, comment });
            setComment("");
            fetchReviews();
        } catch (error) {
            alert("Failed to submit review");
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (window.confirm("Delete this review?")) {
            try {
                await deleteReview(reviewId);
                fetchReviews();
            } catch {
                alert("Failed to delete review");
            }
        }
    };

    const startEditReview = (review: any) => {
        setEditingReviewId(review._id);
        setEditRating(review.rating);
        setEditComment(review.comment);
    };

    const handleUpdateReview = async (reviewId: string) => {
        try {
            await updateReview(reviewId, { rating: editRating, comment: editComment });
            setEditingReviewId(null);
            fetchReviews();
        } catch {
            alert("Failed to update review");
        }
    };

    if (!course) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {course.category || "Course"}
                    </span>
                    <h1 className="text-4xl font-bold mt-4 mb-2">{course.title}</h1>
                    <p className="text-purple-100 text-lg">By {course.instructor.name}</p>
                </div>

                <div className="p-8">
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                        <div className="text-3xl font-bold text-gray-900">
                            {course.price ? `$${course.price}` : "Free"}
                        </div>
                        <button
                            onClick={handleEnroll}
                            disabled={enrolled}
                            className={`px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg ${enrolled
                                ? "bg-green-100 text-green-700 cursor-default"
                                : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-200"
                                }`}
                        >
                            {enrolled ? "Already Enrolled" : "Enroll Now"}
                        </button>
                    </div>
                </div>
            </div>

            {/* YouTube Video Section */}
            {course.youtubeUrl && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Preview</h2>
                    <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <iframe
                            width="100%"
                            height="100%"
                            src={course.youtubeUrl.replace("watch?v=", "embed/")}
                            title="Course Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Student Reviews</h2>

                {/* Review Form */}
                {enrolled && !editingReviewId && (
                    <form onSubmit={handleSubmitReview} className="mb-12 bg-gray-50 p-6 rounded-xl">
                        <h3 className="font-bold text-gray-800 mb-4">Write a Review</h3>
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`text-2xl transition ${star <= rating ? "text-yellow-400 scale-110" : "text-gray-300"}`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none transition mb-4"
                            rows={3}
                            placeholder="Share your experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition">
                            Submit Review
                        </button>
                    </form>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-50 pb-6 last:border-0">
                            {editingReviewId === review._id ? (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex gap-2 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setEditRating(star)}
                                                className={`text-xl ${star <= editRating ? "text-yellow-400" : "text-gray-300"}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        className="w-full p-2 border rounded mb-2"
                                        value={editComment}
                                        onChange={(e) => setEditComment(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateReview(review._id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingReviewId(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                                                {review.user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-900">{review.user.name}</span>
                                            <span className="text-yellow-400 text-sm">{"★".repeat(review.rating)}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 ml-10">{review.comment}</p>

                                    {/* Edit/Delete Buttons */}
                                    {user && (user._id === review.user._id) && (
                                        <div className="ml-10 mt-2 flex gap-3 text-sm">
                                            <button
                                                onClick={() => startEditReview(review)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteReview(review._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                    {reviews.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
