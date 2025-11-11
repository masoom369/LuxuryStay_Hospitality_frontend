import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What are your check-in and check-out times?",
      answer:
        "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability and additional charges.",
    },
    {
      question: "Do you offer airport transfers?",
      answer:
        "Yes, we provide luxury airport shuttle services. Please contact our concierge desk at least 24 hours in advance to arrange transportation. Both private cars and shared shuttles are available.",
    },
    {
      question: "Is breakfast included in the room rate?",
      answer:
        "Yes, our complimentary gourmet breakfast buffet is served daily from 6:30 AM to 10:30 AM in our main restaurant. We offer international cuisine, made-to-order stations, and special dietary options.",
    },
    {
      question: "What amenities are available at the hotel?",
      answer:
        "Our hotel features a full-service spa, fitness center, rooftop infinity pool, multiple restaurants and bars, business center, concierge services, and 24-hour room service. All rooms include high-speed WiFi, smart TVs, and luxury toiletries.",
    },
    {
      question: "Do you have parking facilities?",
      answer:
        "Yes, we offer both valet and self-parking options. Valet parking is available 24/7 at $30 per day, while self-parking is available at $20 per day with in-and-out privileges.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our standard cancellation policy requires notice 48 hours prior to check-in to avoid charges. Different rates and packages may have varying cancellation terms. Please check your reservation details for specific conditions.",
    },
    {
      question: "Are pets allowed?",
      answer:
        "Yes, we are a pet-friendly hotel. We welcome dogs up to 25 pounds for an additional fee of $50 per stay. Please notify us in advance if you're bringing a pet, as we have designated pet-friendly rooms.",
    },
    {
      question: "Do you offer special rates for extended stays?",
      answer:
        "Yes, we offer preferred rates for stays of 7 nights or longer. Corporate rates and monthly stay packages are also available. Please contact our reservations team for detailed information.",
    },
    {
      question: "What COVID-19 safety measures are in place?",
      answer:
        "We maintain rigorous cleaning protocols, offer contactless check-in/check-out, provide hand sanitization stations throughout the property, and follow all local health guidelines. Our staff undergoes regular health screenings.",
    },
    {
      question: "Is there a minimum age requirement for check-in?",
      answer:
        "Yes, the primary guest must be at least 21 years old to check in and must present a valid government-issued photo ID and credit card in their name.",
    },
    {
      question: "Do you have meeting or event facilities?",
      answer:
        "Yes, we offer versatile event spaces including ballrooms, conference rooms, and outdoor venues. Our events team can assist with planning, catering, and audiovisual equipment needs.",
    },
    {
      question: "What dining options are available?",
      answer:
        "We have multiple dining venues including our signature fine-dining restaurant, casual café, rooftop bar, and lobby lounge. 24-hour room service is also available with an extensive menu.",
    },
  ];

  return (
    <section>
      {/* Hero Section */}
      <div
        className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute w-full h-full bg-black/70" />
        <div className="text-center z-20">
          <h1 className="text-6xl text-white font-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl mx-auto px-6">
            Find quick answers to common questions about our services, bookings,
            and amenities.
          </p>
        </div>
      </div>

      {/* FAQ Content Area */}
      <div className="container mx-auto py-14 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
          <h2 className="text-3xl font-primary text-center mb-6">
            Your Questions Answered
          </h2>
          {faqData.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={index} className="rounded-md shadow border mb-4">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className={`w-full text-left px-6 py-4 flex justify-between items-center bg-white ${
                    open ? "rounded-t-md" : "rounded-md"
                  } hover:shadow-md transition`}
                >
                  <span className="font-bold text-gray-700">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`text-gray-500 transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                {open && (
                  <div className="px-6 py-4 bg-white border-t">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-8 p-6 bg-primary text-white rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white">Still have questions?</h3>
              <p className="text-white/90 text-sm mt-1">
                Contact our concierge for any specific inquiries or special
                requests.
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

        <div className="text-center text-sm text-gray-500 mt-8">
          Last updated: October 2025
        </div>
      </div>
    </section>
  );
}
