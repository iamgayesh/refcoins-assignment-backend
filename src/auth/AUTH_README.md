# JWT Authentication API Documentation

## Overview

This authentication system provides JWT-based login with bcrypt password hashing and protected routes using `@UseGuards(JwtAuthGuard)`.

## Authentication Endpoints

### POST /auth/login

Login with username and password to get JWT token.

**Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success):**

```json
{
  "responseCode": "00",
  "responseMsg": "Login successful",
  "content": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "66f1234567890abcdef",
      "username": "admin",
      "userType": "ADMIN"
    }
  },
  "exception": null
}
```

**Response (Failed):**

```json
{
  "responseCode": "01",
  "responseMsg": "Invalid credentials",
  "content": null,
  "exception": null
}
```

## Protected Endpoints

### Authorization Header

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Examples of Protected Endpoints

#### GET /users (Protected)

Requires valid JWT token to access.

#### GET /users/profile (Protected)

Test endpoint to verify JWT authentication is working.

**Response:**

```json
{
  "responseCode": "00",
  "responseMsg": "Profile access successful",
  "content": {
    "message": "This is a protected route!"
  },
  "exception": null
}
```

## Usage Examples

### 1. Login

```bash
curl -X POST http://localhost:7000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 2. Access Protected Route

```bash
curl -X GET http://localhost:7000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Default Test User

A default admin user is created when running the seed script:

- **Username:** `admin`
- **Password:** `admin123`
- **User Type:** `ADMIN`

## Protecting Your Own Endpoints

To protect any endpoint with JWT authentication, simply add the `@UseGuards(JwtAuthGuard)` decorator:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('your-controller')
export class YourController {
  @UseGuards(JwtAuthGuard) // <- Add this line
  @Get('protected-endpoint')
  getProtectedData() {
    return { message: 'This requires authentication!' };
  }
}
```

## JWT Token Details

- **Expires:** 24 hours
- **Secret:** Set in `JWT_SECRET` environment variable
- **Payload:** Contains username, user ID, and user type

## Security Features

✅ **Password Hashing:** bcrypt with salt rounds of 10  
✅ **JWT Token:** Signed with secret key  
✅ **Token Validation:** Automatic validation for protected routes  
✅ **User Verification:** Token payload validated against database  
✅ **Authorization Guards:** Easy to apply to any endpoint

## Environment Variables

Make sure these are set in your `.env` file:

```
JWT_SECRET=mySecretKey123!@#RefCoinsApp2025
NODE_ENV=development
```
