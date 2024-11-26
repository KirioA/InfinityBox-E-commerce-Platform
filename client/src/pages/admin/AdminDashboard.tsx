import React, { useState, useEffect } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddProductModal from '../../components/modal/AddProductModal.tsx'; // Импортируем модальное окно

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [sales, setSales] = useState<any[]>([]);
    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);

    const navigate = useNavigate();

    // Тестовые данные для пользователей, товаров, категорий и продаж
    const testData = {
        users: [
            {
                _id: 'user1',
                name: 'Иван Иванов',
                email: 'ivanov@mail.com',
                role: 'admin',
                createdAt: '2024-11-25T00:00:00Z',
            },
        ],
        categories: [
            {
                _id: 'category1',
                name: 'Обувь',
                productCount: 5,
                totalValue: 24995, // Общая стоимость товаров в категории
            },
            {
                _id: 'category2',
                name: 'Одежда',
                productCount: 3,
                totalValue: 14997, // Общая стоимость товаров в категории
            },
        ],
        products: [
            {
                _id: 'product1',
                name: 'Кроссовки Nike',
                price: 4999,
                description: 'Кроссовки Nike для бега и тренировок.',
                image: 'link_to_image',
                shortDescription: 'Удобные и легкие кроссовки для бега.',
                category: { _id: 'category1', name: 'Обувь' },
                stock: 10,
                createdAt: '2024-11-25T00:00:00Z',
            },
        ],
        sales: [
            {
                _id: 'sale1',
                product: { _id: 'product1', name: 'Кроссовки Nike' },
                quantity: 1,
                totalAmount: 4999,
                date: '2024-11-25T00:00:00Z',
            },
        ],
    };

    // Загрузка тестовых данных
    const loadTestData = () => {
        setUsers(testData.users);
        setCategories(testData.categories);
        setProducts(testData.products);
        setSales(testData.sales);
    };

    useEffect(() => {
        loadTestData(); // Загружаем тестовые данные при монтировании компонента
    }, []);

    // Перенаправление на страницу редактирования пользователя
    const handleEditUser = (userId: string) => {
        navigate(`/admin/edit-user/${userId}`);
    };

    // Перенаправление на страницу редактирования товара
    const handleEditProduct = (productId: string) => {
        navigate(`/admin/edit-product/${productId}`);
    };

    // Перенаправление на страницу с полными данными пользователя
    const handleViewUserInfo = (userId: string) => {
        navigate(`/admin/view-user/${userId}`);
    };

    // Открытие модального окна для добавления товара
    const handleShowAddProductModal = () => {
        setShowAddProductModal(true);
    };

    // Закрытие модального окна
    const handleCloseAddProductModal = () => {
        setShowAddProductModal(false);
    };

    // Функция для добавления нового товара
    const handleAddProduct = (newProduct: any) => {
        setProducts([...products, newProduct]);
    };

    // Открытие страницы подробностей о продаже
    const handleViewSaleDetails = (saleId: string) => {
        navigate(`/admin/sale-details/${saleId}`);
    };

    // Открытие страницы для добавления категории
    const handleAddCategory = () => {
        navigate(`/admin/add-category`);
    };

    return (
        <Container>
            <h1>Панель администратора</h1>

            {/* Таблица пользователей */}
            <h3>Пользователи</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Дата регистрации</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                            <Button variant="info" onClick={() => handleViewUserInfo(user._id)}>
                                Просмотреть
                            </Button>
                            <Button variant="warning" onClick={() => handleEditUser(user._id)}>
                                Редактировать
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Таблица категорий */}
            <h3>Категории</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Категория</th>
                    <th>Количество товаров</th>
                    <th>Общая стоимость</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category.productCount}</td>
                        <td>{category.totalValue} ₽</td>
                        <td>
                            <Button variant="info">Просмотреть</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Кнопка добавления новой категории */}
            <Button variant="primary" onClick={handleAddCategory} className="w-100 mb-3">
                Добавить категорию
            </Button>



            {/* Таблица товаров */}
            <h3>Товары</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Категория</th>
                    <th>Количество</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.price} ₽</td>
                        <td>{product.category.name}</td>
                        <td>{product.stock}</td>
                        <td>
                            <Button variant="info" onClick={() => handleEditProduct(product._id)}>
                                Редактировать
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Кнопка добавления товара */}
            <Button variant="primary" onClick={handleShowAddProductModal} className="w-100 mb-3">
                Добавить товар
            </Button>

            {/* Модальное окно для добавления товара */}
            <AddProductModal
                show={showAddProductModal}
                onHide={handleCloseAddProductModal}
                onAddProduct={handleAddProduct}
                categories={categories}
            />

            {/* Таблица последних продаж */}
            <h3>Последние продажи</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Товар</th>
                    <th>Количество</th>
                    <th>Общая сумма</th>
                    <th>Дата</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale) => (
                    <tr key={sale._id}>
                        <td>{sale.product.name}</td>
                        <td>{sale.quantity}</td>
                        <td>{sale.totalAmount} ₽</td>
                        <td>{new Date(sale.date).toLocaleDateString()}</td>
                        <td>
                            <Button variant="info" onClick={() => handleViewSaleDetails(sale._id)}>
                                Просмотреть подробности
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Кнопка для создания статистики */}
            <Button variant="success" onClick={() => alert('Создание статистики...')} className="w-100">
                Создать статистику
            </Button>
        </Container>
    );
};

export default AdminDashboard;
