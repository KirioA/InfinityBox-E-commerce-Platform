import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../styles/about.css';

const About: React.FC = () => {
    return (
        <Container className="about-page text-white">
            <Row className="my-5">
                <Col md={6}>
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        О компании
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        Добро пожаловать в наш магазин! Мы специализируемся на продаже уникальных подарков,
                        которые подарят улыбку и сделают любой праздник незабываемым.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4 }}
                    >
                        Наша миссия - предлагать лучшие решения для подарков, которые будут радовать ваших близких.
                        Внимание к деталям, стильный дизайн и высокое качество - вот что делает нас особенными.
                    </motion.p>
                </Col>
                <Col md={6}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.6 }}
                    >
                        <Image src="/path/to/about-image.jpg" alt="About Us" fluid rounded />
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
