# 🛒 ShopSphere – Full Stack E-Commerce Platform

ShopSphere is a full-stack e-commerce web application built to provide a simple and user-friendly online shopping experience. It includes product browsing, authentication, shopping cart, wishlist, order management, and an admin dashboard.

The project uses React for the frontend and Python Django REST Framework for backend API development.

## 🚀 Features

### Customer Features
- User registration and login
- JWT-based authentication
- Browse and search products
- Product details and categories
- Product filtering and sorting
- Shopping cart management
- Wishlist management
- Customer profile management
- Product reviews and ratings
- Checkout interface
- Order history and order details

### Admin Features
- Admin dashboard
- Product management
- Add, update, and delete products
- Order management interface
- Customer management interface
- Admin-only access control

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Python
- Django
- Django REST Framework
- Django REST Framework Simple JWT

### Database
- SQLite

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- npm

## 📁 Project Structure

```text
ShopSphere/
│
├── backend/
│   ├── accounts/
│   ├── products/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── public/
│
├── src/
│   ├── AuthContext/
│   ├── CartContext/
│   ├── ProductContext/
│   ├── ReviewContext/
│   ├── admin/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kasulujalasutram/ShopSphere-Full-Stack-E-commerce-Project.git
```

### 2. Navigate to the Project

```bash
cd ShopSphere-Full-Stack-E-commerce-Project
```

### 3. Frontend Setup

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173/
```

### 4. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Create an admin account:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | User registration |
| POST | `/api/auth/login/` | User login |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |
| GET | `/api/auth/profile/` | Get user profile |
| PATCH | `/api/auth/profile/` | Update user profile |
| GET | `/api/products/` | Retrieve products |
| GET | `/api/categories/` | Retrieve categories |

## 🔐 Authentication

ShopSphere uses JSON Web Token (JWT) authentication through Django REST Framework Simple JWT.

- Access token authentication
- Refresh token support
- Protected customer routes
- Admin-only route protection

## 📌 Project Goals

- Build a full-stack e-commerce application.
- Understand frontend and backend integration.
- Develop REST APIs using Django REST Framework.
- Implement user authentication and authorization.
- Practice database operations and CRUD functionality.
- Build practical experience with React and Django.

## 👨‍💻 Developer

**Kasulu Jalasutram**

B.Tech – Computer Science and Engineering

GitHub: [@kasulujalasutram](https://github.com/kasulujalasutram)

---

⭐ If you find this project useful, consider giving it a star!
