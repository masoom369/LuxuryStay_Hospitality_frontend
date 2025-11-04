import React from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Briefcase } from "lucide-react";

const Icon = ({ children }) => (
  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
    {children}
  </div>
);

const TeamAvatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 text-lg font-semibold">
      {initials}
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          About Us
        </h1>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50">
        <div className="container  mx-auto py-14 px-4">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-primary text-center mb-6">
              About LuxuryStay Hospitality
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-justify">
              LuxuryStay is a high-end hotel chain renowned for providing
              exceptional service and luxurious accommodations. Our mission is
              to create unforgettable experiences for our guests, combining
              elegance, comfort, and personalized attention in every stay.
            </p>
            <p className="text-lg text-gray-700 mb-6 text-justify">
              With locations worldwide, we offer a range of amenities designed
              to cater to the discerning traveler. From opulent suites to
              world-class dining, our properties are crafted to exceed
              expectations and ensure every moment is memorable.
            </p>
            <p className="text-lg text-gray-700 text-justify">
              At LuxuryStay, we believe in sustainability and community
              involvement, striving to make a positive impact wherever we
              operate. Join us and discover the pinnacle of hospitality.
            </p>
          </div>
        </div>
      </div>
      {/* Our Story */}
      <div className="container mx-auto py-14 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-gray-700">Our Story</h2>
          <p className="mt-4 text-gray-700">
            Founded with a passion for refined travel, LuxuryStay brings
            together generations of hospitality knowledge and modern design.
            Each property is thoughtfully curated to honor local culture while
            delivering consistent, elevated service across every stay.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-white shadow-lg">
            <div className="flex items-start gap-4">
              <Icon>
                <Shield className="w-6 h-6" />
              </Icon>
              <div>
                <h3 className="font-bold text-gray-700">Thoughtful Design</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Spaces designed for calm, privacy, and effortless living.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-white shadow-lg">
            <div className="flex items-start gap-4">
              <Icon>
                <Clock className="w-6 h-6" />
              </Icon>
              <div>
                <h3 className="font-bold text-gray-700">Impeccable Service</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Discreet, attentive staff who anticipate your needs.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-white shadow-lg">
            <div className="flex items-start gap-4">
              <Icon>
                <Briefcase className="w-6 h-6" />
              </Icon>
              <div>
                <h3 className="font-bold text-gray-700">Curated Experiences</h3>
                <p className="mt-2 text-sm text-gray-700">
                  Local guides, private dining, and tailored itineraries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 py-14 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              The People Behind the Experience
            </h2>
            <p className="mt-3 text-gray-700">
              A small, dedicated team committed to excellence in every detail.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <TeamAvatar name="Sofia Laurent" />
                <div>
                  <div className="font-bold text-gray-700">Sofia Laurent</div>
                  <div className="text-sm text-gray-500">Founder & CEO</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-sm">
                Founder with two decades of hospitality leadership and a belief
                that luxury is kindness in practice.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <TeamAvatar name="Marcus Reed" />
                <div>
                  <div className="font-bold text-gray-700">Marcus Reed</div>
                  <div className="text-sm text-gray-500">Global Operations</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-sm">
                Oversees properties worldwide, ensuring consistent quality and
                guest experience.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <TeamAvatar name="Aisha Khan" />
                <div>
                  <div className="font-bold text-gray-700">Aisha Khan</div>
                  <div className="text-sm text-gray-500">
                    Director of Guest Experience
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-sm">
                Designs bespoke stays and trains teams to deliver memorable,
                personal service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto py-12 px-4">
        <div className="p-6 bg-primary text-white rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white">Plan your stay with us</h3>
              <p className="text-white/90 text-sm mt-1">
                Contact our concierge for a curated itinerary or private event
                planning.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="btn btn-lg btn-primary text-white rounded-md shadow-sm hover:bg-primary-dark transition"
              >
                Get in touch
              </Link>
              <Link
                to="/book"
                className="btn btn-lg border border-white text-white rounded-md btn-secondary shadow-sm hover:bg-secondary-dark hover:border-secondary-dark transition"
              >
                Reserve a Room
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
