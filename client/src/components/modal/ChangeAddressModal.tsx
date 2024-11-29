import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ChangeAddressModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (address: { street: string; city: string; postalCode: string; country: string }) => void;
    currentAddress: { street: string; city: string; postalCode: string; country: string };
}

const ChangeAddressModal: React.FC<ChangeAddressModalProps> = ({ show, onHide, onSubmit, currentAddress }) => {
    const [street, setStreet] = useState(currentAddress.street);
    const [city, setCity] = useState(currentAddress.city);
    const [postalCode, setPostalCode] = useState(currentAddress.postalCode);
    const [country, setCountry] = useState(currentAddress.country);

    const handleSubmit = () => {
        onSubmit({ street, city, postalCode, country });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Изменить адрес</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="street">
                        <Form.Label>Улица</Form.Label>
                        <Form.Control
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>Город</Form.Label>
                        <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="postalCode">
                        <Form.Label>Почтовый индекс</Form.Label>
                        <Form.Control
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Страна</Form.Label>
                        <Form.Control
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeAddressModal;
