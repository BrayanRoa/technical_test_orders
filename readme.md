# Node.js Project with Typescript and Prisma ORM

This project is a basic setup of a development environment using Node.js, Typescript, and Prisma. Follow the steps below to set up and run the project.

---

## 📦 Installation

### 1. Install Node.js Modules

Run the following command to install the necessary modules:

```sh
npm install
```

### 2. Environment Setup

Clone the `.env.template` file and copy all the data into a new file called `.env`.

---

## ⚙️ Prisma ORM Configuration

### 1. Initialize and Migrate Prisma

Execute the following command to initialize and migrate Prisma. Run the second command to create the tables from the `prisma.schema` file:

```sh
npx prisma migrate dev --name init
```

---

## 🖥️ Operating System Configuration

### For Linux Users:

Update the `scripts` section in your `package.json`:

```json
"dev": "NODE_ENV=development tsnd --respawn --clear src/app.ts",
"start": "NODE_ENV=production&&npm run build && node dist/app.js",
```

### For Windows Users:

Update the `scripts` section in your `package.json`:

```json
"dev": "set NODE_ENV=development tsnd --respawn --clear src/app.ts",
"start": "set NODE_ENV=production&&npm run build && node dist/app.js",
```

---

## 🌐 API Documentation

### Access the API

Visit [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/) to test the API using Swagger.

### API Features

This API allows managing orders and products, including functionality for creating default products and managing user authentication.

---

## 📌 Endpoints

### **1. Create Default Products**

- **URL:** `/api/v1/products/default`
- **Method:** `POST`
- **Description:** Create 10 default technology products for testing purposes. This endpoint allows quickly populating the product catalog without creating each product manually.
- **Responses:**
  - **201 Created:** Products created successfully.
  - **500 Internal Server Error:** Server error.

### **2. Create Order**

- **URL:** `/api/v1/orders`
- **Method:** `POST`
- **Description:** Create a new order. The user ID is extracted from the authentication token.
- **Request Body:**
  ```json
  {
    "details": [
      {
        "productId": "product_id_here",
        "quantity": 2
      }
    ]
  }
  ```
- **Responses:**
  - **201 Created:** Order created successfully.
  - **400 Bad Request:** Invalid data provided.
  - **401 Unauthorized:** Missing or invalid authentication token.
  - **500 Internal Server Error:** Server error.

### **3. Get All Orders by User**

- **URL:** `/api/v1/orders`
- **Method:** `GET`
- **Description:** Get all orders. The user ID is extracted from the authentication token.
- **Responses:**
  - **200 OK:** List of orders.
  - **401 Unauthorized:** Missing or invalid authentication token.
  - **500 Internal Server Error:** Server error.

### **4. Get Single Order**

- **URL:** `/api/v1/orders/:id/status`
- **Method:** `GET`
- **Description:** Retrieve a specific order by its ID. The user ID is extracted from the authentication token.
- **Responses:**
  - **200 OK:** Order details.
  - **404 Not Found:** Order not found.
  - **401 Unauthorized:** Missing or invalid authentication token.
  - **500 Internal Server Error:** Server error.

### **5. Delete Order**

- **URL:** `/api/v1/orders/:id`
- **Method:** `DELETE`
- **Description:** Delete an order by its ID. The user ID is extracted from the authentication token.
- **Responses:**
  - **200 OK:** Order deleted successfully.
  - **404 Not Found:** Order not found.
  - **401 Unauthorized:** Missing or invalid authentication token.
  - **500 Internal Server Error:** Server error.

---

## 🔑 Authentication

- All endpoints require a valid JWT token. The user ID will be extracted from the token.
- Ensure to authenticate before making requests to the endpoints that involve user-specific data (e.g., creating orders, fetching orders).

---

## 🏗️ Project Architecture

This project follows **Clean Architecture** principles to ensure maintainability, scalability, and separation of concerns. The architecture consists of the following layers:

### **1. Domain Layer**

- Contains the core business logic, entities, and **application logic (use cases)**.
- Independent of frameworks or external tools.
- Includes:
  - **Entities**: Represent core business objects.
  - **Use Cases**: Handle the application's specific business logic and orchestrate repository operations.

### **2. Infrastructure Layer**

- Responsible for external dependencies such as the database, APIs, or third-party services.
- Contains the implementation of **repositories** and other supporting classes to interact with external systems.

### **3. Presentation Layer**

- Exposes the API to interact with the application (e.g., controllers).
- Handles HTTP requests, input validation, and output formatting.

---

## 🗂️ Repository Pattern

This project uses the **Repository Pattern** to abstract database operations. This ensures:

1. **Separation of Concerns**: Decouples business logic from persistence logic.
2. **Easier Testing**: Use cases can be tested independently by mocking repository behavior.
3. **Flexibility**: Changing the database (e.g., PostgreSQL, MySQL) only requires updating the repository implementation, without affecting business logic.

---

## 🔄 Example Workflow

1. A **controller** in the presentation layer receives a request (e.g., create an order).
2. The controller calls a **use case** (e.g., `CreateOrderUseCase`) from the **domain layer**.
3. The use case interacts with a **repository** in the infrastructure layer to perform the necessary database operations.
4. The repository communicates with the database and returns the result to the use case.
5. The use case processes the result and sends it back to the controller.

## 🛡️ Audit Table

To ensure security and track changes, this project includes an **Audit Table**. Any changes, such as `CREATE`, `UPDATE`, or `DELETE` operations, are logged in this table. This allows:

- **Tracking Changes:** Detailed records of who made changes and when.
- **Security:** Monitoring unauthorized or suspicious activities.
- **Accountability:** A clear history of modifications for debugging or compliance purposes.

---

By combining **Clean Architecture**, the **Repository Pattern**, and the **Audit Table**, this project ensures a robust, secure, and maintainable structure for development.
