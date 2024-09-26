import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(() => {
        const storedLoggedIn = localStorage.getItem('loggedIn');
        return storedLoggedIn === 'true';
    });

    const [role, setRole] = useState<string>(() => {
    const role = localStorage.getItem('role');
    return role!;
    });
      
    return (
        <div style={styles.container}>
            <header style={styles.header}>
            </header>
            <main style={styles.main}>
                <h2>Welcome to Updoc </h2>
                <p>Manage your tickets efficiently.</p>
                <div>
                    {loggedIn && role === 'patient'? <Link to="/consultation" style={styles.button}>Request Consultation</Link> : null}
                    {loggedIn && role === 'doctor' ? <Link to="/ticket" style={styles.button}>Manage Tickets</Link> : null}
                </div>
            </main>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
    loginContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
    },
    main: {
        textAlign: 'center',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
    }
};

export default Home;
