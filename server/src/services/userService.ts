import { getPatientByEmail, createPatient, getAllUsers } from '../services/patientService';
import { getDoctorByEmail, createDoctor } from '../services/doctorService';
import { generateToken } from '../jwtUtils';
import { Patient } from '../models/Patient';
import { Doctor } from '../models/Doctor';
import { User } from '../models/User';
import { v4 as uuid} from 'uuid';

export const signupOrLoginService = async (userData: User) => {
    try {
        let existingUser: Patient | Doctor | null | undefined = null;
        let existingUserPatient: Patient | null | undefined = null;
        let existingDoctorPatient: Doctor | null | undefined = null;

        let role: 'patient' | 'doctor' | null = null;

        // Check if the user is a patient
        existingUserPatient = await getPatientByEmail(userData.email);
        existingDoctorPatient = await getDoctorByEmail(userData.email);

        if (existingUserPatient) {
            role = 'patient';
            existingUser = existingUserPatient;
        } else if(existingDoctorPatient) {
            role = 'doctor';
            existingUser = existingDoctorPatient;
        }

        // If user exists, verify credentials
        if (existingUser) {
            if (existingUser.password === userData.password) {
                return {
                    status: 200,
                    data: { message: 'Login successful', user: existingUser, role },
                };
            } else {
                return {
                    status: 401,
                    data: { message: 'Invalid credentials' },
                };
            }
        } else {
            // Create a new user if not found
            const id = uuid();
            let newUser: Patient | Doctor;

            // Determine the user type based on other context (could be based on email domain, additional information, etc.)
            // For now, assume all new users are patients (this logic can be adjusted based on your app needs)
            newUser = { ...userData, id } as Patient;
            await createPatient(newUser);

            return {
                status: 201,
                data: { message: 'User created successfully', user: newUser, role: 'patient' },
            };
        }
    } catch (error) {
        console.error('Error in signupOrLoginService:', error);
        return {
            status: 500,
            data: { message: 'Internal server error' },
        };
    }
};

export const getUsersService = async () => {
    try {
        return await getAllUsers();
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error('Unable to fetch users');
    }
};

const generateUUID = (): string => {
    // Replace with actual UUID generation logic if necessary
    return 'generated-uuid';
};
