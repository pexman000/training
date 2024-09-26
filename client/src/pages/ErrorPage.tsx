import React, { useState, CSSProperties } from 'react';

const ErrorPage: React.FC = () => { 
    return (
<div style={styles.container}>
    <h2>
        ARE YOU LOST? <a href="/">BACK TO HOME</a>
    </h2>
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
    }
};

export default ErrorPage;
