

# Library Management System with Audit Logging

Welcome to the Library Management System! This project provides a backend API built using Node.js, Express.js, and MongoDB, along with a simple frontend interface to manage books, authors, and users, including borrowing and returning books. It also features an audit logging system to track user actions with timestamps and filtering options.

**Live API Link**: [Library Management System](https://library-management-system-ouul.onrender.com/)

<!-- - first assignment :https://codesandbox.io/p/sandbox/color-picker-front-rtyqxw
 -->

## Screenshots


| Home Page       | Details Page |
|-----------------|---------------------|
| ![Home Page](https://i.ibb.co/RBxrpNn/bms.png) | ![Movies DB](https://i.ibb.co/2Nv3RX4/books.png) |


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Interface](#frontend-interface)
- [Audit Logging](#audit-logging)
- [Contributor](#contributor)


## Features

- **CRUD Operations**: Manage books, authors, and users.
- **Borrowing/Returning**: Borrow and return books with constraints such as maximum borrow limits and due dates.
- **Audit Logging**: Track user actions (borrowing, returning) with timestamped records and filtering capabilities.
- **Dependency Injection**: Implemented for database interactions, audit logging, and borrowing logic.
- **Authentication and Authorization**: Protect specific API endpoints.
- **Beautiful Frontend Interface**: A clean, responsive interface to showcase books in a bookshelf format.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/gitusergb/library-management-system.git
   cd library-management-system
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Created a `.env` file in the root directory for MongoDB connection string:

   ```
   MONGODB_URI=mongodb://*******
   ```

### Running the Application

   
1. **Run the application**:

   ```
   npm start
   ```

3. **Access the frontend**:
   Open browser and go to `http://localhost:4000` to view the bookshelf interface.

## API Endpoints

- **Public**: `https://library-management-system-ouul.onrender.com/`

- **Books**:
  
- #### **Get All Books**
- **Method**: `GET`
- **Endpoint**: `https://library-management-system-ouul.onrender.com/books`
- **Description**: Retrieves a list of all books.
- **Status Codes**:
  - `200 OK`: Successfully retrieved all books.
  - `500 Internal Server Error`: Server encountered an error.

- #### **Create a New Book**
- **Method**: `POST`
- **Endpoint**: `https://library-management-system-ouul.onrender.com/books/addbook`
- **Description**: Creates a new book in the library [role : admin /author].
- **Authorization**:Bearer ***token***
- **Request Body**:

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "ISBN": "ISBN Number",
    "description": "Book Description",
    "publishedDate": "YYYY-MM-DD",
      "category": "type",
      "price": 12345,
      "quantity": 100
  }
  ```
  
- **Status Codes**:
  - `201 Created`: Successfully created a new book.
  - `400 Bad Request`: Missing or invalid fields/Book with same ISBN already found
  - `500 Internal Server Error`: Server encountered an error.

  
- `GET https://library-management-system-ouul.onrender.com/books/:bookID`: Retrieve a single book by ID.
 `GET https://library-management-system-ouul.onrender.com/books/:bookIsbn`: Retrieve a single book by Isbn.
  - `PATCH https://library-management-system-ouul.onrender.com/books/:bookID`: Update an existing book.
  - `DELETE https://library-management-system-ouul.onrender.com/books/:bookID`: Delete a book.

- **Users**:
#### **Get All Users**
- **Method**: `GET`
- **Endpoint**: `https://library-management-system-ouul.onrender.com/users/`
- **Description**: Retrieves a list of all users.[role: only for admin]
- **Authorization**:Bearer ***token***
- **Status Codes**:
  - `200 OK`: Successfully retrieved all users.
  - `500 Internal Server Error`: Server encountered an error.

#### **Register and Login a New User**
- **Method**: `POST`
- **Endpoint**: `https://library-management-system-ouul.onrender.com/users/register` 
   
- **Description**: Registers a new user to the library system.
- **Request Body**:
  ```json
  {
    "username": "User Name",
    "email":"abc@gmail.com",
    "password": "Password",
    "role": "user" // or "admin"/"author"
  }
  ```
  - **Login**
  - **Method**: `POST`
- **Endpoint**: `https://library-management-system-ouul.onrender.com/users/login` 
   
- **Description**: Registers a new user to the library system.
- **Request Body**:
  ```json
  {
    "email":"abc@gmail.com",
    "password": "Password",
    "role": "user" // or "admin"/"author"
  }
  ```

- **Status Codes**:
  - `200 Created`: "msg": "The new user has been registered"/"msg": "Login successful!"and **token**.
  - `400 Bad Request`: Missing or invalid fields.
  - `500 Internal Server Error`: Server encountered an error.


  - `GET https://library-management-system-ouul.onrender.com/users/`: Retrieve all users with authorization if you are admin .

  - `GET https://library-management-system-ouul.onrender.com/users/profile`: See your profile.


- **Borrowing/Returning**:
  - `GET https://library-management-system-ouul.onrender.com/users/profile`: Borrowed book.
  - `POST https://library-management-system-ouul.onrender.com/users/return`: Return book.

- **Audit Logs**:
  - `GET https://library-management-system-ouul.onrender.com/users/audit-logs/`: Retrieve all audit logs.

## Frontend Interface

The frontend showcases books in a visually appealing bookshelf format. Books are fetched from the backend API and dynamically added to the shelf using JavaScript.

## Audit Logging

The audit logging system tracks all user actions such as borrowing and returning books. Each log includes a timestamp and can be filtered by user, action type, or date range.



## Render Link
 [Link](https://library-management-system-ouul.onrender.com/).


## Contributor
- **Gauri Bidwai**


