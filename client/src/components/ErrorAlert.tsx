// src/components/ErrorAlert.tsx
import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
    message: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    return message ? <Alert variant="danger">{message}</Alert> : null;
};

export default ErrorAlert;
