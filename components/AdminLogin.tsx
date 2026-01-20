
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));
    const admin = dbService.adminLogin(user, pass);

    if (admin) {
      sessionStorage.setItem('admin_session', JSON.stringify({ id: admin.id, username: admin.username }));
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="text-3xl font-black text-white">Admin Secure Login</h2>
          <p className="text-slate-400 font-medium">Education management control center.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-900/50 text-red-400 rounded-lg text-sm font-bold border border-red-800">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Username</label>
            <input
              required
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/20 outline-none transition"
              placeholder="Admin ID"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">Secret Key</label>
            <input
              required
              type="password"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/20 outline-none transition"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Authorize Access'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500 italic">
          Default credentials: admin / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
