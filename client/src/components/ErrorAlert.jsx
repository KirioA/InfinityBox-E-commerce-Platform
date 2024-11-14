// src/components/ErrorAlert.jsx
import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorAlert = ({ message, variant }) => {
    if (!message) return null; // Если нет сообщения, ничего не показываем

    return (
        <Alert variant={variant} className="error-alert">
            {message}
        </Alert>
    );
};

export default ErrorAlert;
