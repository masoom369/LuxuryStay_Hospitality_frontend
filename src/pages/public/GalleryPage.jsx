import React, { useState } from "react";
import { ScrollToTop } from "../../components";

const GalleryImage = ({ src, alt, onClick }) => (
  <div
    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
    onClick={onClick}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
  </div>
);

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => (
  <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
    >
      ✕
    </button>
    <button
      onClick={onPrev}
      className="absolute left-4 text-white text-2xl hover:text-gray-300"
    >
      ‹
    </button>
    <button
      onClick={onNext}
      className="absolute right-4 text-white text-2xl hover:text-gray-300"
    >
      ›
    </button>
    <img
      src={images[currentIndex]}
      alt="Gallery"
      className="max-w-full max-h-full object-contain"
    />
  </div>
);

const GalleryPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/src/assets/img/heroSlider/1.jpg",
    "/src/assets/img/heroSlider/2.jpg",
    "/src/assets/img/heroSlider/3.jpg",
    "/src/assets/img/rooms/1-lg.png",
    "/src/assets/img/rooms/2-lg.png",
    "/src/assets/img/rooms/3-lg.png",
    "/src/assets/img/rooms/4-lg.png",
    "/src/assets/img/rooms/5-lg.png",
    "/src/assets/img/rooms/6-lg.png",
    "/src/assets/img/rooms/7-lg.png",
    "/src/assets/img/rooms/8-lg.png",
    "/src/assets/img/room.jpg",
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section>
      <ScrollToTop />

      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Gallery
        </h1>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto py-14 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-primary mb-6">Experience LuxuryStay</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Take a visual journey through our world-class properties, elegant
            rooms, and exceptional amenities that define the LuxuryStay
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <GalleryImage
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {lightboxOpen && (
          <Lightbox
            images={images}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="p-6 bg-primary text-white rounded-lg shadow-lg text-center">
            <h3 className="font-bold text-white mb-2">
              Ready to experience this luxury?
            </h3>
            <p className="text-white/90 text-sm mb-4">
              Book your stay and discover the LuxuryStay difference firsthand.
            </p>
            <a
              href="/book"
              className="btn btn-lg btn-primary text-white rounded-md shadow-sm hover:bg-accent-hover transition inline-block"
            >
              Book Your Stay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
