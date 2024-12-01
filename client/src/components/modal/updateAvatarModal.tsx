    import React, { useState } from 'react';
    import { Modal, Button, Image, Form } from 'react-bootstrap';

    interface UploadAvatarModalProps {
        show: boolean;
        onHide: () => void;
        onSubmit: (avatarUrl: string) => void;
        currentAvatar: string; // Ссылка на текущий аватар
    }

    const UploadAvatarModal: React.FC<UploadAvatarModalProps> = ({ show, onHide, onSubmit, currentAvatar }) => {
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [preview, setPreview] = useState<string | null>(null);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file)); // Отображаем предварительный просмотр
            }
        };

        const handleUpload = () => {
            if (selectedFile) {
                onSubmit(selectedFile); // Отправляем выбранный файл
            }
        };
        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить аватар</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5>Текущий аватар</h5>
                    <Image
                        src={currentAvatar.startsWith('http') ? currentAvatar : `http://localhost:3000${currentAvatar}`}
                        roundedCircle
                        className="mb-3"
                        width="150"
                        height="150"
                        alt="Текущий аватар"
                    />
                    {preview && (
                        <>
                            <h5>Новый аватар (предпросмотр)</h5>
                            <Image
                                src={preview}
                                roundedCircle
                                className="mb-3"
                                width="150"
                                height="150"
                                alt="Новый аватар"
                            />
                        </>
                    )}
                    <Form.Group>
                        <Form.Label>Загрузите новый аватар</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpload}
                        disabled={!selectedFile}
                    >
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    export default UploadAvatarModal;
