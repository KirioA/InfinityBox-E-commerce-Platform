import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { updatePersonalInfo } from '../../slices/userSlice.ts';

const CISCountries = [
    'BY', 'RU', 'KZ', 'UA', 'MD', 'AZ', 'AM', 'GE', 'KG', 'TJ', 'TM', 'UZ'
];

interface ModalAddPersonalInfoProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (firstName: string, lastName: string, phoneNumber: string) => void;
}

const ModalAddPersonalInfo: React.FC<ModalAddPersonalInfoProps> = ({
                                                                       show,
                                                                       handleClose,
                                                                       handleSave,
                                                                   }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState<{
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
    }>({});

    const dispatch = useDispatch(); // Hook to get dispatch function

    const isValidName = (name: string): boolean => {
        const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
        return nameRegex.test(name);
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'Имя обязательно';
        } else if (firstName.trim().length < 2) {
            newErrors.firstName = 'Имя слишком короткое';
        } else if (!isValidName(firstName.trim())) {
            newErrors.firstName = 'Имя должно содержать только буквы';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Фамилия обязательна';
        } else if (lastName.trim().length < 2) {
            newErrors.lastName = 'Фамилия слишком короткая';
        } else if (!isValidName(lastName.trim())) {
            newErrors.lastName = 'Фамилия должна содержать только буквы';
        }

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Номер телефона обязателен';
        } else {
            if (!isValidPhoneNumber(phoneNumber)) {
                newErrors.phoneNumber = 'Номер телефона недействителен';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updatePersonalInfo({ firstName, lastName, phoneNumber }))
                .then(() => {
                    handleClose();
                    handleSave(firstName, lastName, phoneNumber);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить личную информацию</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="firstName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            placeholder="Введите имя"
                            onChange={(e) => setFirstName(e.target.value)}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            placeholder="Введите фамилию"
                            onChange={(e) => setLastName(e.target.value)}
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Номер телефона</Form.Label>
                        <PhoneInput
                            international
                            defaultCountry="BY"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            countries={CISCountries}
                            className={`form-control ${!!errors.phoneNumber ? 'is-invalid' : ''}`}
                        />
                        {errors.phoneNumber && (
                            <Alert variant="danger" className="mt-2">
                                {errors.phoneNumber}
                            </Alert>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddPersonalInfo;
