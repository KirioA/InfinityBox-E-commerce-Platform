import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/productSlice';

interface Product {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
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
        stock: 0,
        netWeight: 0,
        status: 'active',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const processedValue =
            name === 'price' || name === 'stock' || name === 'netWeight'
                ? Number(value)
                : value;

        setNewProduct((prev) => ({
            ...prev,
            [name]: processedValue,
        }));

        validateField(name, processedValue);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fieldsToValidate = ['name', 'price', 'category'];
        fieldsToValidate.forEach((field) =>
            validateField(field, newProduct[field as keyof Product])
        );

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('price', newProduct.price.toString());
            formData.append('category', newProduct.category);
            formData.append('status', newProduct.status || 'active');

            if (newProduct.stock) formData.append('stock', newProduct.stock.toString());
            if (newProduct.netWeight) formData.append('netWeight', newProduct.netWeight.toString());
            if (selectedFile) formData.append('image', selectedFile);

            try {
                // Отправка данных на сервер (замените URL на ваш)
                const response = await fetch('http://localhost:3000/api/v1/products', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Ошибка при добавлении товара');
                }

                const result = await response.json();
                dispatch(addProduct(result));
                setNewProduct({
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    stock: 0,
                    netWeight: 0,
                    status: 'active',
                });
                setSelectedFile(null);
                onHide();
            } catch (error) {
                console.error(error);
                alert('Не удалось добавить товар');
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый товар</Modal.Title>
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
                                <Form.Label>Остаток на складе</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={newProduct.stock}
                                    onChange={handleChange}
                                    min="0"
                                    isInvalid={!!errors.stock}
                                />
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
                                />
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

                            <Form.Group className="mb-3">
                                <Form.Label>Загрузите изображение</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="danger">
                            Пожалуйста, исправьте ошибки перед отправкой формы
                        </Alert>
                    )}

                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Отмена
                        </Button>
                        <Button type="submit" variant="primary">
                            Добавить товар
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;
