
import { DB, Student, Admin, Payment, AdmissionStatus, PaymentStatus } from '../types';

const DB_KEY = 'admission_system_db';

const INITIAL_DB: DB = {
  students: [],
  admins: [
    { id: '1', username: 'admin', password: 'admin123' }
  ],
  payments: []
};

export const getDB = (): DB => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : INITIAL_DB;
};

export const saveDB = (db: DB) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const dbService = {
  registerStudent: async (studentData: Omit<Student, 'id' | 'status' | 'paid' | 'created_at'>): Promise<Student> => {
    const db = getDB();
    const newStudent: Student = {
      ...studentData,
      id: Math.random().toString(36).substr(2, 9),
      status: AdmissionStatus.PENDING,
      paid: PaymentStatus.NO,
      created_at: new Date().toISOString()
    };
    db.students.push(newStudent);
    saveDB(db);
    return newStudent;
  },

  getStudents: () => getDB().students,

  getStudentById: (id: string) => getDB().students.find(s => s.id === id),

  updateStudentStatus: (id: string, status: AdmissionStatus, admission_no?: string) => {
    const db = getDB();
    const index = db.students.findIndex(s => s.id === id);
    if (index !== -1) {
      db.students[index].status = status;
      if (admission_no) db.students[index].admission_no = admission_no;
      saveDB(db);
    }
  },

  deleteStudent: (id: string) => {
    const db = getDB();
    db.students = db.students.filter(s => s.id !== id);
    db.payments = db.payments.filter(p => p.student_id !== id);
    saveDB(db);
  },

  processPayment: (student_id: string, amount: number, mobile_number: string) => {
    const db = getDB();
    const student = db.students.find(s => s.id === student_id);
    if (student) {
      const payment: Payment = {
        id: Math.random().toString(36).substr(2, 9),
        student_id,
        mobile_number,
        amount,
        payment_date: new Date().toISOString()
      };
      db.payments.push(payment);
      student.paid = PaymentStatus.YES;
      saveDB(db);
      return payment;
    }
    throw new Error('Student not found');
  },

  getPayments: () => getDB().payments,

  adminLogin: (username: string, pass: string) => {
    const db = getDB();
    // In production PHP we use password_verify
    return db.admins.find(a => a.username === username && a.password === pass);
  }
};
