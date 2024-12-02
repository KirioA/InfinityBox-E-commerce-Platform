import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { User } from '../../pages/admin/UserManagement.tsx';

interface UserDeleteModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
    onDelete: () => void;
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
                                                             show,
                                                             onHide,
                                                             user,
                                                             onDelete
                                                         }) => {
    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение удаления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Вы уверены, что хотите удалить пользователя:</p>
                    <h5>{user.name}</h5>
                    <p>Email: {user.email}</p>
                    <div className="alert alert-warning">
                        Внимание! Это действие нельзя будет отменить.
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Удалить пользователя
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDeleteModal;