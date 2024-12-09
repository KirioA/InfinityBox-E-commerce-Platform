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
    productId: string;
    categories: string[];
    onSave: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
                                                               show,
                                                               onHide,
                                                               productId,
                                                               categories,
                                                               onSave,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'netWeight'
                ? Math.max(0, Number(value))
                : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setEditedProduct((prev) => ({
                    ...prev,
                    imageUrl: file.name, // Save only file name or URL to send to the server
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProduct = (updatedData: FormData) => {
        const updatedFields: any = {}; // Fields to send without FormData

        // Extract only the data from FormData
        updatedData.forEach((value, key) => {
            if (key !== 'image') {
                updatedFields[key] = value;
            }
        });

        // Now send only the data without FormData
        dispatch(updateProduct({ id: editedProduct.id, updatedData: updatedFields }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const formData = new FormData();
        formData.append('name', editedProduct.name);
        formData.append('description', editedProduct.description);
        formData.append('price', String(editedProduct.price));
        formData.append('category', editedProduct.category);
        formData.append('stock', String(editedProduct.stock));
        formData.append('netWeight', String(editedProduct.netWeight));
        formData.append('status', editedProduct.status);

        if (editedProduct.imageUrl) {
            const imageFile = editedProduct.imageUrl instanceof File ? editedProduct.imageUrl : null;
            if (imageFile) {
                formData.append('image', imageFile);
            }
        }

        try {
            await dispatch(updateProduct({ id: editedProduct.id, updatedData: formData }));
            onSave(editedProduct);
            onHide();
        } catch (err) {
            console.error('Error saving product:', err);
        }
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
                                    type="text"
                                    name="imageUrl"
                                    value={editedProduct.imageUrl}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Загрузить новое изображение</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
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
                        <Button variant="secondary" onClick={onHide}>
                            Отмена
                        </Button>
                        <Button variant="primary" type="submit" className="ms-2">
                            Сохранить
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;
