import React from "react";

const ContactSection = () => {
  return (
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12 text-[#E94F37]">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#393E41]">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-6">
              Have questions or feedback? Fill out the form and our team will
              get back to you as soon as possible.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#E94F37] mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m8 0l-4-4m4 4l-4 4"
                  />
                </svg>
                <span>123 Business Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#E94F37] mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m8 0l-4-4m4 4l-4 4"
                  />
                </svg>
                <span>support@redgraph.com</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#E94F37] mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m8 0l-4-4m4 4l-4 4"
                  />
                </svg>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-8 rounded-xl shadow-md space-y-5">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E94F37]"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#E94F37] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

  );
};

export default ContactSection;
