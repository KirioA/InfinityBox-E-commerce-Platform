import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import '../styles/home.css';

interface BreadcrumbPath {
    name: string;
    path: string;
}

const Home: React.FC = () => {
    return (
        <Container className="home-container">
            {/* Хлебные крошки */}
            <Breadcrumbs paths={[{ name: 'Главная страница', path: '/' }]} />

            {/* Основная информация о магазине */}
            <Row className="mt-5 text-center">
                <Col md={8} className="mx-auto">
                    <h1 className="home-title">Добро пожwdwаловать в наш интернет-магазин!</h1>
                    <p className="home-description">
                        Здесь вы найдете товары на любой вкус. Мы предлагаем только лучшие товары,
                        чтобы сделать ваш выбор простым и приятным.
                    </p>
                    <Link to="/catalog">
                        <Button variant="primary" className="home-button">
                            Перейти в каталог товаров
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Дополнительная информация о компании */}
            <Row className="mt-5">
                <Col>
                    <h2 className="home-about-title">О нас</h2>
                    <p className="home-about-description">
                        Мы — команда профессионалов, стремящихся предоставить вам лучший сервис и качественные товары.
                        Наша цель — удовлетворение потребностей каждого клиента.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
