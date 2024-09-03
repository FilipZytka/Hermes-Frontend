import { useState } from "react";
import { Link } from "react-router-dom";
import TailwindImg from "../../../assets/tailwind-css-logo.png";
import { logOutUser } from "../../../api/auth";
import { useAuth } from "../../../hooks/useAuth";
import { popUp } from "../../../utils/Popup";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();

  const handleSignOut = async () => {
    await logOutUser();
    popUp("Sign out successfully", "success");
    setAuth(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="dark:bg-gray-900 w-full mt-8">
      <div className="max-w-screen-xl flex flex-nowrap md:flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={TailwindImg} className="h-8" alt="Hermes logo" />
          <span className="text-2xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
            Hermes
          </span>
        </Link>
        <div className="flex gap-8">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="flex items-center p-2 w-10 h-10 justify-center text-sm
               text-gray-800 rounded-lg md:hidden
               hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
               dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            {!menuOpen && (
              <svg
                className="w-5 h-5 outline-none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            )}
          </button>
          <Link
            to="/"
            className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600"
          >
            Home
          </Link>
          {auth && (
            <Link
              to="/dashboard"
              className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/faq"
            className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600"
          >
            FAQ
          </Link>
        </div>
        {!auth ? (
          <Link to="/login">
            <button className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600 w-24">
              Sign in
            </button>
          </Link>
        ) : (
          <button
            onClick={handleSignOut}
            className="hidden md:block dark:text-gray-100 text-gray-800 text-xl hover:text-cyan-600 w-24"
          >
            Sign out
          </button>
        )}
      </div>
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white dark:bg-black/95 bg-opacity-95
          transition-transform transform font-bold text-xl ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } z-30`}
      >
        <div className="flex items-center justify-end p-6 mt-8">
          <button
            onClick={handleMenuToggle}
            type="button"
            className="text-gray-800 dark:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-start ms-10 mt-8 space-y-4">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 rounded md:hover:bg-transparent
                md:hover:text-cyan-600 md:p-0
                md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="block py-2 px-3 rounded md:hover:bg-transparent
                md:hover:text-cyan-600 md:p-0
                md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
            >
              FAQ
            </Link>
            {auth ? (
              <button
                onClick={handleSignOut}
                className="block py-2 px-3 rounded md:hover:bg-transparent
    md:hover:text-cyan-600 md:p-0
    md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="block py-2 px-3 rounded md:hover:bg-transparent
    md:hover:text-cyan-600 md:p-0
    md:dark:hover:text-cyan-600 dark:text-white text-gray-800"
              >
                Sign in
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
