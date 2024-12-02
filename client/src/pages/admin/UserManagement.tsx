import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Badge, Alert, Spinner } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import UserEditModal from '../../components/modal/UserEditModal';
import UserDetailModal from '../../components/modal/UserDetailModal.tsx';
import UserDeleteModal from '../../components/modal/UserDeleteModal.tsx';
import UserAddModal from '../../components/modal/UserAddModal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../slices/adminSlice';
import { RootState } from '../../redux/store.ts';

interface User {
    _id: string;
    name: string;
    mail: string;
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
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showUserDetailModal, setShowUserDetailModal] = useState(false);
    const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
    const [showUserCustomModal, setShowUserCustomModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    const dispatch = useDispatch();
    const { users, loading, usersFetched, error } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        if (!usersFetched && !loading) {
            dispatch(fetchUsers());
        }
    }, [dispatch, usersFetched, loading]);

    useEffect(() => {
        let result = users;

        if (searchTerm) {
            result = result.filter(user =>
                (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (user.mail?.toLowerCase() || '').includes(searchTerm.toLowerCase())
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

    const handleViewUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserDetailModal(true);
    };

    const handleCustomUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserCustomModal(true);
    };

    const handleDeleteUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserDeleteModal(true);
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                // Удаление пользователя
                const result = await dispatch(deleteUser(selectedUser._id)).unwrap();
                console.log('Пользователь успешно удалён:', result.message);

                // Перезагружаем список пользователей
                dispatch(fetchUsers());
            } catch (error: any) {
                console.error('Ошибка при удалении пользователя:', error.message);
            } finally {
                setShowUserDeleteModal(false);
            }
        }
    };

    const renderStatusBadge = (status: string) => {
        switch (status) {
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

    const renderRoleBadge = (role: string) => {
        switch (role) {
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
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Поиск по имени или email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={2}>
                    <Form.Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="">Все роли</option>
                        <option value="admin">Администраторы</option>
                        <option value="manager">Менеджеры</option>
                        <option value="customer">Покупатели</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">Все статусы</option>
                        <option value="active">Активные</option>
                        <option value="blocked">Заблокированные</option>
                        <option value="inactive">Неактивные</option>
                    </Form.Select>
                </Col>
                <Col md={4} className="text-end">
                    <Button variant="primary" onClick={() => setShowAddUserModal(true)}>
                        Добавить пользователя
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : filteredUsers.length === 0 ? (
                <Alert variant="info">Пользователи не найдены.</Alert>
            ) : (
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
                            <td>{user.mail}</td>
                            <td>{renderRoleBadge(user.role)}</td>
                            <td>{renderStatusBadge(user.status)}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => handleViewUserDetails(user)}>
                                    <FaEye /> Детали
                                </Button>{' '}
                                <Button variant="warning" size="sm" onClick={() => handleCustomUserDetails(user)}>
                                    <FaEdit /> Изменить
                                </Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDeleteUserDetails(user)}>
                                    <FaTrash /> Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            <UserEditModal
                show={showUserCustomModal}
                onHide={() => setShowUserCustomModal(false)}
                user={selectedUser}
                onSave={() => console.log('Изменения сохранены')}
            />
            <UserDetailModal
                show={showUserDetailModal}
                onHide={() => setShowUserDetailModal(false)}
                user={selectedUser}
            />
            <UserDeleteModal
                show={showUserDeleteModal}
                onHide={() => setShowUserDeleteModal(false)}
                user={selectedUser}
                onDelete={handleDeleteUser}
            />
            <UserAddModal
                show={showAddUserModal}
                onHide={() => setShowAddUserModal(false)}
                onSave={() => console.log('Пользователь добавлен')}
            />
        </Container>
    );
};


export default UserManagement;
