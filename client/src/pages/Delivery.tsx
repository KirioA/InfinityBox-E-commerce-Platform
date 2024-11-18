import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/delivery.css';

const Delivery: React.FC = () => {
    return (
        <Container className="delivery-page text-white">
            <h1 className="my-5">Доставка и оплата</h1>
            <Row>
                <Col md={6}>
                    <h5>Условия доставки</h5>
                    <p>Мы осуществляем доставку по всей Беларуси и СНГ.</p>
                    <p>Срок доставки: 2-5 рабочих дней.</p>
                    <p>Бесплатная доставка при заказе от 200 руб.</p>
                </Col>
                <Col md={6}>
                    <h5>Способы оплаты</h5>
                    <p>Мы принимаем следующие способы оплаты:</p>
                    <ul>
                        <li>Банковские карты (Visa, MasterCard, Мир)</li>
                        <li>Онлайн-платежи (Яндекс.Деньги, Qiwi)</li>
                        <li>Наличные при получении</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Delivery;
    