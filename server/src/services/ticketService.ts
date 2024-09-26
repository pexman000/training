import { Ticket } from '../models/Ticket';
import { v4 as uuid } from 'uuid';

let tickets: Ticket[] = [];  // In-memory storage for tickets

export const createTicket = (data: Ticket): Ticket => {
    const newTicket: Ticket = {...data, id: uuid()};
    tickets.push(newTicket);
    return newTicket;
};

export const getAllTickets = (): Ticket[] => {
    return tickets;
};

export const getTicketById = (id: string): Ticket | undefined => {
    return tickets.find(ticket => ticket.id === id);
};

export const updateTicket = (id: string, data: Ticket): Ticket | undefined => {
    const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) return undefined;

    tickets[ticketIndex] = { ...tickets[ticketIndex], ...data };
    return tickets[ticketIndex];
};

export const deleteTicket = (id: string): boolean => {
    const ticketIndex = tickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) return false;

    tickets.splice(ticketIndex, 1);
    return true;
};
