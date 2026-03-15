"use client";

import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { LogIn, LogOut, User } from "lucide-react";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            MyApp
          </h1>
          <div>
            {user ? (
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        {user ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <User className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Hello! 👋
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
              Logged in as
            </p>
            <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-8">
              {user.email}
            </p>
            <div className="inline-block bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-6 py-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">สถานะ: เข้าสู่ระบบแล้ว</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Please log in to continue
            </p>
            <div className="inline-block bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-6 py-4 mb-8">
              <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                <span className="font-medium">Status: Offline</span>
              </div>
            </div>
            <div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
              >
                <LogIn className="w-5 h-5" />
                Login Page
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}