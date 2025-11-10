import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePublicPagesContext } from '../context/PublicPagesContext';

const Testimonials = () => {
  const { testimonials, fetchTestimonials, loading } = usePublicPagesContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials if none exist (only when fetchTestimonials changes, which should be never due to useCallback)
  useEffect(() => {
    if (testimonials.length === 0) {
      fetchTestimonials();
    }
  }, [fetchTestimonials]); // Only re-run when fetchTestimonials function changes (never, due to useCallback)
  
  // Extract testimonials loading state specifically
  const testimonialsLoading = loading?.testimonials || false;

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate testimonials every 7 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return; // Don't auto-rotate if there's only one or no items

    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (testimonialsLoading || testimonials.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="h2 mb-4">What Our Guests Say</h2>
        <p>{testimonialsLoading ? 'Loading testimonials...' : 'No testimonials available'}</p>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="h2 text-center mb-4">What Our Guests Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Read what our satisfied guests have to say about their stay
        </p>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              {renderStars(currentTestimonial.rating)}
            </div>

            <blockquote className="text-lg italic text-gray-700 mb-6">
              "{currentTestimonial.comment || 'This was an amazing experience! Highly recommended.'}"
            </blockquote>

            <div>
              <p className="font-semibold text-gray-900">
                {currentTestimonial.guest?.username || currentTestimonial.guestName || 'Anonymous Guest'}
              </p>
              <p className="text-gray-500 text-sm">
                {currentTestimonial.createdAt ? new Date(currentTestimonial.createdAt).toLocaleDateString() : ''}
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}

          {/* Indicators */}
          {testimonials.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentIndex ? 'bg-accent' : 'bg-accent/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;