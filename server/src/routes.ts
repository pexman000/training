import { Router } from 'express';
import { createDoctorHandler, getAllDoctorsHandler, getDoctorByIdHandler, updateDoctorHandler, deleteDoctorHandler, validateDoctor } from './controllers/doctorController';
import {
    createUserHandler,
    getAllUsersHandler,
    getPatientByIdHandler,
    updateUserHandler,
    deleteUserHandler,
    validateUser
} from './controllers/patientController';
import {
    createTicketHandler,
    getAllTicketsHandler,
    getTicketByIdHandler,
    updateTicketHandler,
    deleteTicketHandler,
    validateTicket
} from './controllers/ticketController';

import {
    signupOrLogin,
    getUsers
} from './controllers/userController';

const router = Router();

// CREATE a new doctor
router.post('/doctors', validateDoctor, createDoctorHandler);

// GET all doctors
router.get('/doctors', getAllDoctorsHandler);

// GET a single doctor by ID
router.get('/doctors/:id', getDoctorByIdHandler);

// UPDATE a doctor by ID
router.put('/doctors/:id', updateDoctorHandler);

// DELETE a doctor by ID
router.delete('/doctors/:id', deleteDoctorHandler);



// CREATE a new user (with validation)
router.post('/users', validateUser, createUserHandler);

// GET all users
router.get('/users', getAllUsersHandler);

// GET a single user by ID
router.get('/users/:id', getPatientByIdHandler);

// UPDATE a user by ID (with validation)
router.put('/users/:id', validateUser, updateUserHandler);

// DELETE a user by ID
router.delete('/users/:id', deleteUserHandler);


// CREATE a new user (with validation)
router.post('/tickets', validateUser, createTicketHandler);

// GET all users
router.get('/tickets', getAllTicketsHandler);

// GET a single user by ID
router.get('/tickets/:id', getTicketByIdHandler);

// UPDATE a user by ID (with validation)
router.put('/tickets/:id', validateUser, updateTicketHandler);

// DELETE a user by ID
router.delete('/tickets/:id', deleteTicketHandler);

router.post('/users/auth/login', signupOrLogin)

router.get('/users', getUsers)


export default router;
