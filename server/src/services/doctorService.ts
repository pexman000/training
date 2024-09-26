import { Doctor } from '../models/Doctor';
import { v4 as uuid } from 'uuid';

// In-memory store for doctors (you can replace this with a database later)
let doctors: Doctor[] = [];

// CREATE a new doctor
export const createDoctor = (doctorData: Doctor): Doctor => {
  const newDoctor: Doctor = { ...doctorData, id: uuid() };  // Generate unique ID
  console.log(newDoctor.licenseNumber);
  doctors.push(newDoctor);
  return newDoctor;
};

// READ all doctors
export const getAllDoctors = (): Doctor[] => {
  return doctors;
};

// READ a single doctor by ID
export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};

// READ a single doctor by ID
export const getDoctorByEmail = (email: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.email === email);
};

// UPDATE a doctor by ID
export const updateDoctor = (id: string, updatedData: Partial<Doctor>): Doctor | null => {
  const doctorIndex = doctors.findIndex(doctor => doctor.id === id);

  if (doctorIndex !== -1) {
    doctors[doctorIndex] = { ...doctors[doctorIndex], ...updatedData };
    return doctors[doctorIndex];
  }

  return null;
};

// DELETE a doctor by ID
export const deleteDoctor = (id: string): boolean => {
  const doctorIndex = doctors.findIndex(doctor => doctor.id === id);

  if (doctorIndex !== -1) {
    doctors.splice(doctorIndex, 1);
    return true;
  }

  return false;
};
