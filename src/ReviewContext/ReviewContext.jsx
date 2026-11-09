
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ReviewContext = createContext(null);

export function ReviewProvider({ children }) {
  // Load reviews from localStorage
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem("shopsphere_reviews");
      return savedReviews ? JSON.parse(savedReviews) : [];
    } catch (error) {
      console.error("Error loading reviews:", error);
      return [];
    }
  });

  // Save reviews whenever they change
  useEffect(() => {
    localStorage.setItem(
      "shopsphere_reviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  // Add a new product review
  const addReview = (review) => {
    setReviews((previousReviews) => [
      {
        ...review,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...previousReviews,
    ]);
  };

  // Get reviews for a particular product
  const getProductReviews = (productId) => {
    return reviews.filter(
      (review) => String(review.productId) === String(productId)
    );
  };

  // Calculate average rating
  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);

    if (productReviews.length === 0) {
      return 0;
    }

    const totalRating = productReviews.reduce(
      (total, review) => total + Number(review.rating),
      0
    );

    return Number(
      (totalRating / productReviews.length).toFixed(1)
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

// Custom hook
export function useReviews() {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error(
      "useReviews must be used inside ReviewProvider"
    );
  }

  return context;
}
