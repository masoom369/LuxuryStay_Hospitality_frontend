// src/pages/public/ContactUsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ContactUsPage() {
  useEffect(() => {
    document.title = "Contact Us — Luxury Stay";
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ state: "idle", message: "" }); 
  // state: idle | sending | success | error

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    // basic email pattern
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please write a message.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ state: "error", message: err });
      return;
    }

    setStatus({ state: "sending", message: "Sending..." });

    try {
      // Replace '/api/contact' with your real backend endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      setStatus({ state: "success", message: "Message sent — we’ll reply soon." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ state: "error", message: "Could not send message. Try again later." });
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Hero Section remains unchanged */}
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
              Contact Us
            </h1>
            <p className="mt-4 text-gray-200 max-w-2xl mx-auto px-6">
              Get in touch with our team for any inquiries or assistance.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left side - Changed from amber to elegant dark */}
            <div className="p-8 bg-[#1c1c1c] text-white">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="mb-4 text-gray-300">We're here to help and answer any questions you might have.</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-gray-300">123 Luxury Street, City Center</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-300">info@luxurystay.com</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-300">+1 234 567 8900</p>
                </div>
              </div>
            </div>

            {/* Right side - Updated form styles */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="+92 3xx xxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Booking question / Feedback / Other"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                    disabled={status.state === "sending"}
                  >
                    {status.state === "sending" ? "Sending..." : "Send Message"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ name: "", email: "", phone: "", subject: "", message: "" })}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    Reset
                  </button>
                </div>

                {/* Status messages */}
                {status.state === "error" && (
                  <p className="text-sm text-red-600 mt-2">{status.message}</p>
                )}
                {status.state === "success" && (
                  <p className="text-sm text-green-600 mt-2">{status.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { ContactUsPage };