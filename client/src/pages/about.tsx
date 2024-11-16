import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import '../styles/about.css';

const About: React.FC = () => {
    return (
        <Container className="about-page text-white">
            <Row className="my-5">
                <Col md={6}>
                    <h1>О компании</h1>
                    <p>
                        Добро пожаловать в наш магазин! Мы специализируемся на продаже уникальных подарков,
                        которые подарят улыбку и сделают любой праздник незабываемым.
                    </p>
                    <p>
                        Наша миссия - предлагать лучшие решения для подарков, которые будут радовать ваших близких.
                        Внимание к деталям, стильный дизайн и высокое качество - вот что делает нас особенными.
                    </p>
                </Col>
                <Col md={6}>
                    <Image src="/path/to/about-image.jpg" alt="About Us" fluid rounded />
                </Col>
            </Row>
        </Container>
    );
};

export default About;
