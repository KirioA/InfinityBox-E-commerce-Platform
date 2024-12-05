import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/productSlice';

interface Product {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock?: number;
    netWeight?: number;
    status?: string;
}

interface AddProductModalProps {
    show: boolean;
    onHide: () => void;
    categories: string[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({ show, onHide, categories }) => {
    const dispatch = useDispatch();

    const [newProduct, setNewProduct] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stock: 0,
        netWeight: 0,
        status: 'active'
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const validateField = (name: string, value: string | number) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'name':
                if (!value || value.toString().trim() === '') {
                    newErrors.name = 'Название товара обязательно';
                } else if (value.toString().length < 3) {
                    newErrors.name = 'Название должно быть не короче 3 символов';
                } else {
                    delete newErrors.name;
                }
                break;
            case 'price':
                const price = Number(value);
                if (price <= 0) {
                    newErrors.price = 'Цена должна быть положительной';
                } else {
                    delete newErrors.price;
                }
                break;
            case 'category':
                if (!value || value === '') {
                    newErrors.category = 'Выберите категорию';
                } else {
                    delete newErrors.category;
                }
                break;
            case 'imageUrl':
                // if (value && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value.toString())) {
                //     newErrors.imageUrl = 'Введите корректный URL изображения';
                // } else {
                //     delete newErrors.imageUrl;
                // }
                delete newErrors.imageUrl;
                break;
            case 'stock':
                const stock = Number(value);
                if (stock < 0) {
                    newErrors.stock = 'Остаток на складе не может быть отрицательным';
                } else {
                    delete newErrors.stock;
                }
                break;
            case 'netWeight':
                const netWeight = Number(value);
                if (netWeight < 0) {
                    newErrors.netWeight = 'Вес не может быть отрицательным';
                } else {
                    delete newErrors.netWeight;
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const processedValue = name === 'price' || name === 'stock' || name === 'netWeight'
            ? Number(value)
            : value;

        setNewProduct(prev => ({
            ...prev,
            [name]: processedValue
        }));

        validateField(name, processedValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields before submission
        const fieldsToValidate = ['name', 'price', 'category', 'imageUrl', 'stock', 'netWeight'];
        fieldsToValidate.forEach(field => validateField(field, newProduct[field as keyof Product]));

        if (Object.keys(errors).length === 0) {
            dispatch(addProduct(newProduct));
            setNewProduct({
                name: '',
                description: '',
                price: 0,
                category: '',
                imageUrl: '',
                stock: 0,
                netWeight: 0,
                status: 'active'
            });
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="w-100 text-center">Добавить новый товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Название товара *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Цена *</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    isInvalid={!!errors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Категория *</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleChange}
                                    isInvalid={!!errors.category}
                                >
                                    <option value="">Выберите категорию</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.category}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>URL изображения</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imageUrl"
                                    value={newProduct.imageUrl}
                                    onChange={handleChange}
                                    isInvalid={!!errors.imageUrl}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.imageUrl}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Остаток на складе</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={newProduct.stock}
                                    onChange={handleChange}
                                    min="0"
                                    isInvalid={!!errors.stock}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.stock}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Вес нетто</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="netWeight"
                                    value={newProduct.netWeight}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    isInvalid={!!errors.netWeight}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.netWeight}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Статус</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={newProduct.status}
                                    onChange={handleChange}
                                >
                                    <option value="active">Активен</option>
                                    <option value="inactive">Неактивен</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            Пожалуйста, исправьте ошибки перед отправкой формы
                        </Alert>
                    )}

                    <div className="d-flex justify-content-end mt-4">
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
                        >
                            Добавить товар
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;