import React, { useState, useEffect, CSSProperties } from 'react';
import axios from 'axios';
import { Ticket } from '../models/Ticket';

const fetchData = () => {
    return axios
      .get("http://localhost:3001/tickets")
      .then((res) => {
        const { results } = res.data;
        console.log(results);
        return results;
      })
      .catch((err) => {
        console.error(err);
      });
  };

const TicketPage: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [action, setAction] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        fetchData().then((apiPeople) => {
            setTickets(apiPeople);
        });
      }, []);

    const handleSelectTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setAction('');
        setNotes('');
    };

    const handleSubmitAction = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Action Submitted", { ticket: selectedTicket, action, notes });
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.siteName}>Updoc</h1>
                <div style={styles.loginContainer}>
                    <button style={styles.logoutButton}>Logout</button>
                </div>
            </header>
            <div style={styles.ticketList}>
                <h2>Manage Tickets</h2>
                {tickets && tickets.length > 0 ? (
                    tickets.map(ticket => (
                        <div key={ticket.id} onClick={() => handleSelectTicket(ticket)} style={styles.ticketItem}>
                            <p>{ticket.firstName} {ticket.lastName} - {ticket.symptoms}</p>
                        </div>
                    ))
                ) : (
                    <p>No tickets available</p>
                )}
            </div>
            {selectedTicket && (
                <form onSubmit={handleSubmitAction} style={styles.actionForm}>
                    <h3>Selected Ticket: {selectedTicket.firstName} {selectedTicket.lastName}</h3>
                    <div style={styles.row}>
                        <select value={action} onChange={e => setAction(e.target.value)} required>
                            <option value="">Select Action</option>
                            <option value="complete">Complete</option>
                            <option value="refer">Refer to Specialist</option>
                        </select>
                    </div>
                    <div style={styles.row}>
                        <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} required />
                    </div>
                    <button type="submit" style={styles.submitButton}>Submit Action</button>
                </form>
            )}
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    container: {
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: '20px',
    },
    siteName: {
        margin: 0,
    },
    logoutButton: {
        padding: '10px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    ticketList: {
        maxWidth: '500px',
        width: '100%',
        marginBottom: '20px',
    },
    ticketItem: {
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        marginBottom: '10px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    actionForm: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        width: '100%',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    }
};

export default TicketPage;
