import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaShippingFast, FaCreditCard, FaWallet, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Для анимации
import '../styles/delivery.css';

const Delivery: React.FC = () => {
    return (
        <Container className="delivery-page text-white">
            <motion.h1
                className="my-5 text-center"
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
                        <h5>Общие условия доставки</h5>
                        <p>Мы обеспечиваем доставку по всей территории Беларуси и СНГ. Доставка осуществляется с помощью проверенных партнеров, таких как Белпочта, СДЭК, и многие другие. Время доставки зависит от региона и выбранного метода доставки.</p>
                    </motion.div>
                </Col>
            </Row>

            <Row>
                <Col md={6} className="mb-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4 }}
                    >
                        <h5>Методы доставки</h5>
                        <ul className="list-unstyled">
                            <li><FaShippingFast /> Стандартная доставка: 2-5 рабочих дней.</li>
                            <li><FaShippingFast /> Экспресс доставка: 1-2 рабочих дня.</li>
                            <li><FaShippingFast /> Самовывоз: можно забрать товар в нашем офисе.</li>
                        </ul>
                    </motion.div>
                </Col>

                <Col md={6} className="mb-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.6 }}
                    >
                        <h5>Методы оплаты</h5>
                        <ul className="list-unstyled">
                            <li><FaCreditCard /> Банковские карты (Visa, MasterCard, Мир).</li>
                            <li><FaWallet /> Онлайн-платежи (Яндекс.Деньги, Qiwi, WebMoney).</li>
                            <li><FaWallet /> Наличные при получении.</li>
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
                        <h5>Дополнительная информация</h5>
                        <p>Мы заботимся о безопасности наших клиентов, поэтому все наши партнеры по доставке имеют высокие рейтинги и проверенные процессы. В случае возникновения каких-либо проблем с доставкой, наша служба поддержки всегда готова помочь вам решить любую ситуацию.</p>
                        <p>Также мы предлагаем гибкие условия по возврату товаров в течение 14 дней с момента получения товара.</p>
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
                        <h5>Часто задаваемые вопросы</h5>
                        <Accordion>
                            {Array.from({ length: 10 }, (_, index) => (
                                <Accordion.Item eventKey={String(index)} key={index}>
                                    <Accordion.Header>
                                        <FaInfoCircle /> Вопрос {index + 1}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        Ответ на вопрос {index + 1}. Это пример текста, который может быть полезен для этого вопроса.
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
