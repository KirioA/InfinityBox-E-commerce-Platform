import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchProducts, addProduct } from '../slices/productSlice';
import { RootState, AppDispatch } from '../redux/store.ts';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

const CatalogPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading, error } = useSelector((state: RootState) => state.products);
    console.log(products);

    const skeletonItems = Array.from({ length: 3 });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProduct = () => {
        const newProduct = {
            name: 'Новый продукт',
            description: 'Описание нового продукта',
            price: 1234,
            category: 'Категория',
            imageUrl: 'https://example.com/image.jpg',
        };
        dispatch(addProduct(newProduct));
    };

    const styles = {
        pageContainer: {
            color: '#fff',
            marginTop: '20px',
            padding: '0 15px',
            minHeight: '80vh',
        },
        heading: {
            textAlign: 'center' as const,
            fontSize: '35px',
            fontWeight: 'bold',
            color: '#81c784', // Зеленый цвет заголовка
            marginBottom: '40px',
        },
    };

    return (
        <Container style={styles.pageContainer}>
            <h1 className="text-center mb-4" style={styles.heading}>Каталог товаров</h1>
            <div className="mb-4 text-center">
                <Button variant="success" onClick={handleAddProduct}>
                    Добавить новый продукт
                </Button>
            </div>




                <p className="text-danger text-center">{error}</p>

                <Row>
                    {
                        // Добавляем проверку, чтобы убедиться, что products не пустой и что каждый элемент существует

                            products.map(product => (


                                        <ProductCard
                                            id={product._id}
                                            title={product.name}
                                            description={product.description}
                                            price={product.price}
                                            category={product.category}
                                            imageUrl={product.imageUrl}
                                        />


                                ))

                    }



                </Row>

        </Container>
    );
};

export default CatalogPage;
