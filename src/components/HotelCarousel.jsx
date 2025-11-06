import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const HotelCarousel = () => {
  const [hotels, setHotels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === hotels.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? hotels.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [hotels.length]);

  if (loading || hotels.length === 0) {
    return (
      <div className="py-12 text-center">
        <p>Loading hotels...</p>
      </div>
    );
  }

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Hotels</h2>
        
        <div className="relative overflow-hidden max-w-6xl mx-auto">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {hotels.map((hotel, index) => (
              <div 
                key={hotel._id} 
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                      <img 
                        src={hotel.image || 'https://placehold.co/600x400?text=Hotel+Image'} 
                        alt={hotel.name} 
                        className="w-full h-64 md:h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/600x400?text=Hotel+Image';
                        }}
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-2">{hotel.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {hotel.description || 'Experience luxury and comfort at our exquisite hotel.'}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span 
                            key={idx} 
                            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="text-gray-700 mb-4">
                        <p><span className="font-semibold">Location:</span> {hotel.location}</p>
                      </div>
                      <Link 
                        to={`/hotel/${hotel._id}`}
                        className="btn btn-primary self-start mt-2"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Previous hotel"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Next hotel"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {hotels.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to hotel ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelCarousel;