import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const Reviews = ({ hotelId, roomId = null }) => {
  const { fetchReviewsByHotel, fetchReviewsByRoom, loading: contextLoading } = usePublicPagesContext();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (!hotelId && !roomId) return; // Only proceed if either hotelId or roomId is provided

    const loadReviews = async () => {
      try {
        let reviewsData = [];
        
        if (roomId) {
          // Fetch reviews by room ID
          reviewsData = await fetchReviewsByRoom(roomId);
        } else if (hotelId) {
          // Fetch reviews by hotel ID
          reviewsData = await fetchReviewsByHotel(hotelId);
        }
        
        setReviews(reviewsData);

        // Calculate average rating
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          setAverageRating((totalRating / reviewsData.length).toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
        setAverageRating(0);
      }
    };

    loadReviews();
  }, [hotelId, roomId, fetchReviewsByHotel, fetchReviewsByRoom]); // Include the functions in dependencies

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const reviewsLoading = contextLoading?.reviews || false;
  
  if (reviewsLoading) {
    return <div className="py-8 text-center">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="h3">Reviews ({reviews.length})</h3>
        <div className="flex items-center">
          <div className="flex mr-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-lg font-semibold">{averageRating}</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">
                  {review.guest?.username || review.guestName || 'Anonymous Guest'}
                </h4>
                <div className="flex items-center mt-1">
                  <div className="flex mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                {review.rating}/5
              </span>
            </div>

            {review.comment && (
              <p className="mt-3 text-gray-700">{review.comment}</p>
            )}

            {review.categories && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(review.categories).map(([category, rating]) => (
                  <span
                    key={category}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {category}: {rating}/5
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;