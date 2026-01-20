
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';

const StudentRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    class_level: 'JSS 1',
    gender: 'Male',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate AJAX call delay
      await new Promise(r => setTimeout(r, 1000));

      const existing = dbService.getStudents().find(s => s.email === formData.email);
      if (existing) {
        setMsg({ type: 'error', text: 'Email already registered!' });
        setLoading(false);
        return;
      }

      await dbService.registerStudent(formData);
      setMsg({ type: 'success', text: 'Registration Successful! Redirecting...' });
      setTimeout(() => navigate('/student/login'), 2000);
    } catch (err) {
      setMsg({ type: 'error', text: 'An error occurred. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="bg-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold">New Student Application</h2>
          <p className="text-indigo-100">Fill in your details accurately for review.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {msg.text && (
            <div className={`p-4 rounded-lg text-sm font-medium ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {msg.text}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={e => setFormData({...formData, fullname: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input
                required
                type="email"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                required
                type="password"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="********"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                required
                type="tel"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="+1 234 567"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Class Level</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none"
                value={formData.class_level}
                onChange={e => setFormData({...formData, class_level: e.target.value})}
              >
                <option>JSS 1</option>
                <option>JSS 2</option>
                <option>JSS 3</option>
                <option>SSS 1</option>
                <option>SSS 2</option>
                <option>SSS 3</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Gender</label>
              <div className="flex gap-4 p-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={e => setFormData({...formData, gender: e.target.value})} /> Male
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={e => setFormData({...formData, gender: e.target.value})} /> Female
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Passport Photo / Birth Cert (PDF/JPG)</label>
            <input
              type="file"
              className="w-full border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
