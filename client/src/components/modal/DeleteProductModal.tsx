// src/components/DeleteProductModal.tsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Product } from '../pages/AdminProductManagement';

interface DeleteProductModalProps {
    show: boolean;
    product: Product | null;
    onHide: () => void;
    onDelete: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ show, product, onHide, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение удаления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Вы уверены, что хотите удалить товар "{product?.name}"?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProductModal;
