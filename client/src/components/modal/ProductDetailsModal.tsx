// src/components/ProductDetailsModal.tsx

import React, {useEffect, useState} from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { Product } from '../../pages/admin/AdminCatalog.tsx';
import {useDispatch, useSelector} from "react-redux";
import {fetchProductById} from "../../slices/productSlice.ts";

interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock?: number;
    netWeight?: number;
    status?: string;
}
interface ProductDetailsModalProps {
    show: boolean;
    onHide: () => void;
    productId: string;
    categories: string[];
}



const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
                                                                     show,
                                                                     onHide,
                                                                     productId,
                                                                     categories,

                                                                 }) => {
    const dispatch = useDispatch();
    const { selectedProduct, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    const [editedProduct, setEditedProduct] = useState<Product>({
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stock: 0,
        netWeight: 0,
        status: 'active',
    });

    const [validated, setValidated] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (show) {
            dispatch(fetchProductById(productId));
        }
    }, [productId, show, dispatch]);

    useEffect(() => {
        if (selectedProduct && show) {
            setEditedProduct({
                ...selectedProduct,
                id: selectedProduct.id,
                price: Math.max(0, selectedProduct.price || 0),
                stock: Math.max(0, selectedProduct.stock || 0),
                netWeight: Math.max(0, selectedProduct.netWeight || 0),
                status: selectedProduct.status || 'active',
                imageUrl: selectedProduct.imageUrl || '',
            });
            setImagePreview(selectedProduct.imageUrl); // Set image preview
        }
    }, [selectedProduct, show]);




    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Информация о товаре</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editedProduct ? (
                    <Row>
                        <Col md={6}>
                            <div className="mb-3">
                                <h5>Название:</h5>
                                <p>{editedProduct.name}</p>
                            </div>
                            <div className="mb-3">
                                <h5>Описание:</h5>
                                <p>{editedProduct.description}</p>
                            </div>
                            <div className="mb-3">
                                <h5>Цена:</h5>
                                <p>{editedProduct.price} ₽</p>
                            </div>
                            <div className="mb-3">
                                <h5>Категория:</h5>
                                <p>{editedProduct.category}</p>
                            </div>
                            <div className="mb-3">
                                <h5>Остаток на складе:</h5>
                                <p>{editedProduct.stock}</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <h5>Вес нетто:</h5>
                                <p>{editedProduct.netWeight} кг</p>
                            </div>
                            <div className="mb-3">
                                <h5>Статус:</h5>
                                <p>{editedProduct.status === 'active' ? 'Активен' : 'Неактивен'}</p>
                            </div>
                            <div className="mb-3">
                                <h5>Изображение:</h5>
                                {editedProduct.imageUrl ? (
                                    <Image
                                        src={editedProduct.imageUrl}
                                        alt="Product"
                                        fluid
                                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <p>Нет изображения</p>
                                )}
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <p>Информация о товаре отсутствует.</p>
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
