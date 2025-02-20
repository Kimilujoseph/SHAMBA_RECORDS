# Typescript Three-Layer Application

This is a TypeScript-based application following a three-layer architecture: **API Layer**, **Services Layer**, and **Repository Layer**. The application uses Prisma as the ORM for database interactions.

## Project Structure

project-root/
├── api/
│ ├── controllers/ # Contains controllers to handle HTTP requests
│ └── routers/ # Defines routes for the application
├── services/ # Contains business logic
├── repository/ # Handles database operations using Prisma
├── prisma/ # Prisma schema and migrations
├── .env,.env.production # Environment variables
├── package.json # Node.js dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

## Layers Overview

### 1. API Layer

- **Controllers**: Handle incoming HTTP requests, validate input, and send responses.
- **Routers**: Define the API endpoints and map them to the appropriate controllers.

### 2. Services Layer

- Contains the core business logic of the application.
- Interacts with the Repository Layer to fetch or modify data.

### 3. Repository Layer

- Handles all database operations using Prisma.
- Provides an abstraction over the database for the Services Layer.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Prisma](https://www.prisma.io/) (installed globally via `npm install -g prisma`)
- A database (e.g., PostgreSQL, MySQL, SQLite)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>

   npm install

   DATABASE_URL="<your-database-connection-string>"

   npx prisma init

   npx prisma migrate dev --name init

   so you you will have a .env.production and .env

   to run the application for development
   npm run dev: Start the development server.
   ```

npm run build: Compile TypeScript to JavaScript.

npm start: Start the production server.

    Request: An HTTP request is received by the API Layer.

    Routing: The router directs the request to the appropriate controller.

    Controller: The controller validates the input and calls the relevant service.

    Service: The service handles the business logic and interacts with the repository.

    Repository: The repository performs database operations using Prisma.

    Response: The controller sends back the HTTP response.

also we have a global handling of errors in the utils folder where you will import it as

const {APIError,STATUS_CODE} = "../to/path/utils

to use it you will initalise it as :
throw new APIError("description",statuscode,"message")

Contributing

Contributions are welcome! Please follow these steps:

    Fork the repository.

    Create a new branch (git checkout -b feature/your-feature).

    Commit your changes (git commit -m 'Add some feature').

    Push to the branch (git push origin feature/your-feature).

    Open a pull request.
