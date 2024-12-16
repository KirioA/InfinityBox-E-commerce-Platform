<h1 align = center>📦 InfinityBox E-commerce Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**InfinityBox** — это современная платформа электронной коммерции, разработанная для удобной покупки товаров в интернете.
---
## 🚀 Функционал проекта
- 📋 **Регистрация и авторизация** пользователей.  
- 🛒 **Корзина покупок** с возможностью добавления и удаления товаров.  
- 🛍️ **Каталог товаров** с фильтрацией и сортировкой.  
- 💳 **Оформление заказов** с учётом доставки.  
- 👤 **Личный кабинет** для редактирования профиля пользователя.  
- 🛠️ **Админ-панель** для управления товарами и пользователями.  
- 🌙 **Переключение тем** (светлая/тёмная тема).  
---
## 🛠️ Стек технологий
### Frontend:
- **React** + **Vite**  
- **TypeScript**  
- **React Bootstrap**  
- **Redux Toolkit**  
- **Framer Motion** (анимации)
### Backend:
- **Node.js** + **Express**  
- **TypeScript**  
- **MongoDB** (база данных)  
- **Mongoose**  
- **JWT** (JSON Web Tokens для авторизации)  
---
## 📥 Установка и запуск проекта
1. **Склонируйте репозиторий:**
   ```bash
   git clone https://github.com/KirioA/InfinityBox-E-commerce-Platform.git
   cd InfinityBox-E-commerce-Platform
   ```
2. **Установите зависимости:**
   - Для фронтенда:
     ```bash
     cd client
     npm install
     ```
   - Для бэкенда:
     ```bash
     cd server
     npm install
     ```
3. **Запуск проекта:**
   - Фронтенд:
     ```bash
     cd client
     npm run dev
     ```
   - Бэкенд:
     ```bash
     cd server
     npm start
     ```
4. **Откройте приложение в браузере:**  
   Перейдите по адресу: `http://localhost:5173`  
---
## 📝 Структура проекта
```bash
InfinityBox-E-commerce-Platform/
│
├── client/              # Фронтенд-приложение (React + Vite)
│   ├── src/
│   │   ├── components/  # Переиспользуемые компоненты
│   │   ├── hooks/       # Пользовательские хуки
│   │   ├── pages/       # Страницы приложения
│   │   ├── redux/       # Состояние приложения (Redux Toolkit)
│   │   ├── styles/      # Стили и темы
│   │   └── main.tsx     # Точка входа
│   │
│   └── index.html       # Главный HTML-файл
│
├── server/              # Бэкенд (Node.js + Express)
│   ├── src/
│   │   ├── controllers/ # Логика работы с данными
│   │   ├── models/      # Модели MongoDB
│   │   ├── routes/      # Маршруты API
│   │   ├── middleware/  # JWT и другие middleware
│   │   └── server.ts    # Точка входа для сервера
│
├── .gitignore           # Игнорируемые файлы
├── package.json         # Информация о проекте
└── README.md            # Описание проекта
```
---
## 🔗 Ссылки
- **Репозиторий:** [GitHub](https://github.com/KirioA/InfinityBox-E-commerce-Platform)  
---
## 🤝 Контрибьютинг
Буду рад вашим предложениям и улучшениям. Открывайте **issue** или делайте **pull request**! 😊  
---
## 📄 Лицензия
Этот проект распространяется под лицензией **MIT**.
