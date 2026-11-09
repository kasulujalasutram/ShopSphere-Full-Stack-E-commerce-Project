
import { useState } from "react";
import { Star } from "lucide-react";
import { useReviews } from "../ReviewContext/ReviewContext.jsx";

function ReviewForm({ productId }) {
  const { addReview } = useReviews();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      setMessage("Please select a star rating.");
      return;
    }

    if (!comment.trim()) {
      setMessage("Please write your review.");
      return;
    }

    addReview({
      productId,
      rating,
      comment: comment.trim(),
    });

    setRating(0);
    setHoverRating(0);
    setComment("");
    setMessage("Thank you! Your review has been submitted.");
  };

  return (
    <div className="bg-white border rounded-xl p-6 mt-8">
      <h2 className="text-xl font-bold mb-5">
        Write a Product Review
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-3">
          Your Rating
        </label>

        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <Star
                size={30}
                className={
                  star <= (hoverRating || rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>

        <label className="block font-medium mb-2">
          Your Review
        </label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows="4"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>

        {message && (
          <p className="mt-4 text-sm text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ReviewForm;
