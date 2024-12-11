import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacancies, addVacancy, updateVacancy, deleteVacancy } from '../../slices/vacanciesSlice.ts';
import { RootState } from '../../redux/store';
const AdminVacancies: React.FC = () => {
    const dispatch = useDispatch();

    const { vacancies, loading, error } = useSelector((state: any) => state.vacancies);
    const [showModal, setShowModal] = useState(false);
    const [currentVacancy, setCurrentVacancy] = useState<any | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
    });


    useEffect(() => {
        dispatch(fetchVacancies());
    }, [dispatch]);

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentVacancy(null);
        setFormData({ title: '', location: '', description: '' });
    };

    const handleShowModal = (vacancy: any = null) => {
        setCurrentVacancy(vacancy);
        setFormData({
            title: vacancy?.title || '',
            location: vacancy?.location || '',
            description: vacancy?.description || '',
        });
        setShowModal(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (currentVacancy) {
            dispatch(updateVacancy({ id: currentVacancy.id, ...formData }));
        } else {
            dispatch(addVacancy(formData));
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        dispatch(deleteVacancy(id));
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Управление вакансиями</h1>

            {loading && <Alert variant="info">Загрузка данных...</Alert>}
            {error && <Alert variant="danger">Ошибка: {error}</Alert>}

            <Button variant="success" className="mb-3" onClick={() => handleShowModal()}>
                Добавить вакансию
            </Button>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Локация</th>
                    <th>Описание</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(vacancies) ? (
                    vacancies.map((vacancy: any, index: number) => (
                        <tr key={vacancy.id}>
                            <td>{index + 1}</td>
                            <td>{vacancy.title}</td>
                            <td>{vacancy.location}</td>
                            <td>{vacancy.description}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowModal(vacancy)}
                                >
                                    Изменить
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(vacancy.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">
                            Данные отсутствуют или некорректны
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            {/* Модальное окно для добавления/редактирования вакансии */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentVacancy ? 'Редактировать вакансию' : 'Добавить вакансию'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название вакансии"
                                name="title"
                                value={formData.title}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Локация</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите локацию"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введите описание"
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {currentVacancy ? 'Сохранить изменения' : 'Добавить'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminVacancies;
