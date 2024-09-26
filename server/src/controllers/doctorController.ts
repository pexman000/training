import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';
import { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../services/doctorService';
import { Doctor } from '../models/Doctor';

export const validateDoctor = [
  check('username').isString().withMessage('Username must be a string'),
  check('password').isString().withMessage('Password must be a string'),
  check('role').equals('doctor').withMessage('Role must be "doctor"'),
  check('licenseNumber').isString().withMessage('License number must be a string'),
  check('specialization').isString().withMessage('Specialization must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



export const createDoctorHandler = (req: Request, res: Response) => {
  const newDoctor: Doctor = createDoctor(req.body);
  console.log(req.body);
  res.status(201).json(newDoctor);
};

// GET all doctors
export const getAllDoctorsHandler = (req: Request, res: Response) => {
  const doctors = getAllDoctors();
  res.json(doctors);
};

// GET a single doctor by ID
export const getDoctorByIdHandler = (req: Request, res: Response) => {
  const doctorId = req.params.id;
  const doctor = getDoctorById(doctorId);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ message: 'Doctor not found' });
  }
};

// UPDATE a doctor with validation
export const updateDoctorHandler = (req: Request, res: Response) => {
  const doctorId = req.params.id;
  const updatedDoctor = updateDoctor(doctorId, req.body);
  if (updatedDoctor) {
    res.json(updatedDoctor);
  } else {
    res.status(404).json({ message: 'Doctor not found' });
  }
};

// DELETE a doctor by ID
export const deleteDoctorHandler = (req: Request, res: Response) => {
  const doctorId = req.params.id;
  const isDeleted = deleteDoctor(doctorId);
  if (isDeleted) {
    res.json({ message: 'Doctor deleted successfully' });
  } else {
    res.status(404).json({ message: 'Doctor not found' });
  }
};
