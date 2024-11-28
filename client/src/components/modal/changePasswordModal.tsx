import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { verifyOldPassword, updatePassword } from '../../slices/userSlice';

interface ChangePasswordModalProps {
    show: boolean;
    onHide: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ show, onHide }) => {
    const dispatch = useAppDispatch();
    const { verifying, verificationError, updating, updateError } = useAppSelector(state => state.user);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleVerifyOldPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(verifyOldPassword(oldPassword));
        if (result.meta.requestStatus === 'fulfilled') {
            setStep(2);
            setMessage('');
        } else {
            setMessage('Старый пароль неверный.');
        }
    };

    const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Новый пароль и подтверждение не совпадают.');
            return;
        }

        const result = await dispatch(updatePassword(newPassword));
        if (result.meta.requestStatus === 'fulfilled') {
            setMessage('Пароль успешно обновлен.');
            setStep(1);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            onHide();
        } else {
            setMessage('Не удалось обновить пароль.');
        }
    };

    const handleClose = () => {
        setStep(1);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Смена пароля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message && <Alert variant="danger">{message}</Alert>}
                {step === 1 ? (
                    <Form onSubmit={handleVerifyOldPassword}>
                        <Form.Group controlId="oldPassword">
                            <Form.Label>Старый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                value={oldPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                                placeholder="Введите старый пароль"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3" disabled={verifying}>
                            {verifying ? <Spinner animation="border" size="sm" /> : 'Проверить'}
                        </Button>
                        {verificationError && <Alert variant="danger" className="mt-2">{verificationError}</Alert>}
                    </Form>
                ) : (
                    <Form onSubmit={handleUpdatePassword}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>Новый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                                placeholder="Введите новый пароль"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="mt-3">
                            <Form.Label>Подтверждение пароля</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                placeholder="Подтвердите новый пароль"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3" disabled={updating}>
                            {updating ? <Spinner animation="border" size="sm" /> : 'Сохранить'}
                        </Button>
                        {updateError && <Alert variant="danger" className="mt-2">{updateError}</Alert>}
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ChangePasswordModal;
