import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct, addProduct } from '../../slices/productSlice';
import { RootState } from '../../redux/store';
import DeleteProductModal from '../../components/modal/DeleteProductModal';
import ProductDetailsModal from '../../components/modal/ProductDetailsModal';
import AddProductModal from '../../components/modal/AddProductModal';
import EditProductModal from '../../components/modal/EditProductModal';

interface Product {
    id: string; // Обязательное поле
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number; // Убрал необязательность
    netWeight: number; // Убрал необязательность
    status: string; // Убрал необязательность
    createdAt?: string;
    updatedAt?: string;
}
const AdminProductManagement: React.FC = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    const [categories] = useState<string[]>(['Электроника', 'Компьютеры', 'Аудиотехника', 'Аксессуары']);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
            const matchesStatus = statusFilter ? product.status === statusFilter : true;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, searchTerm, categoryFilter, statusFilter]);

    const handleProductDelete = () => {
        if (selectedProductId) {
            dispatch(deleteProduct(selectedProductId));
            setShowDeleteModal(false);
        }
    };

    const handleSaveEditProduct = (updatedProduct: Product) => {
        if (updatedProduct.id) {
            dispatch(updateProduct({ id: updatedProduct.id, updatedData: updatedProduct }));
            setShowEditModal(false);
        }
    };

    const handleConfirmAddProduct = (newProduct: Product) => {
        dispatch(addProduct(newProduct));
        setShowAddProductModal(false);
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Управление товарами</h1>

            <Row className="mb-4">
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Поиск товаров"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Все категории</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Все статусы</option>
                        <option value="active">Активные</option>
                        <option value="inactive">Неактивные</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Button
                        variant="success"
                        onClick={() => setShowAddProductModal(true)}
                        className="w-100"
                    >
                        <FaPlus /> Добавить товар
                    </Button>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Категория</th>
                    <th>Остаток</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((product, index) => (
                    <tr key={`${product.id}-${index}`}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price} ₽</td>
                        <td>{product.category}</td>
                        <td>{product.stock || '0'}</td>
                        <td>
                                <span className={`badge ${product.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                    {product.status === 'active' ? 'Активен' : 'Неактивен'}
                                </span>
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary">
                                    Действия
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {
                                        setSelectedProductId(product.id);
                                        setShowDetailsModal(true);
                                    }}>
                                        <FaEye /> Просмотр
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setSelectedProductId(product.id);
                                        setShowEditModal(true);
                                    }}>
                                        <FaEdit /> Редактировать
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setSelectedProductId(product.id);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-danger"
                                    >
                                        <FaTrash /> Удалить
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Модальные окна */}
            <DeleteProductModal
                show={showDeleteModal}
                productId={selectedProductId}
                onHide={() => setShowDeleteModal(false)}
                onDelete={handleProductDelete}
            />
            <ProductDetailsModal
                show={showDetailsModal}
                productId={selectedProductId}
                onHide={() => setShowDetailsModal(false)}
            />
            <AddProductModal
                show={showAddProductModal}
                onHide={() => setShowAddProductModal(false)}
                onConfirm={handleConfirmAddProduct}
                categories={categories}
            />
            <EditProductModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                productId={selectedProductId}
                categories={categories}
                onSave={handleSaveEditProduct}
            />
        </Container>
    );
};

export default AdminProductManagement;
