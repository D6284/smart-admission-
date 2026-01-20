
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const currentPath = window.location.hash;

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const isDashboard = currentPath.includes('dashboard');

  return (
    <div className="flex flex-col min-h-screen no-print">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-graduation-cap text-white text-xl"></i>
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">Smart Admission</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-slate-600 hover:text-indigo-600 transition">Home</Link>
              {!isDashboard ? (
                <>
                  <Link to="/student/login" className="text-slate-600 hover:text-indigo-600 transition">Student Login</Link>
                  <Link to="/admin/login" className="text-slate-600 hover:text-indigo-600 transition">Admin Portal</Link>
                  <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
                    Apply Now
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2">
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 text-white mb-4">
                <i className="fa-solid fa-graduation-cap text-2xl"></i>
                <span className="font-bold text-xl tracking-tight">Smart Admission System</span>
              </div>
              <p className="max-w-xs">Pioneering the future of digital education and streamlined school administration. Unlock your future with us today.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/register" className="hover:text-white transition">Admission</Link></li>
                <li><Link to="/student/login" className="hover:text-white transition">Student Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><span className="flex items-center gap-2"><i className="fa-solid fa-envelope"></i> admissions@smartadmission.com</span></li>
                <li><span className="flex items-center gap-2"><i className="fa-solid fa-phone"></i> +1 (234) 567-890</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} Smart Admission System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
