import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '../../slices/productSlice';

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

interface EditProductModalProps {
    show: boolean;
    onHide: () => void;
    productId: string; // Убрал необязательность
    categories: string[];
    onSave: (product: Product) => void; // Добавил обратный вызов сохранения
}

const EditProductModal: React.FC<EditProductModalProps> = ({
                                                               show,
                                                               onHide,
                                                               productId,
                                                               categories,
                                                               onSave
                                                           }) => {
    const dispatch = useDispatch();
    const { selectedProduct, loading, error } = useSelector((state: RootState) => state.products);

    const [editedProduct, setEditedProduct] = useState<Product>({
        id: '', // Инициализация обязательного поля
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

    useEffect(() => {
        if (show) {
            dispatch(fetchProductById(productId));
        }
    }, [productId, show, dispatch]);

    useEffect(() => {
        if (selectedProduct && show) {
            setEditedProduct({
                ...selectedProduct,
                id: selectedProduct.id, // Гарантированное наличие id
                price: Math.max(0, selectedProduct.price || 0),
                stock: Math.max(0, selectedProduct.stock || 0),
                netWeight: Math.max(0, selectedProduct.netWeight || 0),
                status: selectedProduct.status || 'active',
            });
        }
    }, [selectedProduct, show]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'netWeight'
                ? Math.max(0, Number(value))
                : value,
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        dispatch(updateProduct({ id: editedProduct.id, updatedData: editedProduct }));
        onSave(editedProduct); // Вызов обратного вызова
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Редактировать товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Название товара</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, введите название товара
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Категория</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={editedProduct.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Выберите категорию</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, выберите категорию
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={editedProduct.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Цена должна быть неотрицательной
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Остаток на складе</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={editedProduct.stock}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Вес нетто</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="netWeight"
                                    value={editedProduct.netWeight}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>URL изображения</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="imageUrl"
                                    value={editedProduct.imageUrl}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Статус</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={editedProduct.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Активен</option>
                                    <option value="inactive">Неактивен</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-3">
                        <Button
                            variant="secondary"
                            onClick={onHide}
                            className="me-2"
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? 'Сохранение...' : 'Сохранить изменения'}
                        </Button>
                    </div>

                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;
