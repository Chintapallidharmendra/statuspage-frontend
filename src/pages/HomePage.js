// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const HomePage = () => {
  const { user } = useUser();
  return (
    <div className="container mx-auto p-6">
      <section className="text-center py-20 bg-blue-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to StatusTracker</h1>
        <p className="text-lg mb-6">
          Stay informed on system status, subscribe to updates, and manage
          incidents easily.
        </p>
        <div className="space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded hover:bg-white hover:text-blue-600"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 text-center shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-3">Real-time Status</h3>
            <p className="text-gray-600">
              View the real-time status of all systems, so you're always in the
              loop.
            </p>
          </div>
          <div className="p-6 text-center shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-3">Incident Management</h3>
            <p className="text-gray-600">
              Track and manage incidents to keep your users updated during
              outages.
            </p>
          </div>
          <div className="p-6 text-center shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-3">Subscriptions</h3>
            <p className="text-gray-600">
              Allow users to subscribe to notifications for immediate updates on
              incidents.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose StatusPage?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">Build Trust</h3>
              <p className="text-gray-600">
                Keep your customers informed and build trust by providing
                transparency on system issues.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3">
                Reduce Support Load
              </h3>
              <p className="text-gray-600">
                With proactive communication, you’ll reduce incoming support
                requests during incidents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
