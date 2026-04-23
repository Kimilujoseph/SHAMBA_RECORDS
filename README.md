# Shamba Records Backend

This repository contains the backend for the Shamba Records application, built with Node.js, Express, TypeScript, and Prisma. It follows a clean architecture pattern to ensure separation of concerns, maintainability, and scalability.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
    - [Using a Database Dump File](#using-a-database-dump-file)
    - [Creating a New Database with Prisma](#creating-a-new-database-with-prisma)
  - [Environment Variables](#environment-variables)
  - [Generating a New Hash Token](#generating-a-new-hash-token)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Prisma Commands](#prisma-commands)

## Project Overview

The Shamba Records Backend provides a robust API for managing agricultural records, users, and related data. It leverages a modern tech stack to deliver a performant and secure service.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **mysql** (or your chosen database system)
- **Git**

## Getting Started

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Kimilujoseph/SHAMBA_RECORDS.git
    cd shamba_records_backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Database Setup

You have two options for setting up your database: using an existing dump file or creating a new one from scratch with Prisma.

#### Using a Database Dump File

If you have a MySQL database dump file (e.g., `shamba_records_dump.sql`), you can restore it using the `mysql` command-line tool.

1.  **Create a new MySQL database and user:**

    ```bash
    # Connect to MySQL as root or a user with privileges to create databases/users
    mysql -u root -p
    # Enter your MySQL root password when prompted

    CREATE DATABASE shamba_records;
    CREATE USER 'shamba_user'@'localhost' IDENTIFIED BY 'your_secure_password';
    GRANT ALL PRIVILEGES ON shamba_records.* TO 'shamba_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```

    Replace `shamba_user` and `your_secure_password` with your desired credentials.

2.  **Restore the dump file:**
    ```bash
    mysql -u shamba_user -p shamba_records < path/to/your/shamba_records_dump.sql
    # Enter the password for 'shamba_user' when prompted
    ```
    Make sure to update the path to your dump file and the database connection details as needed.

#### Creating a New Database with Prisma

If you prefer to start with a fresh database and apply migrations using Prisma:

1.  **Ensure your database server is running.**
2.  **Configure your `.env` file** (see [Environment Variables](#environment-variables) section below) with your database connection string, e.g., `DATABASE_URL="mysql://shamba_user:your_secure_password@localhost:3306/shamba_records"`.
3.  **Run Prisma migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```
    This command will apply any pending migrations defined in `prisma/schema.prisma` to your database.

### Environment Variables

Create a `.env` file in the root of the project directory. This file will store sensitive configuration details. Refer to the `infrastructure/config/env.ts` for expected environment variables.

Here's an illustration of a typical `.env` file:

```
# Application Port
PORT=3000

# Database Connection String
DATABASE_URL="mysql://shamba_user:your_secure_password@localhost:3306/shamba_records"

# JWT Secret for authentication
JWT_SECRET="your_very_long_and_secure_jwt_secret_here"

# JWT Expiration Time (e.g., 1h, 7d, 30m)
JWT_EXPIRES_IN="1d"

# Node Environment (development, production, test)
NODE_ENV=development
```

### Generating a New Hash Token

For your `JWT_SECRET`, it's crucial to use a strong, randomly generated string. You can generate one using Node.js in your terminal:

1.  Open your terminal.
2.  Type `node` and press Enter to enter the Node.js REPL.
3.  Paste the following command and press Enter:
    ```javascript
    require("crypto").randomBytes(64).toString("hex");
    ```
4.  Copy the output string and paste it as the value for `JWT_SECRET` in your `.env` file.
5.  Type `.exit` or press `Ctrl+D` to exit the Node.js REPL.

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically run on `http://localhost:3000` (or the `PORT` specified in your `.env` file).

## Project Structure

The project follows a modular and layered architecture, emphasizing separation of concerns:

```
src/
├───application/      # Business logic, DTOs, interfaces for services, and application services
│   ├───dtos/         # Data Transfer Objects for input/output data
│   ├───interfaces/   # TypeScript interfaces for services and repositories (abstractions)
│   └───services/     # Concrete implementations of application-specific business logic
├───domain/           # Core business entities, value objects, enums, and business rules
│   ├───enums/        # Enumerations used across the domain
│   └───logic/        # Domain-specific business logic and rules
├───infrastructure/   # External concerns like database, auth, config, and repository implementations
│   ├───auth/         # Authentication services (JWT, password hashing)
│   ├───config/       # Environment variable loading and configuration
│   ├───database/     # Database client and Prisma setup
│   └───repositories/ # Concrete implementations of repository interfaces
├───presentation/     # API layer: controllers, routes, middleware, and validation
│   ├───controllers/  # Handle HTTP requests, delegate to application services
│   ├───middleware/   # Express middleware for authentication, authorization, error handling
│   ├───routes/       # Defines API endpoints and links them to controllers
│   └───validators/   # Request body validation schemas
├───shared/           # Common utilities, error handling, and type definitions
│   ├───errors/       # Custom error classes
│   ├───types/        # Global TypeScript type definitions
│   └───utils/        # General utility functions (e.g., logger)
├───app.ts            # Main Express application setup
└───server.ts         # Entry point for starting the HTTP server
```

**Separation of Concerns:**

- **`domain`**: Contains the enterprise-wide business rules and core logic that are independent of the application or infrastructure.
- **`application`**: Orchestrates domain objects to fulfill use cases. It defines interfaces that the infrastructure layer must implement.
- **`infrastructure`**: Provides concrete implementations for interfaces defined in the application layer and handles external concerns (database, file system, external APIs).
- **`presentation`**: Deals with how the application presents itself to the outside world (e.g., REST API endpoints, request/response handling).
- **`shared`**: Houses cross-cutting concerns that don't fit neatly into other layers.

## Prisma Commands

Prisma is used as the ORM for database interaction. Here are some commonly used Prisma CLI commands:

- **Generate Prisma Client:**

  ```bash
  npx prisma generate
  ```

  This generates the Prisma Client, which is used to interact with your database. Run this after modifying `prisma/schema.prisma` or installing Prisma.

- **Apply pending migrations and generate client:**

  ```bash
  npx prisma migrate dev
  ```

  This command creates a new migration if there are changes in your `schema.prisma` and applies all pending migrations to the database. It also generates the Prisma Client.

- **Push the current schema state to the database (for development without migrations):**

  ```bash
  npx prisma db push
  ```

  Use this for quick iterations in development when you don't need to preserve existing data or create migrations. **Not recommended for production.**

- **Open Prisma Studio (a visual database browser):**

  ```bash
  npx prisma studio
  ```

  This opens a web-based UI to view and edit your database data.

- **Format your `schema.prisma` file:**

  ```bash
  npx prisma format
  ```

  Ensures consistent formatting for your Prisma schema file.

- **Validate your `schema.prisma` file:**
  ```bash
  npx prisma validate
  ```
  Checks for errors in your Prisma schema file.
