// src/components/ErrorAlert.jsx
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorAlert = ({ message, variant }) => {
    if (!message) return null;
    return <Alert variant={variant}>{message}</Alert>;
};

export default ErrorAlert;
