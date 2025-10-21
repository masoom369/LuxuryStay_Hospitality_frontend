import React from 'react';
import { Link } from 'react-router-dom';

const Icon = ({ children }) => (
  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-700">
    {children}
  </div>
);

const TeamAvatar = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).slice(0,2).join('');
  return (
    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 text-lg font-semibold">
      {initials}
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <main className="about-us-page">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-zinc-900 to-black text-white">
        <div className="container mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-wide leading-tight">
              LuxuryStay Hospitality
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              We craft exceptional experiences where thoughtful design, discreet service,
              and timeless comfort meet. From bespoke suites to curated local journeys —
              LuxuryStay is hospitality perfected.
            </p>
            <div className="mt-6 flex gap-4">
              <Link to="/book" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 rounded-md shadow">
                Book a Stay
              </Link>
              <Link to="/contact" className="inline-block border border-amber-500 text-amber-300 hover:text-white px-6 py-3 rounded-md">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 border border-white/10 p-6">
              <div className="bg-[url('https://www.bing.com/th/id/OIP.sGJJDYrKV5mvttquDqArDAHaEP?w=245&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2')] bg-center bg-cover h-56 md:h-72 rounded-lg opacity-95 flex items-end">
                <div className="w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <div className="text-sm uppercase tracking-wider">Signature Suite</div>
                  <div className="text-lg font-semibold">Panoramic City View</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm text-gray-300">
                <div>
                  <div className="text-2xl font-bold text-white">120+</div>
                  <div className="mt-1">Luxury Suites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="mt-1">Concierge</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">97%</div>
                  <div className="mt-1">Guest Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="mt-4 text-gray-600">
            Founded with a passion for refined travel, LuxuryStay brings together
            generations of hospitality knowledge and modern design. Each property is
            thoughtfully curated to honor local culture while delivering consistent,
            elevated service across every stay.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border bg-white/50">
            <div className="flex items-start gap-4">
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3zM6 8V6a6 6 0 0112 0v2"/></svg>
              </Icon>
              <div>
                <h3 className="font-semibold">Thoughtful Design</h3>
                <p className="mt-2 text-sm text-gray-700">Spaces designed for calm, privacy and effortless living.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border bg-white/50">
            <div className="flex items-start gap-4">
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"/></svg>
              </Icon>
              <div>
                <h3 className="font-semibold">Impeccable Service</h3>
                <p className="mt-2 text-sm text-gray-700">Discreet, attentive staff who anticipate your needs.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border bg-white/50">
            <div className="flex items-start gap-4">
              <Icon>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7"/></svg>
              </Icon>
              <div>
                <h3 className="font-semibold">Curated Experiences</h3>
                <p className="mt-2 text-sm text-gray-700">Local guides, private dining and tailored itineraries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold">The People Behind the Experience</h2>
            <p className="mt-3 text-gray-600">A small, dedicated team committed to excellence in every detail.</p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow">
              <div className="flex items-center gap-4">
                <TeamAvatar name="Sofia Laurent" />
                <div>
                  <div className="font-semibold">Sofia Laurent</div>
                  <div className="text-sm text-gray-500">Founder & CEO</div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">Founder with two decades of hospitality leadership and a belief that luxury is kindness in practice.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <div className="flex items-center gap-4">
                <TeamAvatar name="Marcus Reed" />
                <div>
                  <div className="font-semibold">Marcus Reed</div>
                  <div className="text-sm text-gray-500">Global Operations</div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">Oversees properties worldwide, ensuring consistent quality and guest experience.</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <div className="flex items-center gap-4">
                <TeamAvatar name="Aisha Khan" />
                <div>
                  <div className="font-semibold">Aisha Khan</div>
                  <div className="text-sm text-gray-500">Director of Guest Experience</div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm">Designs bespoke stays and trains teams to deliver memorable, personal service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-12">
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Plan your stay with us</h3>
            <p className="mt-2 text-gray-600">Contact our concierge for a curated itinerary or private event planning.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="inline-block px-6 py-3 bg-amber-600 text-white rounded-md">Get in touch</Link>
            <Link to="/book" className="inline-block px-6 py-3 border border-amber-600 text-amber-600 rounded-md">Reserve a Room</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
