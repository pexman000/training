import React, { useState } from 'react';
import axios from 'axios';

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    sex: '',
    symptoms: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/tickets/create', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
        <input placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
      </div>
      <div>
        <input placeholder="Age" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
        <input placeholder="Sex" value={formData.sex} onChange={e => setFormData({ ...formData, sex: e.target.value })} />
      </div>
      <textarea placeholder="Symptoms" value={formData.symptoms} onChange={e => setFormData({ ...formData, symptoms: e.target.value })}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PatientForm;
