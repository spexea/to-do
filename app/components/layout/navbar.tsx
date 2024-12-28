import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
        <div className="container mx-auto">
          {/* Navbar Left */}
          <div className="flex-none">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-square btn-ghost"
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Navbar Center */}
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              Task Manager
            </Link>
          </div>

          {/* Navbar Right */}
          <div className="flex-none flex items-center gap-2">
            <Link
              href={"/profile"}
              className="btn btn-square btn-ghost"
              aria-label="Open profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A6.979 6.979 0 0012 20a6.979 6.979 0 006.879-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
