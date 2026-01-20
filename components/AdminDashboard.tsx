
import React, { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { Student, AdmissionStatus, PaymentStatus, Payment } from '../types';

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<AdmissionStatus | 'All'>('All');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setStudents(dbService.getStudents());
    setPayments(dbService.getPayments());
  };

  const generateAdmissionNo = () => {
    const suffix = Math.floor(100 + Math.random() * 900);
    return `ADM2026-${suffix}`;
  };

  const handleApprove = (id: string) => {
    const admNo = generateAdmissionNo();
    dbService.updateStudentStatus(id, AdmissionStatus.APPROVED, admNo);
    setSelectedStudent(null);
    refreshData();
  };

  const handleReject = (id: string) => {
    dbService.updateStudentStatus(id, AdmissionStatus.REJECTED);
    setSelectedStudent(null);
    refreshData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Permanently delete this application?")) {
      dbService.deleteStudent(id);
      refreshData();
    }
  };

  const stats = {
    total: students.length,
    approved: students.filter(s => s.status === AdmissionStatus.APPROVED).length,
    pending: students.filter(s => s.status === AdmissionStatus.PENDING).length,
    revenue: payments.reduce((acc, p) => acc + p.amount, 0)
  };

  const filteredStudents = filter === 'All' ? students : students.filter(s => s.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applicants', value: stats.total, icon: 'fa-users', color: 'indigo' },
          { label: 'Approved', value: stats.approved, icon: 'fa-circle-check', color: 'green' },
          { label: 'Pending', value: stats.pending, icon: 'fa-clock', color: 'amber' },
          { label: 'Revenue (UGX)', value: stats.revenue.toLocaleString(), icon: 'fa-money-bill-trend-up', color: 'emerald' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 bg-${s.color}-50 text-${s.color}-600 rounded-2xl flex items-center justify-center`}>
              <i className={`fa-solid ${s.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{s.label}</p>
              <p className="text-xl font-black text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="p-8 border-b border-slate-50 flex flex-wrap justify-between items-center gap-6">
          <h2 className="text-2xl font-black text-slate-800">Admission Requests</h2>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', ...Object.values(AdmissionStatus)].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Class</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Paid</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <i className="fa-solid fa-folder-open text-4xl"></i>
                      <p className="font-medium italic">No applications found in this category.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">
                          {s.fullname.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{s.fullname}</div>
                          <div className="text-xs text-slate-400">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-slate-600">{s.class_level}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        s.status === AdmissionStatus.APPROVED ? 'bg-green-100 text-green-700' :
                        s.status === AdmissionStatus.REJECTED ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`flex items-center gap-1.5 text-xs font-bold ${s.paid === PaymentStatus.YES ? 'text-green-600' : 'text-slate-300'}`}>
                        <i className={`fa-solid ${s.paid === PaymentStatus.YES ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
                        {s.paid === PaymentStatus.YES ? 'PAID' : 'PENDING'}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedStudent(s)}
                          className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                          REVIEW
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Review Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-indigo-600 p-8 text-white flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black">Application Review</h3>
                <p className="text-indigo-100 text-sm mt-1">Reviewing: {selectedStudent.fullname}</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-indigo-500 rounded-xl transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                  <p className="font-bold text-slate-800">{selectedStudent.fullname}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Class</p>
                  <p className="font-bold text-slate-800">{selectedStudent.class_level}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Email</p>
                  <p className="font-bold text-slate-800">{selectedStudent.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                  <p className="font-bold text-slate-800">{selectedStudent.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</p>
                  <p className="font-bold text-slate-800">{selectedStudent.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission Date</p>
                  <p className="font-bold text-slate-800">{new Date(selectedStudent.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                    <i className="fa-solid fa-file-pdf text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Support Documents</p>
                    <p className="text-xs text-slate-500 italic">Birth Cert / Last Transcript</p>
                  </div>
                </div>
                <button className="text-indigo-600 font-black text-xs hover:underline uppercase tracking-wider">Download PDF</button>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-4">
                {selectedStudent.status === AdmissionStatus.PENDING ? (
                  <>
                    <button 
                      onClick={() => handleApprove(selectedStudent.id)}
                      className="flex-1 bg-green-600 text-white font-black py-4 rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-check"></i>
                      APPROVE ADMISSION
                    </button>
                    <button 
                      onClick={() => handleReject(selectedStudent.id)}
                      className="flex-1 bg-white border-2 border-slate-100 text-red-500 font-black py-4 rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-xmark"></i>
                      REJECT
                    </button>
                  </>
                ) : (
                  <div className="w-full p-4 bg-slate-100 rounded-2xl text-center text-slate-500 font-bold">
                    This application has already been processed ({selectedStudent.status}).
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
