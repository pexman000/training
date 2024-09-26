import { Patient } from '../models/Patient';
import { User } from '../models/User';
import { v4 as uuid } from 'uuid';

// In-memory store for users (you can replace this with a database)
let users: Patient[] = [];

// CREATE a new patient
export const createPatient = (userData: Patient): Patient => {
  // Only generate a new id if userData doesn't already have one
  users.push(userData);
  return userData;
};

// READ all users
export const getAllUsers = (): Patient[] => {
  return users;
};

// READ a single patient by ID
export const getPatientById = (id: string): Patient | undefined => {
  return users.find(user => user.id === id);
};

// READ a patient by email
export const getPatientByEmail = (email: string): Patient | undefined => {
  return users.find(user => user.email === email);
};

// UPDATE a user by ID
export const updateUser = (id: string, updatedData: Partial<User>): Patient | null => {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    return users[userIndex];
  }

  return null;
};

// DELETE a user by ID
export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }

  return false;
};
