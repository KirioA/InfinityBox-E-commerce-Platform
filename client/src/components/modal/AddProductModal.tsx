import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

interface AddProductModalProps {
    show: boolean;
    onHide: () => void;
    onAddProduct: (newProduct: any) => void;
    categories: any[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({ show, onHide, onAddProduct, categories }) => {
    const [newProductName, setNewProductName] = useState<string>('');
    const [newProductPrice, setNewProductPrice] = useState<number>(0);
    const [newProductDescription, setNewProductDescription] = useState<string>('');
    const [newProductImage, setNewProductImage] = useState<string>('');
    const [newProductShortDescription, setNewProductShortDescription] = useState<string>('');
    const [newProductCategory, setNewProductCategory] = useState<string>('');
    const [newProductStock, setNewProductStock] = useState<number>(0);

    const handleAddProduct = () => {
        if (
            newProductName.trim() &&
            newProductPrice > 0 &&
            newProductDescription.trim() &&
            newProductImage.trim() &&
            newProductShortDescription.trim() &&
            newProductCategory &&
            newProductStock > 0
        ) {
            const newProduct = {
                _id: `${Date.now()}`,
                name: newProductName.trim(),
                price: newProductPrice,
                description: newProductDescription.trim(),
                image: newProductImage.trim(),
                shortDescription: newProductShortDescription.trim(),
                category: { _id: newProductCategory, name: newProductCategory },
                stock: newProductStock,
                createdAt: new Date().toISOString(),
            };
            onAddProduct(newProduct);
            onHide(); // Закрыть модальное окно после добавления
            resetProductForm();
        }
    };

    const resetProductForm = () => {
        setNewProductName('');
        setNewProductPrice(0);
        setNewProductDescription('');
        setNewProductImage('');
        setNewProductShortDescription('');
        setNewProductCategory('');
        setNewProductStock(0);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="productName">
                        <Form.Label>Название товара</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название товара"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите цену товара"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(Number(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group controlId="productDescription">
                        <Form.Label>Описание товара</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Введите описание товара"
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="productImage">
                        <Form.Label>Картинка</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите ссылку на картинку"
                            value={newProductImage}
                            onChange={(e) => setNewProductImage(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="productShortDescription">
                        <Form.Label>Краткое описание</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите краткое описание"
                            value={newProductShortDescription}
                            onChange={(e) => setNewProductShortDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="productCategory">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control
                            as="select"
                            value={newProductCategory}
                            onChange={(e) => setNewProductCategory(e.target.value)}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="productStock">
                        <Form.Label>Количество на складе</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите количество товара на складе"
                            value={newProductStock}
                            onChange={(e) => setNewProductStock(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleAddProduct}>
                    Добавить товар
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProductModal;
