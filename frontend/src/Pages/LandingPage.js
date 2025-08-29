import React, { useState } from "react";
import logo from "../Assests/Logo_Png.png";
import { Link } from "react-scroll";
import { NavLink, useNavigate } from "react-router-dom";
import FeatureCarousel from "../Comonents/Layouts/FeatureCard";
import UserReviews from "../Comonents/Layouts/UserReviews";
import ContactSection from "../Comonents/Layouts/Contact";
import Footer from "../Comonents/Layouts/LandingFooter";
import dashboardImg from "../Assests/dashboard-illustration.png";
import { Menu, X } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 z-50">
          {/* Logo */}
          <Link to="home" smooth duration={500}>
            <div className="flex items-center cursor-pointer">
              <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
              <span className="text-xl font-bold text-red-600">REDGRAPH</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="home" smooth duration={500} offset={-80} className="cursor-pointer hover:text-red-500 transition">
              Home
            </Link>
            <Link to="features" smooth duration={500} offset={-80} className="cursor-pointer hover:text-red-500 transition">
              Features
            </Link>
            <Link to="contact" smooth duration={500} offset={-80} className="cursor-pointer hover:text-red-500 transition">
              Contact
            </Link>
            <NavLink className="cursor-pointer hover:text-red-500" to="/login">
              Login
            </NavLink>
            <NavLink className="cursor-pointer hover:text-red-500" to="/registraion">
              Register
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg flex flex-col p-4 space-y-4 md:hidden z-50">
              <Link to="home" smooth duration={500} onClick={() => setIsOpen(false)} className="hover:text-red-500 cursor-pointer">
                Home
              </Link>
              <Link to="features" smooth duration={500} onClick={() => setIsOpen(false)} className="hover:text-red-500 cursor-pointer">
                Features
              </Link>
              <Link to="contact" smooth duration={500} onClick={() => setIsOpen(false)} className="hover:text-red-500 cursor-pointer">
                Contact
              </Link>
              <NavLink to="/login" onClick={() => setIsOpen(false)} className="hover:text-red-500">
                Login
              </NavLink>
              <NavLink to="/registraion" onClick={() => setIsOpen(false)} className="hover:text-red-500">
                Register
              </NavLink>
            </div>
          )}
        </nav>

        {/* ----------------Section for home------------ */}
        <div className="pt-20">
          <section id="home" className="relative min-h-screen flex items-center justify-center bg-white px-6">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-900 opacity-90"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-white">
              {/* Left Text Section */}
              <div className="md:w-1/2 text-center md:text-left space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                  WELCOME TO <span className="text-red-300">REDGRAPH</span>
                </h1>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Upload and visualize Excel files with interactive charts and graphs. Make your data look amazing!
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/registraion")}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="hidden md:flex md:w-1/2 justify-center mt-10 md:mt-0">
                <img
                  src={dashboardImg}
                  alt="Dashboard Preview"
                  className="w-[400px] h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </section>

          {/* ----------------Section for features------------ */}
          <section id="features" className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <p className="font-semibold text-3xl pb-12 text-center">
              Why choose <span className="text-red-500 font-bold">Redgraph</span>?
            </p>
            <FeatureCarousel />
          </section>

          {/* ----------------Section for user reviews------------ */}
          <section id="userReviews" className="min-h-screen flex flex-col items-center justify-center px-6">
            <UserReviews />
          </section>

          {/* ----------------Section for contact------------ */}
          <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <ContactSection />
          </section>

          {/* ----------------Section for footer------------ */}
          <section id="footer" className="flex flex-col items-center justify-center">
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
