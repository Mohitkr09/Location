import React from 'react';
import { Bell, User } from "lucide-react";
import logo from '../assets/logo.jpg'; 

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
         <img src={logo} className="h-10" alt="Logo" />
<span className="font-sheppards  text-red-600 text-3xl">find&me</span>
        </a>

        {/* Right Side (Search, Bell, Avatar) */}
        <div className="flex md:order-2 items-center space-x-4">
          
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-7 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.65 11.65z" />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-25 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search..."
            />
          </div>

          {/* Notification Bell */}
          <div className="relative ml-6">
            <Bell className="w-6 h-6 text-gray-700 dark:text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
          </div>

         <div className="w-8 h-8 ml-9 flex items-center justify-center rounded-full border-2 border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
        <User className="w-5 h-5 text-gray-700  dark:text-white" />
        </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          {/* Search for mobile */}
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.65 11.65z" />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar-mobile"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search..."
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col p-4 mt-4 font-medium gap-9 border border-gray-100 rounded-lg bg-gray-50 md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Services</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




