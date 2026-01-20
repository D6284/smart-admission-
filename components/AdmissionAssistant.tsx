
import React, { useState } from 'react';
import { getAdmissionAdvice } from '../services/geminiService';

const AdmissionAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Context aware prompting
    const session = JSON.parse(sessionStorage.getItem('student_session') || '{}');
    const context = session.email ? `User is logged in as ${session.email}.` : "User is a guest.";
    
    const aiResponse = await getAdmissionAdvice(`${context} User asks: ${userMsg}`);
    setHistory(prev => [...prev, { role: 'ai', text: aiResponse || '' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] no-print">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-indigo-600 text-white flex justify-between items-center shadow-lg">
            <h3 className="font-bold flex items-center gap-2">
              <i className="fa-solid fa-robot"></i> Smart Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 rounded p-1">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4 text-sm bg-slate-50">
            {history.length === 0 && (
              <p className="text-slate-500 italic">Welcome! I can help with application status, payments, and document queries. How can I assist you?</p>
            )}
            {history.map((h, i) => (
              <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl shadow-sm ${h.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border rounded-tl-none'}`}>
                  {h.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border p-2 rounded-2xl flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button disabled={loading} className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition">
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
        >
          <i className="fa-solid fa-headset text-2xl group-hover:rotate-12 transition-transform"></i>
        </button>
      )}
    </div>
  );
};

export default AdmissionAssistant;
