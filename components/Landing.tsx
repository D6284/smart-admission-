
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                Unlock Your <span className="text-indigo-400">Future</span> with smart admission system.
              </h1>
              <p className="text-xl text-indigo-100 max-w-lg">
                A world-class school admission portal designed for modern students. Apply today and start your journey toward excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register" className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition shadow-xl">
                  Apply Now <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
                <Link to="/student/login" className="bg-transparent border-2 border-indigo-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-800 transition">
                  Check Status
                </Link>
              </div>
              <div className="flex items-center gap-4 text-indigo-300 text-sm">
                <div className="flex -space-x-2">
                  <img src="https://picsum.photos/seed/1/32" className="w-8 h-8 rounded-full border-2 border-indigo-900" alt="Student" />
                  <img src="https://picsum.photos/seed/2/32" className="w-8 h-8 rounded-full border-2 border-indigo-900" alt="Student" />
                  <img src="https://picsum.photos/seed/3/32" className="w-8 h-8 rounded-full border-2 border-indigo-900" alt="Student" />
                </div>
                <span>Joined by 2,000+ students this year</span>
              </div>
            </div>
            <div className="hidden lg:block animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="relative">
                <img
                  src="https://picsum.photos/seed/education/800/600"
                  alt="Education"
                  className="rounded-2xl shadow-2xl border-4 border-indigo-700/50"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl text-slate-800">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-check-circle text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Admission Status</p>
                      <p className="font-bold text-lg">98% Approved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm text-indigo-600">Features</h2>
            <h3 className="text-4xl font-bold text-slate-900">Why choose our System?</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-rocket', title: 'Fast Process', desc: 'Get your admission status in less than 48 hours.' },
              { icon: 'fa-shield-halved', title: 'Secure Payment', desc: 'Multiple secure payment gateways for school fees.' },
              { icon: 'fa-print', title: 'Instant Slips', desc: 'Download and print your admission slip immediately after approval.' }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 hover:bg-white border hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <i className={`fa-solid ${f.icon} text-2xl`}></i>
                </div>
                <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
