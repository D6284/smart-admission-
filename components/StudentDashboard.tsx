
import React, { useEffect, useState, useRef } from 'react';
import { dbService } from '../services/db';
import { Student, AdmissionStatus, PaymentStatus } from '../types';
import AdmissionSlip from './AdmissionSlip';
import html2canvas from 'html2canvas';

const StudentDashboard: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [payAmount] = useState('50000'); 
  const [paymentError, setPaymentError] = useState('');
  const slipRef = useRef<HTMLDivElement>(null);

  const refreshStudentData = () => {
    const session = JSON.parse(sessionStorage.getItem('student_session') || '{}');
    if (session.id) {
      const data = dbService.getStudentById(session.id);
      if (data) setStudent(data);
    }
  };

  useEffect(() => {
    refreshStudentData();
  }, []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || !mobileNumber) return;
    
    setPaymentError('');
    setIsPaying(true);
    
    await new Promise(r => setTimeout(r, 1500));
    
    try {
      dbService.processPayment(student.id, parseInt(payAmount), mobileNumber);
      refreshStudentData();
    } catch (err) {
      setPaymentError('Payment processing failed. Please check your balance.');
    } finally {
      setIsPaying(false);
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!slipRef.current) return;
    setIsDownloading(true);
    try {
      const element = slipRef.current;
      element.classList.remove('print-only');
      element.style.position = 'fixed';
      element.style.top = '-9999px';
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      element.classList.add('print-only');
      const link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = `Admission_Slip_${student?.admission_no}.png`;
      link.click();
    } catch (e) {
      alert("Download failed. Please try Print.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!student) return <div className="p-20 text-center text-slate-500">Loading your profile...</div>;

  // Determine Current Step
  const currentStep = 
    student.status === AdmissionStatus.PENDING ? 1 :
    student.paid === PaymentStatus.NO ? 2 : 3;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Progress Timeline */}
      <div className="mb-12 no-print">
        <div className="flex items-center justify-between max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 -z-10"></div>
          <div className={`absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 -z-10 transition-all duration-700`} style={{ width: `${(currentStep / 3) * 100}%` }}></div>
          
          {[
            { label: 'Applied', icon: 'fa-file-lines' },
            { label: 'Reviewed', icon: 'fa-magnifying-glass' },
            { label: 'Payment', icon: 'fa-credit-card' },
            { label: 'Admitted', icon: 'fa-graduation-cap' }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${currentStep >= i ? 'bg-indigo-600 border-indigo-100 text-white' : 'bg-white border-slate-100 text-slate-300'} transition-all duration-500`}>
                <i className={`fa-solid ${step.icon} text-sm`}></i>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep >= i ? 'text-indigo-600' : 'text-slate-400'}`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 no-print">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
              <i className="fa-solid fa-user-graduate text-4xl text-indigo-600"></i>
            </div>
            <h3 className="text-xl font-black text-slate-800">{student.fullname}</h3>
            <p className="text-slate-400 text-xs mb-4">{student.email}</p>
            <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              student.status === AdmissionStatus.APPROVED ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}>
              {student.status}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-indigo-400"></i>
              Application Data
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Class</span>
                <span className="font-bold">{student.class_level}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">ID No.</span>
                <span className="font-bold text-indigo-400">{student.admission_no || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fees Status</span>
                <span className={`font-bold ${student.paid === PaymentStatus.YES ? 'text-green-400' : 'text-amber-400'}`}>{student.paid === PaymentStatus.YES ? 'PAID' : 'PENDING'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* DYNAMIC MESSAGE BOX */}
          <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${
            student.status === AdmissionStatus.PENDING ? 'bg-amber-50 border-amber-100 text-amber-900' :
            student.paid === PaymentStatus.NO ? 'bg-indigo-50 border-indigo-100 text-indigo-900' :
            'bg-green-50 border-green-100 text-green-900'
          }`}>
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-white/50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-2xl">
                {student.status === AdmissionStatus.PENDING ? '⏳' : student.paid === PaymentStatus.NO ? '💳' : '🎉'}
              </div>
              <div>
                <h2 className="text-2xl font-black mb-2">
                  {student.status === AdmissionStatus.PENDING ? 'Waiting for admin approval' : 
                   student.paid === PaymentStatus.NO ? 'Make payment to print slip' : 
                   'Payment successful, print your admission slip'}
                </h2>
                <p className="opacity-70 leading-relaxed">
                  {student.status === AdmissionStatus.PENDING ? 'Your application is being processed. Our team is verifying your documents.' : 
                   student.paid === PaymentStatus.NO ? 'Congratulations on your approval! Please complete the registration fee payment below.' : 
                   'Your enrollment is now official. Download your slip and prepare for the upcoming orientation.'}
                </p>
              </div>
            </div>
          </div>

          {/* PAYMENT PORTAL */}
          {student.status === AdmissionStatus.APPROVED && student.paid === PaymentStatus.NO && (
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 animate-in zoom-in-95 duration-500">
              <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center gap-2">
                <i className="fa-solid fa-mobile-screen text-indigo-600"></i>
                Mobile Money Checkout
              </h3>
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</label>
                    <input 
                      required type="tel" placeholder="07XX-XXX-XXX"
                      className="w-full border-2 border-slate-100 rounded-2xl px-5 py-4 focus:border-indigo-600 outline-none transition"
                      value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (UGX)</label>
                    <input readOnly value="50,000" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-black text-slate-700" />
                  </div>
                </div>
                <button 
                  disabled={isPaying}
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
                >
                  {isPaying ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-shield-check"></i>}
                  {isPaying ? 'Processing...' : 'Authorize Secure Payment'}
                </button>
              </form>
            </div>
          )}

          {/* SUCCESS RECEIPT & PRINT */}
          {student.paid === PaymentStatus.YES && (
            <div className="bg-white p-10 rounded-[2rem] border-2 border-dashed border-slate-200 text-center space-y-8 animate-in slide-in-from-bottom-6 duration-700">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                <i className="fa-solid fa-check-double"></i>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">Verification Complete</h3>
                <p className="text-slate-500 text-sm mt-1">Receipt Ref: #PAY-{student.id.substr(0,5).toUpperCase()}</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={handlePrint} className="bg-indigo-600 text-white font-black px-10 py-5 rounded-2xl hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3">
                  <i className="fa-solid fa-print"></i> Print Official Slip
                </button>
                <button onClick={handleDownload} disabled={isDownloading} className="bg-white border-2 border-indigo-600 text-indigo-600 font-black px-10 py-5 rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-3">
                  {isDownloading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-download"></i>}
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div ref={slipRef} className="print-only">
        {student && <AdmissionSlip student={student} />}
      </div>
    </div>
  );
};

export default StudentDashboard;
