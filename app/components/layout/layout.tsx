"use client";

import React, { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6 px-4 sm:px-6 md:px-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
