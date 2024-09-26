import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import  {Ticket}  from '../models/Ticket';
import { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket } from '../services/ticketService';

// Validation middleware using express-validator for Ticket
export const validateTicket = [
    check('firstName').isString().withMessage('First Name must be a string'),
    check('lastName').isString().withMessage('Last Name must be a string'),
    check('age').isInt({ gt: 0 }).withMessage('Age must be a positive integer'),
    check('sex').isIn(['male', 'female', 'other']).withMessage('Sex must be either "male", "female", or "other"'),
    check('symptoms').isString().withMessage('Symptoms must be a string'),

    // Middleware function to handle validation result
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// CREATE a new ticket with validation
export const createTicketHandler = (req: Request, res: Response) => {
    const newTicket: Ticket = createTicket(req.body);
    console.log(req.body);
    res.status(201).json(newTicket);
};

// GET all tickets
export const getAllTicketsHandler = (req: Request, res: Response) => {
    const tickets = getAllTickets();
    res.json(tickets);
};

// GET a single ticket by ID
export const getTicketByIdHandler = (req: Request, res: Response) => {
    const ticketId = req.params.id;
    const ticket = getTicketById(ticketId);
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};

// UPDATE a ticket by ID with validation
export const updateTicketHandler = (req: Request, res: Response) => {
    const ticketId = req.params.id;
    const updatedTicket = updateTicket(ticketId, req.body);
    if (updatedTicket) {
        res.json(updatedTicket);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};

// DELETE a ticket by ID
export const deleteTicketHandler = (req: Request, res: Response) => {
    const ticketId = req.params.id;
    const isDeleted = deleteTicket(ticketId);
    if (isDeleted) {
        res.json({ message: 'Ticket deleted successfully' });
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};
