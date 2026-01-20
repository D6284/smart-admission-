
import React from 'react';
import { Student } from '../types';

const AdmissionSlip: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <div className="print-only bg-white p-12 max-w-4xl mx-auto border-[12px] border-double border-slate-200 relative min-h-screen">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[12rem] font-bold -rotate-45">OFFICIAL</h1>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase">SMART ADMISSION ACADEMY</h1>
            <p className="text-slate-600 font-medium">Official Admission Slip - Session 2026/2027</p>
          </div>
          <div className="w-32 h-32 border-4 border-slate-900 rounded bg-slate-100 flex items-center justify-center">
            <i className="fa-solid fa-user text-5xl text-slate-300"></i>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 text-lg">
          <div className="col-span-2 bg-slate-100 p-4 rounded-lg mb-4">
            <span className="text-slate-500 font-bold text-xs uppercase block">Admission Number</span>
            <span className="text-2xl font-black text-indigo-700">{student.admission_no}</span>
          </div>

          <div>
            <span className="text-slate-500 font-bold text-xs uppercase block">Full Name</span>
            <span className="font-semibold">{student.fullname}</span>
          </div>

          <div>
            <span className="text-slate-500 font-bold text-xs uppercase block">Email Address</span>
            <span className="font-semibold">{student.email}</span>
          </div>

          <div>
            <span className="text-slate-500 font-bold text-xs uppercase block">Class Level</span>
            <span className="font-semibold">{student.class_level}</span>
          </div>

          <div>
            <span className="text-slate-500 font-bold text-xs uppercase block">Gender</span>
            <span className="font-semibold">{student.gender}</span>
          </div>

          <div>
            <span className="text-slate-500 font-bold text-xs uppercase block">Phone</span>
            <span className="font-semibold">{student.phone}</span>
          </div>

          <div>
            <span className="text-slate-500 font-bold text-xs uppercase block">Status</span>
            <span className="font-semibold text-green-600 uppercase">Confirmed & Approved</span>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="border-b border-slate-900 h-10 w-48 mx-auto mb-2"></div>
            <p className="text-sm font-bold">Registrar's Signature</p>
          </div>
          <div className="text-center">
            <div className="h-10 w-48 mx-auto mb-2 font-mono flex items-center justify-center italic text-slate-400">
               {new Date().toLocaleDateString()}
            </div>
            <p className="text-sm font-bold">Date of Issuance</p>
          </div>
        </div>

        <div className="mt-12 p-4 bg-slate-50 rounded border text-xs text-slate-500">
          <p className="mb-2"><strong>Note:</strong> This document is system-generated and serves as official proof of admission to Smart Admission Academy. Please present this slip along with your original documents on the day of resumption.</p>
          <p>Serial: {student.id.toUpperCase()}-VERIFIED</p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSlip;
