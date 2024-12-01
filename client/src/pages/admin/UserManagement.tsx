import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Modal,
    Form,
    Card,
    Badge
} from 'react-bootstrap';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// Mock user data structure
interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'customer';
    phone?: string;
    address?: string;
    registrationDate: string;
    lastLogin?: string;
    status: 'active' | 'blocked' | 'inactive';
    orders: number;
    totalSpent: number;
}

const UserManagement: React.FC = () => {
    // State for users and modals
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [showUserDetailModal, setShowUserDetailModal] = useState(false);
    const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
    const [showUserCustomModal, setShowUserCustomModal] = useState(false);

    const [showAddUserModal, setShowAddUserModal] = useState(false);

    // Filters and search
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');


    const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (selectedUser) {
            const { name, value } = e.target;
            setSelectedUser({ ...selectedUser, [name]: value });
        }
    };

    // Mock user data
    useEffect(() => {
        const mockUsers: User[] = [
            {
                _id: 'user1',
                name: 'Судас гей',
                email: 'sudas.gay@example.com',
                role: 'admin',
                phone: '+7 (912) 345-67-89',
                address: 'г. Москва, ул. Пушкина, д. 10, кв. 25',
                registrationDate: '2023-05-15T10:30:00Z',
                lastLogin: '2024-02-20T14:45:00Z',
                status: 'active',
                orders: 15,
                totalSpent: 75000
            },
            {
                _id: 'user2',
                name: 'Анна Смирнова',
                email: 'anna.smirnova@example.com',
                role: 'customer',
                phone: '+7 (985) 123-45-67',
                address: 'г. Санкт-Петербург, ул. Невская, д. 5, кв. 12',
                registrationDate: '2023-08-22T15:20:00Z',
                lastLogin: '2024-02-18T09:15:00Z',
                status: 'active',
                orders: 7,
                totalSpent: 35000
            },
            {
                _id: 'user3',
                name: 'Михаил Козлов',
                email: 'mikhail.kozlov@example.com',
                role: 'manager',
                phone: '+7 (900) 987-65-43',
                address: 'г. Новосибирск, ул. Ленина, д. 20, кв. 50',
                registrationDate: '2023-11-10T11:45:00Z',
                lastLogin: '2024-02-19T16:30:00Z',
                status: 'blocked',
                orders: 3,
                totalSpent: 15000
            }
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
    }, []);

    // Search and filter functionality
    useEffect(() => {
        let result = users;

        if (searchTerm) {
            result = result.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (roleFilter) {
            result = result.filter(user => user.role === roleFilter);
        }

        if (statusFilter) {
            result = result.filter(user => user.status === statusFilter);
        }

        setFilteredUsers(result);
    }, [searchTerm, roleFilter, statusFilter, users]);

    // Open user detail modal
    const handleViewUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserDetailModal(true);
    };
    const handleDeleteUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserDeleteModal(true);
    };
    const handleCustomUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserCustomModal(true);
    };


    // Render status badge
    const renderStatusBadge = (status: string) => {
        switch(status) {
            case 'active':
                return <Badge bg="success">Активен</Badge>;
            case 'blocked':
                return <Badge bg="danger">Заблокирован</Badge>;
            case 'inactive':
                return <Badge bg="secondary">Неактивен</Badge>;
            default:
                return <Badge bg="secondary">Неизвестно</Badge>;
        }
    };

    // Render role badge
    const renderRoleBadge = (role: string) => {
        switch(role) {
            case 'admin':
                return <Badge bg="danger">Администратор</Badge>;
            case 'manager':
                return <Badge bg="warning">Менеджер</Badge>;
            case 'customer':
                return <Badge bg="primary">Покупатель</Badge>;
            default:
                return <Badge bg="secondary">Неизвестно</Badge>;
        }
    };

    return (
        <Container>
            <h1 className="my-4">Управление пользователями</h1>

            {/* Filters and Search */}
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Поиск по имени или email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        prefix={<FaSearch />}
                    />
                </Col>
                <Col md={2}>
                    <Form.Select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">Все роли</option>
                        <option value="admin">Администраторы</option>
                        <option value="manager">Менеджеры</option>
                        <option value="customer">Покупатели</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Все статусы</option>
                        <option value="active">Активные</option>
                        <option value="blocked">Заблокированные</option>
                        <option value="inactive">Неактивные</option>
                    </Form.Select>
                </Col>
                <Col md={4} className="text-end">
                    <Button
                        variant="primary"
                        onClick={() => setShowAddUserModal(true)}
                    >
                        Добавить пользователя
                    </Button>
                </Col>
            </Row>

            {/* User Table */}
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Роль</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{renderRoleBadge(user.role)}</td>
                        <td>{renderStatusBadge(user.status)}</td>
                        <td>
                            <Button
                                variant="info"
                                size="sm"
                                className="me-2"
                                onClick={() => handleViewUserDetails(user)}
                            >
                                <FaEye /> Детали
                            </Button>
                            <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => handleCustomUserDetails(user)}
                            >
                                <FaEdit /> Изменить
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleCustomUserDetails(user)}
                            >
                                <FaTrash /> Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* User Details Modal */}
            <Modal
                show={showUserDetailModal}
                onHide={() => setShowUserDetailModal(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Подробная информация о пользователе</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <Row>
                            <Col md={4}>
                                <Card className="mb-3">
                                    <Card.Body className="text-center">
                                        <div className="mb-3">
                                            {renderRoleBadge(selectedUser.role)}
                                            {' '}
                                            {renderStatusBadge(selectedUser.status)}
                                        </div>
                                        <h4>{selectedUser.name}</h4>
                                        <p>{selectedUser.email}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card>
                                    <Card.Body>
                                        <Row className="mb-2">
                                            <Col md={6}>
                                                <strong>Телефон:</strong> {selectedUser.phone || 'Не указан'}
                                            </Col>
                                            <Col md={6}>
                                                <strong>Адрес:</strong> {selectedUser.address || 'Не указан'}
                                            </Col>
                                        </Row>
                                        <Row className="mb-2">
                                            <Col md={6}>
                                                <strong>Дата регистрации:</strong> {new Date(selectedUser.registrationDate).toLocaleString()}
                                            </Col>
                                            <Col md={6}>
                                                <strong>Последний вход:</strong> {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Нет данных'}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <strong>Количество заказов:</strong> {selectedUser.orders}
                                            </Col>
                                            <Col md={6}>
                                                <strong>Общая сумма покупок:</strong> {selectedUser.totalSpent} ₽
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowUserDetailModal(false)}
                    >
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add User Modal */}
            <Modal
                show={showAddUserModal}
                onHide={() => setShowAddUserModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" placeholder="Введите имя" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Роль</Form.Label>
                            <Form.Select>
                                <option>Выберите роль</option>
                                <option value="customer">Покупатель</option>
                                <option value="manager">Менеджер</option>
                                <option value="admin">Администратор</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control type="tel" placeholder="Введите номер телефона" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Добавить пользователя
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/*Удаление*/}
            <Modal
                show={showUserDeleteModal}
                onHide={() => setShowUserDeleteModal(false)}

            >

                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение удаления</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <p>Вы уверены, что хотите удалить пользователя:</p>
                            <h5>{selectedUser.name}</h5>
                            <p>Email: {selectedUser.email}</p>
                            <div className="alert alert-warning">
                                Внимание! Это действие нельзя будет отменить.
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUserDeleteModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={() => alert('пользователь удален')}>
                        Удалить пользователя
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*Редактирование*/}
            <Modal
                show={showUserCustomModal}
                onHide={() => setShowUserCustomModal(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={selectedUser?.name || ''}
                                        onChange={handleEditUserChange}
                                        placeholder="Введите имя"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={selectedUser?.email || ' '}
                                        onChange={handleEditUserChange}
                                        placeholder="Введите email"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Роль</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={selectedUser?.role || ''}
                                        onChange={handleEditUserChange}
                                    >
                                        <option value="">Выберите роль</option>
                                        <option value="customer">Покупатель</option>
                                        <option value="manager">Менеджер</option>
                                        <option value="admin">Администратор</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Статус</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={selectedUser?.status || ''}
                                        onChange={handleEditUserChange}
                                    >
                                        <option value="">Выберите статус</option>
                                        <option value="active">Активен</option>
                                        <option value="blocked">Заблокирован</option>
                                        <option value="inactive">Неактивен</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={selectedUser?.phone || ''}
                                        onChange={handleEditUserChange}
                                        placeholder="Введите номер телефона"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Адрес</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={selectedUser?.address || ''}
                                        onChange={handleEditUserChange}
                                        placeholder="Введите адрес"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUserCustomModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={() => alert('Пользователь изменен')}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>


        </Container>
    );
};

export default UserManagement;