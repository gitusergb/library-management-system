

# Library Management System with Audit Logging

Welcome to the Library Management System with Audit Logging! This project provides a backend API built using Node.js, Express.js, and MongoDB, along with a simple frontend interface to manage books, authors, and users, including borrowing and returning books. It also features an audit logging system to track user actions with timestamps and filtering options.

<!-- - first assignment :https://f32jw4.csb.app/
https://codesandbox.io/p/sandbox/color-picker-f32jw4 -->

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

- **Books**:
  - `GET /books`: Retrieve all books.
  - `GET /books/:id`: Retrieve a single book by ID.
  - `POST /books`: Create a new book.
  - `PUT /books/:id`: Update an existing book.
  - `DELETE /books/:id`: Delete a book.

- **Users**:
  - `GET /users`: Retrieve all users.
  - `GET /users/:id`: Retrieve a single user by ID.
  - `POST /users`: Create a new user.
  - `PUT /users/:id`: Update an existing user.
  - `DELETE /users/:id`: Delete a user.

- **Borrowing/Returning**:
  - `POST /borrow`: Borrow a book.
  - `POST /return`: Return a book.

- **Audit Logs**:
  - `GET /audit-logs`: Retrieve all audit logs with filtering options.

## Frontend Interface

The frontend showcases books in a visually appealing bookshelf format. Books are fetched from the backend API and dynamically added to the shelf using JavaScript.

## Audit Logging

The audit logging system tracks all user actions such as borrowing and returning books. Each log includes a timestamp and can be filtered by user, action type, or date range.



## Render Link
 [Link](https://#).


## Contributor
- **Gauri Bidwai**


