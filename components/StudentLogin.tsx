
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { dbService } from '../services/db';

const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate delay
    await new Promise(r => setTimeout(r, 800));

    const student = dbService.getStudents().find(s => s.email === email && s.password === pass);

    if (student) {
      sessionStorage.setItem('student_session', JSON.stringify({ id: student.id, email: student.email }));
      navigate('/student/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white p-10 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-800">Student Portal</h2>
          <p className="text-slate-500 font-medium">Log in to track your application.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input
              required
              type="email"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
              placeholder="john@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input
              required
              type="password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-500/10 outline-none transition"
              placeholder="********"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Login to Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p className="text-slate-500">Haven't applied yet?</p>
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">Start Application Now</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
