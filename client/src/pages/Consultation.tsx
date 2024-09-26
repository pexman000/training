import React, { useState, useEffect, CSSProperties } from 'react';

const Consultation: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
        const storedLoggedIn = localStorage.getItem('loggedIn');
        return storedLoggedIn === 'true'; // Convertir la chaîne en booléen
    });
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        sex: '',
        symptoms: ''
    });

    const [consultations, setConsultations] = useState<any[]>([]); // State for consultations

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, symptoms: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Ticket Created", result);
                fetchConsultations(); // Fetch consultations after submitting
            } else {
                const errorData = await response.json();
                console.error("Error creating ticket:", errorData);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    // Fetch consultations from the backend
    const fetchConsultations = async () => {
        try {
            const response = await fetch('http://localhost:3001/tickets');
            if (response.ok) {
                const data = await response.json();
                setConsultations(data); // Update state with fetched consultations
            } else {
                console.error("Error fetching consultations");
            }
        } catch (error) {
            console.error("Network error while fetching consultations:", error);
        }
    };

    // Fetch consultations when component mounts
    useEffect(() => {
        fetchConsultations();
    }, []);

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Consultation Request</h2>
                <div style={styles.row}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <div style={styles.row}>
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
                    <select name="sex" value={formData.sex} onChange={handleInputChange} required>
                        <option value="">Select Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={styles.row}>
                    <textarea name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleTextareaChange} required />
                </div>
                <button type="submit" style={styles.submitButton}>Submit</button>
            </form>

            <h2>Consultations</h2>
            <div style={styles.consultationList}>
                {consultations.length > 0 ? (
                    consultations.map((consultation, index) => (
                        <div key={index} style={styles.consultationItem}>
                            <h3>{consultation.firstName} {consultation.lastName}</h3>
                            <p>Age: {consultation.age}</p>
                            <p>Sex: {consultation.sex}</p>
                            <p>Symptoms: {consultation.symptoms}</p>
                        </div>
                    ))
                ) : (
                    <p>No consultations available.</p>
                )}
            </div>
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
    form: {
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
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    },
    submitButtonHover: {
        backgroundColor: '#0056b3',
    },
    submitButtonActive: {
        transform: 'scale(0.95)',
    },
    consultationList: {
        marginTop: '20px',
        maxWidth: '500px',
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    consultationItem: {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    }
};

export default Consultation;
