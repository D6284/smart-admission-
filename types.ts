
export type UserRole = 'admin' | 'student';

export enum AdmissionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export enum PaymentStatus {
  YES = 'Yes',
  NO = 'No'
}

export interface Student {
  id: string;
  fullname: string;
  email: string;
  password?: string;
  class_level: string;
  gender: string;
  phone: string;
  admission_no?: string;
  document?: string;
  status: AdmissionStatus;
  paid: PaymentStatus;
  created_at: string;
}

export interface Admin {
  id: string;
  username: string;
  password?: string;
}

export interface Payment {
  id: string;
  student_id: string;
  mobile_number: string;
  amount: number;
  payment_date: string;
}

export interface DB {
  students: Student[];
  admins: Admin[];
  payments: Payment[];
}
