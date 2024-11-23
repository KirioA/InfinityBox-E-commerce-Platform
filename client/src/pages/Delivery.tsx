import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaShippingFast, FaCreditCard, FaWallet, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';  // Импортируем контекст темы

const Delivery: React.FC = () => {
    const { theme } = useTheme(); // Используем контекст для получения текущей темы

    // Стили, зависящие от текущей темы
    const styles = {
        pageContainer: {
            color: theme === 'light' ? '#000000' : '#ffffff',
            padding: '40px',
        },
        heading1: {
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            textAlign: 'center',
            marginBottom: '40px',
        },
        heading5: {
            color: '#81c784',
        },
        text: {
            color: theme === 'light' ? '#000000' : '#ffffff',
        },
        listItem: {
            color: theme === 'light' ? '#000000' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        accordionHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: theme === 'light' ? '#333333' : '#ffffff', // Для темной темы цвет текста будет белым
        },
        accordionBody: {
            color: theme === 'light' ? '#000000' : '#ffffff',
            backgroundColor: theme === 'light' ? '#f9f9f9' : '#444444', // Фон для тела аккордеона
            padding: '10px',
            borderRadius: '10px',
        },
        card: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
            color: theme === 'light' ? '#000000' : '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(119, 119, 119, 0.7)',
            width: '100%',
            maxWidth: '500px',
            padding: '20px',
            margin: 'auto',
        },
    };

    return (
        <Container style={styles.pageContainer}>
            <motion.h1
                className="my-5 text-center"
                style={styles.heading1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Доставка и оплата
            </motion.h1>

            <Row>
                <Col md={12} className="mb-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                    >
                        <h5 style={styles.heading5}>Общие условия доставки</h5>
                        <p style={styles.text}>
                            Мы обеспечиваем доставку по всей территории Беларуси и СНГ. Доставка
                            осуществляется с помощью проверенных партнеров, таких как Белпочта,
                            СДЭК, и многие другие. Время доставки зависит от региона и выбранного
                            метода доставки.
                        </p>
                    </motion.div>
                </Col>
            </Row>

            <Row>
                <Col md={6} className="mb-4">
                    <motion.div
                        style={styles.card}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                    >
                        <h5 style={styles.heading5}>Методы доставки</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={styles.listItem}>
                                <FaShippingFast /> Стандартная доставка: 2-5 рабочих дней.
                            </li>
                            <li style={styles.listItem}>
                                <FaShippingFast /> Экспресс доставка: 1-2 рабочих дня.
                            </li>
                            <li style={styles.listItem}>
                                <FaShippingFast /> Самовывоз: можно забрать товар в нашем офисе.
                            </li>
                        </ul>
                    </motion.div>
                </Col>

                <Col md={6} className="mb-4">
                    <motion.div
                        style={styles.card}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.6 }}
                    >
                        <h5 style={styles.heading5}>Методы оплаты</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={styles.listItem}>
                                <FaCreditCard /> Банковские карты (Visa, MasterCard, Мир).
                            </li>
                            <li style={styles.listItem}>
                                <FaWallet /> Онлайн-платежи (Яндекс.Деньги, Qiwi, WebMoney).
                            </li>
                            <li style={styles.listItem}>
                                <FaWallet /> Наличные при получении.
                            </li>
                        </ul>
                    </motion.div>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.8 }}
                    >
                        <h5 style={styles.heading5}>Дополнительная информация</h5>
                        <p style={styles.text}>
                            Мы заботимся о безопасности наших клиентов, поэтому все наши партнеры
                            по доставке имеют высокие рейтинги и проверенные процессы. В случае
                            возникновения каких-либо проблем с доставкой, наша служба поддержки
                            всегда готова помочь вам решить любую ситуацию.
                        </p>
                        <p style={styles.text}>
                            Также мы предлагаем гибкие условия по возврату товаров в течение 14
                            дней с момента получения товара.
                        </p>
                    </motion.div>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <h5 style={styles.heading5}>Часто задаваемые вопросы</h5>
                        <Accordion>
                            {Array.from({ length: 10 }, (_, index) => (
                                <Accordion.Item eventKey={String(index)} key={index}>
                                    <Accordion.Header style={styles.accordionHeader}>
                                        <div>
                                            <FaInfoCircle /> Вопрос {index + 1}
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body style={styles.accordionBody}>
                                        Ответ на вопрос {index + 1}. Это пример текста, который
                                        может быть полезен для этого вопроса.
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default Delivery;
