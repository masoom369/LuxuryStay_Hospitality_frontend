import React from 'react';
import { Link } from 'react-router-dom';

const PolicySection = ({ title, children }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
    <div className="space-y-4 text-gray-600">{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <header 
        className="relative bg-cover bg-center h-[400px]" 
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), 
            url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-200 max-w-2xl mx-auto px-6">
              Learn how we protect and handle your personal information
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          <PolicySection title="Our Commitment">
            <p>
              At LuxuryStay Hospitality, we take the privacy and security of our guests seriously. 
              This policy outlines our practices for handling personal information across all our properties 
              and digital platforms.
            </p>
          </PolicySection>

          <PolicySection title="Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>Booking details and preferences</li>
              <li>Contact information for reservations</li>
              <li>Special requests and accommodation needs</li>
              <li>Payment information (processed securely)</li>
              <li>Feedback and communication history</li>
            </ul>
          </PolicySection>

          <PolicySection title="How We Use Your Information">
            <p>
              We use collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Process and confirm your reservations</li>
              <li>Provide personalized guest services</li>
              <li>Ensure your comfort and safety during stays</li>
              <li>Send relevant updates about your booking</li>
              <li>Improve our services and guest experience</li>
            </ul>
          </PolicySection>

          <PolicySection title="Data Protection">
            <p>
              Your data is protected using industry-standard encryption and security measures. 
              We never share personal information with unauthorized third parties and maintain 
              strict access controls within our organization.
            </p>
          </PolicySection>

          <PolicySection title="Your Rights">
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </PolicySection>

          <div className="mt-12 p-6 bg-amber-50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-amber-900">Questions about privacy?</h3>
                <p className="text-amber-800 text-sm mt-1">
                  Our privacy team is here to help with any concerns.
                </p>
              </div>
              <div className="flex gap-3">
                <Link 
                  to="/contact" 
                  className="px-5 py-2 bg-amber-600 text-white rounded-md shadow-sm hover:bg-amber-700 transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          Last updated: October 2025
        </div>
      </div>
    </main>
  );
}