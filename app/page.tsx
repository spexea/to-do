import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-gradient-to-br from-blue-500 via-blue-600 to-primary shadow-lg rounded-lg relative">
        <h1 className="text-5xl font-extrabold text-white">
          Welcome to Task Manager
        </h1>
        <p className="mt-4 text-gray-200">
          Organize, prioritize, and crush your goals efficiently!
        </p>

        <button className="btn btn-secondary mt-8 px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-xl">
          <span>Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
          <div className="animate-ping absolute w-80 h-80 bg-blue-300 rounded-full opacity-20"></div>
          <div className="animate-bounce absolute w-60 h-60 bg-primary rounded-full opacity-30 delay-200"></div>
        </div>
      </div>

      <div className="py-12 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Task Manager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h11M9 21V3m11 8h-4m4 0v7m0-7-4 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Efficiency</h3>
            <p className="text-gray-600 mt-2">
              Boost your productivity with minimal effort.
            </p>
          </div>

          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Simplicity</h3>
            <p className="text-gray-600 mt-2">
              Intuitive design for easy task management.
            </p>
          </div>

          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 14l2 2 4-4m0-4v8m4 4h-8m0 0V5a2 2 0 012-2h4a2 2 0 012 2v12h2m-6 2h6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Flexibility</h3>
            <p className="text-gray-600 mt-2">
              Customize your workflow the way you need.
            </p>
          </div>
          <div className="text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h1>
              This project is for demonstration only. To use it, you should go
              to{" "}
            </h1>{" "}
            <Link className="text-primary" href="/dashboard">
              dashboard.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
