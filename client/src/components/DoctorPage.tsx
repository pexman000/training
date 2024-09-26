import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ticket } from '../models/Ticket';

const DoctorPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get('http://localhost:3001/tickets');
      setTickets(response.data);
    };
    fetchTickets();
  }, []);

  const handleUpdate = async (ticketId: number) => {
    await axios.post('http://localhost:3001/tickets/update', { id: ticketId, status: 'completed' });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {tickets.map(ticket => (
          <div key={ticket.id}>
            <p>{ticket.firstName} {ticket.lastName}</p>
            <p>Age: {ticket.age} | Sex: {ticket.sex}</p>
            <p>Symptoms: {ticket.symptoms}</p>
            <div>
              <button onClick={() => handleUpdate(ticket.id)}>Mark as Completed</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DoctorPage;
