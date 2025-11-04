import React from "react";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../../components";
import { Heart, BookOpen, MessageCircle, BarChart3, Building, Calendar } from "lucide-react";

const ServiceCard = ({ service }) => (
  <div className="p-6 rounded-lg border bg-white shadow-lg">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {service.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-700 mb-2">{service.name}</h3>
        <p className="text-sm text-gray-700 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-accent font-bold">
            {service.price ? `From $${service.price}` : "Price on request"}
          </span>
          <Link
            to="/book"
            className="btn btn-primary btn-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const ServicesCatalogPage = () => {
  const services = [
    {
      name: "Spa & Wellness",
      description: "Indulge in our world-class spa treatments, massages, and wellness therapies designed to rejuvenate your body and mind.",
      price: 150,
      icon: <Heart className="w-6 h-6" />,
    },
    {
      name: "Fine Dining",
      description: "Experience culinary excellence with our award-winning restaurants featuring local and international cuisine.",
      price: 85,
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      name: "Concierge Services",
      description: "Let our expert concierge team arrange transportation, tours, tickets, and personalized experiences for you.",
      price: null,
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      name: "Fitness Center",
      description: "Stay active with our fully equipped fitness center, personal training sessions, and group classes.",
      price: 25,
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      name: "Business Center",
      description: "Access our business center with high-speed internet, meeting rooms, and office equipment.",
      price: 15,
      icon: <Building className="w-6 h-6" />,
    },
    {
      name: "Event Planning",
      description: "Host your special events with our professional event planning services and elegant venues.",
      price: null,
      icon: <Calendar className="w-6 h-6" />,
    },
  ];

  return (
    <section>
      <ScrollToTop />

      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Our Services
        </h1>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50">
        <div className="container mx-auto py-14 px-4">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-primary text-center mb-6">
              Enhance Your Stay
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-justify">
              Discover our comprehensive range of services designed to make your
              stay unforgettable. From wellness treatments to dining experiences,
              we cater to every need and desire.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto py-14 px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="p-6 bg-primary text-white rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white">Need something special?</h3>
              <p className="text-white/90 text-sm mt-1">
                Contact our concierge for custom arrangements and exclusive experiences.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="btn btn-lg btn-primary text-white rounded-md shadow-sm hover:bg-accent-hover transition"
              >
                Get in touch
              </Link>
              <Link
                to="/book"
                className="btn btn-lg border border-white text-white rounded-md btn-secondary shadow-sm hover:bg-accent hover:border-accent transition"
              >
                Book Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCatalogPage;
