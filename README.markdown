# 🏗️ Refcoins Backend - NestJS API Server

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-10.4.20-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.8.4-green?style=for-the-badge&logo=mongodb)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)

**Backend API server for the Refcoins Property Management Platform**

A robust REST API built with **NestJS**, **MongoDB**, and **TypeScript** for property management, user authentication, and file uploads.

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Setup and Running](#-setup-and-running)
- [🌐 API Endpoints](#-api-endpoints)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🧪 Testing](#-testing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📚 Resources for Beginners](#-resources-for-beginners)
- [📜 License](#-license)

---

## 🎯 Overview

This REST API server powers the **Refcoins Property Management Platform**, handling property listings, user authentication, file uploads, and advanced search functionality. Built with **NestJS**, it leverages **TypeScript** for type safety, **MongoDB** for scalable data storage, and **JWT** for secure authentication.

### Why NestJS?

- **TypeScript Support**: Catches errors early with static typing.
- **Modular Architecture**: Organized, scalable code structure.
- **Built-in Features**: Simplifies authentication, validation, and more.
- **Production-Ready**: Trusted by enterprises for robust applications.

---

## ✨ Features

- **Property Management**:
  - Create, update, delete, and retrieve property listings.
  - Upload and serve property images (PNG, JPG, JPEG).
  - Paginated property lists (3 properties per page).

- **Advanced Search & Filtering**:
  - Search by location (e.g., Colombo, Kandy, Galle).
  - Filter by property status (For Sale, For Rent) and type (Single Family, Villa).
  - Paginated search results.

- **User Authentication**:
  - Secure user registration and login with **JWT** and **bcrypt**.
  - Protected routes for authorized access.

- **File Management**:
  - Image uploads using **Multer**.
  - Stores images in `C:\REFCOINS` (Windows) or configurable path.
  - File validation and HTTP serving.

- **Database Operations**:
  - MongoDB integration with **Mongoose**.
  - Automated seeding for initial data.
  - Efficient queries with indexing.

---

## 🛠️ Technologies

| Technology     | Version | Purpose                         |
|----------------|---------|---------------------------------|
| **NestJS**     | 10.4.20 | Backend framework               |
| **TypeScript** | 5.0.0   | Type-safe JavaScript            |
| **MongoDB**    | 7.8.4   | NoSQL database                  |
| **Mongoose**   | 8.8.3   | MongoDB object modeling         |
| **JWT**        | 9.0.2   | Secure authentication           |
| **Multer**     | 1.4.5   | File upload handling            |
| **bcrypt**     | 5.1.1   | Password encryption             |

---

## 📋 Prerequisites

- **Node.js** (v18+): [Download](https://nodejs.org/)
  - Verify: `node --version`
- **npm**: Comes with Node.js
  - Verify: `npm --version`
- **MongoDB**: [Download Community Server](https://www.mongodb.com/try/download/community)
  - Optional: Install [MongoDB Compass](https://www.mongodb.com/products/compass) for GUI management.
- **Git** (optional): [Download](https://git-scm.com/)

---

## 🚀 Setup and Running

### 1. Clone the Repository

```bash
git clone <repository-url>
cd refcoins-assignment-backend
```

### 2. Install Dependencies

```bash
npm install
 ```

### 3. Configure Environment Variables:
   Create a `.env` file in the root directory with the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/refcoinsDB
   PORT=7000
   NODE_ENV=development
   JWT_SECRET=<secure-random-string>
   ```
### 4. Seed the Database:
   The `src/seed.ts` script populates the database with initial data (e.g., locations, statuses, types). Run it **before starting the server**:

   ```bash
   npx ts-node src/seed.ts
   ```

   Ensure MongoDB is running and the `MONGO_URI` is correct.

### 5. Start MongoDB

- **Windows Service**:
  ```bash
  net start MongoDB
  ```
- **Manual Start**:
  ```bash
  mongod
  ```
- **MongoDB Compass**: Connect to `mongodb://localhost:27017`.

### 6. Create Image Storage Directory

```bash
# Windows
mkdir C:\REFCOINS

# Mac/Linux (update path in code if needed)
mkdir ~/REFCOINS
```

### 7. Start the Server

```bash
# Development mode (auto-restarts on changes)
npm run start:dev

# Production mode
npm run start:prod
```

### 8. Verify

- Visit `http://localhost:7000/properties` in a browser.
- Expected output: JSON array (e.g., `[]` if no properties exist).

---

## 🌐 API Endpoints

### 🏠 Properties

| Method | Endpoint                                | Description                     |
|--------|-----------------------------------------|---------------------------------|
| `GET`  | `/properties`                          | List all properties             |
| `GET`  | `/properties/paginated?page=1&limit=3` | Paginated property list         |
| `GET`  | `/properties/search?locationId=1`      | Search with filters             |
| `POST` | `/properties/create-with-image`        | Create property with image      |

### 🔐 Authentication

| Method | Endpoint          | Description       | Example Body                                              |
|--------|-------------------|-------------------|-----------------------------------------------------------|
| `POST` | `/auth/login`     | User login        | `{"username": "admin", "password": "admin123"}`    |
| `POST` | `/auth/register`  | User registration | `{"username": "admin", "usertype": "ADMIN", "password": "admin123"}` |

### 📋 Lookup Data

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| `GET`  | `/locations`   | List locations (e.g., Colombo)  |
| `GET`  | `/types`       | List property types             |
| `GET`  | `/statuses`    | List property statuses          |

### 📸 File Serving

| Method | Endpoint                   | Description                     |
|--------|----------------------------|---------------------------------|
| `GET`  | `/uploads/image-123456.png`| Serve uploaded images           |

---

## 📁 Project Structure

```
refcoins-assignment-backend/
├── src/
│   ├── main.ts                   # Application entry point
│   ├── app.module.ts             # Root module
│   ├── seed.ts                   # Database seeding script
│   ├── auth/                     # Authentication module
│   ├── property/                 # Property management module
│   ├── user/                     # User management module
│   ├── location/                 # Location data module
│   ├── type/                     # Property type module
│   ├── status/                   # Property status module
│   ├── upload/                   # File upload module
├── test/                         # Test files
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── nest-cli.json                 # NestJS CLI configuration
```

---

## 🔧 Configuration

### Default Settings

- **Port**: 7000
- **Database**: `mongodb://localhost:27017/refcoinsDB`
- **Image Storage**: `C:\REFCOINS`
- **JWT Secret**: Auto-generated
- **CORS**: Enabled for `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root folder:

```env
MONGO_URI=mongodb://localhost:27017/refcoinsDB
PORT=7000
NODE_ENV=development
JWT_SECRET=your-secret-key
UPLOAD_PATH=C:\REFCOINS
```

### Available Scripts

| Script                | Description                                  |
|-----------------------|----------------------------------------------|
| `npm run start:dev`   | Run in development with auto-restart         |
| `npm run start:prod`  | Run in production mode                      |
| `npm run build`       | Build for production                        |
| `npm run test`        | Run unit tests                              |
| `npm run test:e2e`    | Run end-to-end tests                        |
| `npm run seed`        | Seed database with initial data             |

---

## 🧪 Testing

### Browser Testing

- Visit `http://localhost:7000/properties` to see property data.
- Check other endpoints like `/locations`, `/types`, or `/statuses`.

### Postman/Thunder Client

- **GET Properties**:
  - URL: `http://localhost:7000/properties`
  - Method: GET
- **POST Property**:
  - URL: `http://localhost:7000/properties`
  - Method: POST
  - Body (JSON):
    ```json
    {
      "propertyTitle": "Modern Villa",
      "propertySlug": "modern-villa",
      "propertyLocation": 1,
      "propertyDescription": "Luxury villa in Colombo",
      "propertyPrice": 20000000,
      "propertyType": 2,
      "propertyStatus": 1,
      "propertyArea": 2500
    }
    ```
- **Login**:
  - URL: `http://localhost:7000/auth/login`
  - Method: POST
  - Body (JSON):
    ```json
    {
      "email": "admin@admin.com",
      "password": "admin123"
    }
    ```
  - Use the returned token in `Authorization: Bearer <token>` for protected routes.

---

## 🐛 Troubleshooting

| Issue                         | Solution                                                                 |
|-------------------------------|--------------------------------------------------------------------------|
| MongoDB connection failure    | Start MongoDB: `net start MongoDB` or `mongod`                           |
| Port 7000 in use              | Kill process: `taskkill /f /im node.exe` or change port in `main.ts`     |
| Module not found              | Reinstall dependencies: `rm -rf node_modules package-lock.json && npm i` |
| Image upload failure          | Ensure `C:\REFCOINS` exists: `mkdir C:\REFCOINS`                        |

**Debug Commands**:

```bash
# Check MongoDB
mongosh --eval "db.runCommand('ping')"

# Check port
netstat -an | findstr :7000

# Test API
curl http://localhost:7000/properties
```

---

## 📚 Resources for Beginners

- **What is an API?**: A bridge between frontend and backend, like a waiter taking orders to the kitchen.
- **NestJS Basics**: [Official Docs](https://docs.nestjs.com/)
- **MongoDB Tutorial**: [MongoDB Manual](https://www.mongodb.com/docs/manual/tutorial/)
- **TypeScript Guide**: [TypeScript Docs](https://www.typescriptlang.org/docs/)
- **REST API Concepts**: [REST API Guide](https://restfulapi.net/)

---

## 📜 License

This project is unlicensed. For internal use only.

---

<div align="center">

**🏗️ Refcoins Backend API**

Built with ❤️ for the Refcoins Property Management Platform

</div>
