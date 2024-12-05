import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/productSlice';

interface AddProductModalProps {
    show: boolean;
    onHide: () => void;
    categories: string[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({ show, onHide, categories }) => {
    const dispatch = useDispatch();
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
        stock: 0,
        netWeight: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(`Changing field: ${name}, Value: ${value}`);
        setProductDetails((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'netWeight' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit button clicked');
        console.log('Current product details:', productDetails);

        // Validate input
        const requiredFields = ['name', 'description', 'price', 'category', 'imageUrl', 'stock', 'netWeight'];
        const missingFields = requiredFields.filter(field =>
            !productDetails[field as keyof typeof productDetails] ||
            (typeof productDetails[field as keyof typeof productDetails] === 'string' &&
                productDetails[field as keyof typeof productDetails] === '')
        );

        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            alert(`Пожалуйста, заполните все поля: ${missingFields.join(', ')}`);
            return;
        }

        try {
            console.log('Attempting to dispatch addProduct');
            const result = await dispatch(addProduct(productDetails));

            console.log('Dispatch result:', result);

            if (addProduct.fulfilled.match(result)) {
                console.log('Product added successfully');
                onHide();
                setProductDetails({
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    imageUrl: '',
                    stock: 0,
                    netWeight: 0,
                });
            } else {
                console.error('Failed to add product', result);
                alert('Не удалось добавить продукт');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            alert('Произошла ошибка при добавлении продукта');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Название</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={productDetails.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Категория</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={productDetails.category}
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
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={productDetails.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>URL изображения</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imageUrl"
                                    value={productDetails.imageUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={productDetails.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Остаток</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={productDetails.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Вес (граммы)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="netWeight"
                                    value={productDetails.netWeight}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Добавить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProductModal;