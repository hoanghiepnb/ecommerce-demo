# 🛒 E-commerce Backend APIs & Implementation Summary

## 1. 📌 List of Important APIs for E-commerce System

### 🔐 Authentication & Authorization
- `POST /api/auth/signin`: Sign in (supports Google, Zalo, etc.)
- `POST /api/auth/signup`: Register an account
- `POST /api/auth/logout`: Log out
- `GET /api/auth/session`: Get the currently logged-in user info

### 👤 User Management
- `GET /api/user/me`: Get the current user profile
- `PUT /api/user`: Update user profile information

### 🛍️ Product APIs
- `GET /api/products`: Fetch product list (with pagination, filtering, and search)
- `GET /api/products/:id`: Get product details
- `POST /api/products`: (admin) Create a new product
- `PUT /api/products/:id`: (admin) Update product details
- `DELETE /api/products/:id`: (admin) Delete a product

### 🛒 Cart APIs
- `GET /api/cart`: Get the current user's cart
- `POST /api/cart/add`: Add an item to the cart
- `PUT /api/cart/update`: Update item quantity in the cart
- `DELETE /api/cart/remove`: Remove item from the cart

### 📦 Order APIs
- `POST /api/orders`: Create an order (after payment)
- `GET /api/orders`: View order history for the user
- `GET /api/orders/:id`: View order details
- `POST /api/orders/:id/cancel`: Cancel an order (if not yet shipped)

### 💳 Stripe Payment APIs
- `POST /api/checkout`: Create a Stripe Checkout Session
- `GET /api/checkout/session?session_id=...`: Handle Stripe callback & store order

---

## 2. ✅ Implemented Features

Below are the completed and tested features:

### ✔️ Authentication
- Login via **Google** (OAuth)
- Login via **Zalo** (OAuth2 + PKCE)
- Logout
- Retrieve session info

### ✔️ User Profile
- Display and update user information

### ✔️ Cart & Checkout Flow
- Add items to the cart
- Create Stripe Checkout Session (`POST /api/checkout`)
- Redirect to Stripe for payment
- Handle `success_url` with `session_id`
- Fetch session info from Stripe via `GET /api/checkout/session`
- Store order info in MongoDB

### ✔️ Order History
- View all orders placed by the user (`GET /api/orders`)
- View detailed order information (`GET /api/orders/:id`)

---
