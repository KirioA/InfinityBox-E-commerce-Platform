import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { applyForJob } from '../slices/vacanciesSlice';

const Apply: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    console.log('ID вакансии:', jobId);
    const { theme } = useTheme();
    const dispatch = useDispatch();

    // Sample job titles
    const jobTitles: { [key: string]: string } = {
        'developer': 'Frontend Developer',
        'designer': 'UI/UX Designer',
        'manager': 'Project Manager',
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        resume: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0]) {
            setFormData((prevData) => ({
                ...prevData,
                resume: files[0],
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { name, email, phone, resume } = formData;
        if (!name || !email || !phone || !resume) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Отправка данных в Redux
        dispatch(applyForJob({ jobId, applicantName: name, email, phone, resume }));
    };

    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' },
        card: { backgroundColor: theme === 'light' ? '#ffffff' : '#333333', color: theme === 'light' ? '#000000' : '#ffffff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)', width: '100%', maxWidth: '500px', padding: '20px' },
        title: { textAlign: 'center' as const, fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' },
        subtitle: { textAlign: 'center' as const, color: theme === 'light' ? '#666' : '#ddd', fontSize: '16px', marginBottom: '30px' },
        formGroup: { marginBottom: '20px' },
        formControl: { backgroundColor: theme === 'light' ? '#fff' : '#555', color: theme === 'light' ? '#000' : '#fff', border: theme === 'light' ? '1px solid #ddd' : '1px solid #666', borderRadius: '5px', padding: '10px' },
        formControlFile: { backgroundColor: '#ffffff', color: '#333', border: '1px solid #81c784', borderRadius: '5px', padding: '8px' },
        button: { width: '100%', padding: '12px', backgroundColor: theme === 'light' ? '#ffffff' : '#444444', borderColor: '#81c784', color: '#81c784', border: '2px solid #81c784', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' as const, cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s ease' },
        buttonHover: { backgroundColor: '#81c784', color: '#ffffff' },
        buttonActive: { backgroundColor: '#66bb6a', color: '#ffffff' },
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <Card.Body>
                    <Card.Title style={styles.title}>
                        Подать заявку на вакансию: {jobTitles[jobId!] || 'Вакансия'}
                    </Card.Title>
                    <Card.Text style={styles.subtitle}>
                        Заполните форму ниже, чтобы отправить свое резюме на вакансию.
                    </Card.Text>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name" style={styles.formGroup}>
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ваше имя и фамилию"
                                style={styles.formControl}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="email" style={styles.formGroup}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введите ваш email"
                                style={styles.formControl}
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="phone" style={styles.formGroup}>
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Введите ваш телефон"
                                style={styles.formControl}
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="experience" style={styles.formGroup}>
                            <Form.Label>Опыт работы</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Кратко опишите ваш опыт работы"
                                style={styles.formControl}
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="resume" style={styles.formGroup}>
                            <Form.Label>Прикрепите резюме</Form.Label>
                            <Form.Control
                                type="file"
                                style={styles.formControlFile}
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            style={styles.button}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = styles.buttonHover.backgroundColor;
                                (e.currentTarget as HTMLButtonElement).style.color = styles.buttonHover.color;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = styles.button.backgroundColor;
                                (e.currentTarget as HTMLButtonElement).style.color = styles.button.color;
                            }}
                            onMouseDown={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = styles.buttonActive.backgroundColor;
                            }}
                            onMouseUp={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = styles.buttonHover.backgroundColor;
                            }}
                        >
                            Отправить заявку
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Apply;
