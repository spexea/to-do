import Link from "next/link";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 animate__animated animate__fadeIn">
          This page isn't part of the project
        </h1>
        <p className="text-lg mt-4 text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
          You can go back to the dashboard.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
