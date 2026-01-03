import { type ReactNode, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { user, isLogged, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* NAVBAR */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-200 group-hover:scale-105 transition">
              E
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Learn
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center font-medium text-sm">
            <Link
              className={`transition hover:text-purple-600 ${isActive('/') ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}
              to="/"
            >
              Explore
            </Link>

            {isLogged && (
              <Link
                className={`transition hover:text-purple-600 ${isActive('/my-courses') ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}
                to="/my-courses"
              >
                My Learning
              </Link>
            )}

            {user?.role === "instructor" && (
              <Link
                className={`transition hover:text-purple-600 ${isActive('/instructor') ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}
                to="/instructor"
              >
                Instructor Dashboard
              </Link>
            )}

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            {/* Right Side Auth Controls */}
            {!isLogged ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-purple-600 font-medium transition"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition font-medium shadow-lg shadow-gray-200"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold border-2 border-transparent group-hover:border-purple-200 transition">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </Link>

                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 transition p-2"
                  title="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {openMenu && (
          <div className="md:hidden bg-white border-t px-6 py-6 space-y-4 absolute w-full shadow-xl">
            <Link onClick={() => setOpenMenu(false)} to="/" className="block text-lg font-medium text-gray-900">
              Explore
            </Link>

            {isLogged && (
              <Link
                onClick={() => setOpenMenu(false)}
                to="/my-courses"
                className="block text-lg font-medium text-gray-900"
              >
                My Learning
              </Link>
            )}

            {user?.role === "instructor" && (
              <Link
                onClick={() => setOpenMenu(false)}
                to="/instructor"
                className="block text-lg font-medium text-gray-900"
              >
                Instructor Dashboard
              </Link>
            )}

            <div className="h-px bg-gray-100 my-4"></div>

            {!isLogged ? (
              <div className="space-y-4">
                <Link
                  onClick={() => setOpenMenu(false)}
                  to="/login"
                  className="block text-lg font-medium text-gray-600"
                >
                  Log in
                </Link>
                <Link
                  onClick={() => setOpenMenu(false)}
                  to="/register"
                  className="block w-full text-center bg-gray-900 text-white px-4 py-3 rounded-xl font-medium"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  onClick={() => setOpenMenu(false)}
                  to="/profile"
                  className="flex items-center gap-3 py-2"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpenMenu(false);
                  }}
                  className="block w-full text-left text-red-500 font-medium py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
