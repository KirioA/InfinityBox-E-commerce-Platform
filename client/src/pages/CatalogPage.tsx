import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Form,
    Dropdown,
    InputGroup,
    Button,
    Accordion,
    Toast,
    Offcanvas
} from 'react-bootstrap';
import {
    SearchIcon,
    FilterIcon,
    ChevronDownIcon,
    StarIcon,
    XIcon
} from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {fetchActiveProducts, fetchProducts} from '../slices/productSlice';
import { RootState, AppDispatch } from '../redux/store';
import ProductCard from '../components/ProductCard';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    rating: number;
}

const CatalogPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    // State for filtering and searching
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Все категории');
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'newest'>('newest');
    const [showToast, setShowToast] = useState(false);

    // Mobile filter state
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Get unique categories and brands
    const categories = useMemo(() => {
        return ['Все категории', ...new Set(products.map(p => p.category))];
    }, [products]);

    const brands = useMemo(() => {
        return [...new Set(products.map(p => p.brand))];
    }, [products]);

    // Filtered and sorted products
    const processedProducts = useMemo(() => {
        let filteredProducts = products.filter(product =>
            // Status filter
            product.status === 'active' &&
            // Search filter
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            // Category filter
            (selectedCategory === 'Все категории' || product.category === selectedCategory) &&
            // Price range filter
            product.price >= priceRange.min &&
            product.price <= priceRange.max
        );

        // Sorting
        switch (sortBy) {
            case 'price-asc':
                return filteredProducts.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return filteredProducts.sort((a, b) => b.price - a.price);
            case 'rating':
                return filteredProducts.sort((a, b) => b.rating - a.rating);
            default:
                return filteredProducts;
        }
    }, [products, searchTerm, selectedCategory, priceRange, selectedBrands, minRating, sortBy]);

    // Styles with green color palette
    const styles = {
        pageContainer: {
            minHeight: '100vh',
            padding: '2rem 0',
        },
        heading: {
            color: '#2E7D32',
            fontWeight: 700,
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        filterInput: {
            borderColor: '#4CAF50',
        }
    };

    // Toggle brand selection
    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('Все категории');
        setPriceRange({ min: 0, max: Infinity });
        setSelectedBrands([]);
        setMinRating(0);
        setSortBy('newest');
    };

    // Render filter content (reusable for both desktop and mobile)
    const renderFilterContent = () => (
        <>
            {/* Search */}
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <SearchIcon size={20} color="#4CAF50" />
                </InputGroup.Text>
                <Form.Control
                    placeholder="Поиск товаров..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.filterInput}
                />
            </InputGroup>

            {/* Аккордеон для фильтров */}
            <Accordion defaultActiveKey="0" flush>
                {/* Категории */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Категории</Accordion.Header>
                    <Accordion.Body>
                        {categories.filter(c => c !== 'Все категории').map((category) => (
                            <Form.Check
                                key={category}
                                type="radio"
                                label={category}
                                name="category"
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                                className="mb-2"
                            />
                        ))}
                        <Form.Check
                            type="radio"
                            label="Все категории"
                            name="category"
                            checked={selectedCategory === 'Все категории'}
                            onChange={() => setSelectedCategory('Все категории')}
                        />
                    </Accordion.Body>
                </Accordion.Item>

                {/* Цена */}
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Цена</Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex mb-3">
                            <Form.Control
                                type="number"
                                placeholder="От"
                                value={priceRange.min || ''}
                                onChange={(e) => setPriceRange(prev => ({
                                    ...prev,
                                    min: e.target.value ? Number(e.target.value) : 0
                                }))}
                                className="me-2"
                                style={styles.filterInput}
                            />
                            <Form.Control
                                type="number"
                                placeholder="До"
                                value={priceRange.max === Infinity ? '' : priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({
                                    ...prev,
                                    max: e.target.value ? Number(e.target.value) : Infinity
                                }))}
                                style={styles.filterInput}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                {/* Бренды */}
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Бренды</Accordion.Header>
                    <Accordion.Body>
                        {brands.map((brand) => (
                            <Form.Check
                                key={brand}
                                type="checkbox"
                                label={brand}
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandToggle(brand)}
                                className="mb-2"
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                {/* Рейтинг */}
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Рейтинг</Accordion.Header>
                    <Accordion.Body>
                        {[4, 3, 2, 1].map((rating) => (
                            <Form.Check
                                key={rating}
                                type="radio"
                                label={
                                    <div className="d-flex align-items-center">
                                        {[...Array(rating)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                size={16}
                                                color="#FFD700"
                                                fill="#FFD700"
                                            />
                                        ))}
                                        {[...Array(5 - rating)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                size={16}
                                                color="#E0E0E0"
                                            />
                                        ))}
                                        <span className="ms-2">и выше</span>
                                    </div>
                                }
                                name="rating"
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                                className="mb-2"
                            />
                        ))}
                    </Accordion.Body>
                </Accordion.Item>

                {/* Сортировка */}
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Сортировка</Accordion.Header>
                    <Accordion.Body>
                        <Form.Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="newest">Новизна</option>
                            <option value="price-asc">Цена: от низкой к высокой</option>
                            <option value="price-desc">Цена: от высокой к низкой</option>
                            <option value="rating">По рейтингу</option>
                        </Form.Select>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {/* Кнопка сброса фильтров */}
            <Button
                variant="outline-secondary"
                className="w-100 mt-3"
                onClick={resetFilters}
            >
                Сбросить фильтры
            </Button>
        </>
    );

    return (
        <Container fluid style={styles.pageContainer}>
            <Container>
                <h1 className="text-center mb-4" style={styles.heading}>
                    Каталог товаров
                </h1>

                {/* Mobile Filter Button - Only visible on smaller screens */}
                <div className="d-md-none mb-3">
                    <Button
                        variant="outline-primary"
                        onClick={() => setShowMobileFilter(true)}
                        className="w-100"
                    >
                        <FilterIcon size={20} className="me-2" />
                        Фильтры
                    </Button>
                </div>

                <Row>
                    {/* Desktop Sidebar Filters - Hidden on smaller screens */}
                    <Col
                        md={3}
                        className="d-none d-md-block"
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            position: 'sticky',
                            top: '20px',
                            height: 'fit-content'
                        }}
                    >
                        <h5 className="mb-3 d-flex align-items-center">
                            <FilterIcon size={20} className="me-2" />
                            Фильтры
                        </h5>
                        {renderFilterContent()}
                    </Col>

                    {/* Mobile Filter Offcanvas */}
                    <Offcanvas
                        show={showMobileFilter}
                        onHide={() => setShowMobileFilter(false)}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                <FilterIcon size={20} className="me-2" />
                                Фильтры
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {renderFilterContent()}
                        </Offcanvas.Body>
                    </Offcanvas>

                    {/* Product Grid */}
                    <Col md={9}>
                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <Row>
                                {[...Array(6)].map((_, index) => (
                                    <Col key={index} md={4} className="mb-4">
                                        <Skeleton height={350} borderRadius={12} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <>
                                {processedProducts.length === 0 ? (
                                    <div className="text-center text-muted py-5">
                                        Товаров не найдено
                                    </div>
                                ) : (
                                    <Row>
                                        {processedProducts.map((product) => (
                                            <Col key={product._id} xs={6} md={4} className="mb-4">
                                                <ProductCard
                                                    id={product.id}
                                                    title={product.name}
                                                    description={product.description}
                                                    price={product.price}
                                                    category={product.category}
                                                    imageUrl={product.imageUrl}
                                                    rating={product.rating}
                                                    brand={product.brand}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </>
                        )}
                    </Col>
                </Row>

                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 9999,
                        maxWidth: '300px',
                    }}
                >
                    <Toast.Body>Товар успешно добавлен в корзину!</Toast.Body>
                </Toast>
            </Container>
        </Container>
    );
};

export default CatalogPage;