import axios from 'axios';

// Устанавливаем базовый URL для всех запросов
axios.defaults.baseURL = 'http://localhost:3000';

// Дополнительные настройки, если необходимо (например, таймаут)
axios.defaults.timeout = 10000; // Устанавливаем таймаут на 10 секунд

export default axios;
