import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { createPatient, getAllUsers, getPatientById, updateUser, deleteUser } from '../services/patientService';
import { User } from '../models/User';

// Validation middleware using express-validator for User
export const validateUser = [
  check('username').isString().withMessage('Username must be a string'),
  check('password').isString().withMessage('Password must be a string'),
  check('role').isIn(['patient', 'doctor']).withMessage('Role must be either "patient" or "doctor"'),

  // Middleware function to handle validation result
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// CREATE a new user with validation
export const createUserHandler = (req: Request, res: Response) => {
  const newUser: User = createPatient(req.body);
  res.status(201).json(newUser);
};

// GET all users
export const getAllUsersHandler = (req: Request, res: Response) => {
  const users = getAllUsers();
  res.json(users);
};

// GET a single user by ID
export const getPatientByIdHandler = (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = getPatientById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// UPDATE a user by ID with validation
export const updateUserHandler = (req: Request, res: Response) => {
  const userId = req.params.id;
  const updatedUser = updateUser(userId, req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// DELETE a user by ID
export const deleteUserHandler = (req: Request, res: Response) => {
  const userId = req.params.id;
  const isDeleted = deleteUser(userId);
  if (isDeleted) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
