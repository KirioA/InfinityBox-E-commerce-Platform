// src/components/ProductDetailsModal.tsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Product } from '../../pages/admin/AdminCatalog.tsx';

interface ProductDetailsModalProps {
    show: boolean;
    product: Product | null;
    onHide: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ show, product, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Информация о товаре</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {product && (
                    <div>
                        <h5>{product.name}</h5>
                        <p>Цена: {product.price} ₽</p>
                        <p>Категория: {product.category}</p>
                        <p>Остаток: {product.stock}</p>
                        <p>Статус: {product.status}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetailsModal;
