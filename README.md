# JustBlog - A Basic CRUD web application

This project is a simple blog application built using Node.js, Express.js, EJS, and PostgreSQL. It serves as a demonstration of fundamental backend development skills, database integration, and handling basic CRUD (Create, Read, Update, Delete) operations.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Introduction

JustBlog is a web application that allows users to create, edit, view, and delete blog posts. It includes a contact page where users can send messages. The project focuses on implementing a clean and responsive design, efficient routing with Express.js, EJS templating for rendering dynamic content, and PostgreSQL for managing the blog's data.

## Features

- Create, edit, and delete blog posts
- View all posts on the homepage
- Contact form for users to send messages
- PostgreSQL database integration for storing and managing blog data
- Responsive design with static files served via Express.js
- Environment configuration with dotenv

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **EJS**: Embedded JavaScript templating for rendering views
- **PostgreSQL**: Relational database management system
- **dotenv**: For managing environment variables

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node package manager)
- **PostgreSQL** (version 12 or higher)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/routh-vishal/JustBlog.git
   cd JustBlog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory by copying the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Fill in the `.env` file with your database credentials and other configurations.

## Database Setup

1. **Create a PostgreSQL database**:
   ```bash
   createdb -U your_username blog_db
   ```

2. **Set up the database schema**:
   - Use the provided SQL scripts to create the necessary tables and relationships in your database.
     ```bash
     psql -U your_username -d blog_db -f schema.sql
     ```
## Running the Application

1. **Start the server**:
   ```bash
   node index.js
   ```

2. **Access the application**:
   - Open your web browser and go to `http://localhost:3000`.

## Project Structure

```plaintext
├── public/             # Static files (CSS, images)
├── views/              # EJS templates
├── .env.example        # Example environment variables
├── .gitignore          # Ignoring unnecessary files (like node_modules, .env)
├── schema.sql          # SQL file for database setup
├── index.js            # Main server file
├── package.json        # Node.js dependencies and scripts
└── README.md           # Instructions and project overview
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure your code follows the existing style and includes clear commit messages.

---
