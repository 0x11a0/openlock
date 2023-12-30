# openlock

# express_starter

### Express App - User Authentication

This Express application provides a robust user authentication system, utilizing JWTs (JSON Web Tokens) for secure access and session management. From registration to login, and even features like logging out of individual or all sessions, this app is a complete authentication solution.

#### Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [API Usage](#api-usage)
3. [Directory Structure](#directory-structure)
4. [Testing](#testing)

#### Installation and Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/lucasodra/express_starter
    cd express_starter
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up your environment**:

    Copy `env.example` to a new file named `.env`:

    ```bash
    cp env.example .env
    ```

    Ensure you update `.env` with the required environment variables.
    Ensure you have MongoDB installed and running locally.

4. **Start the server**:

    ```bash
    npm test
    ```

    By default, the server runs on `http://localhost:3000`.

#### API Usage

**Base URL**: `http://localhost:3000/api`

1. **Register a new user**

    Endpoint: `/users/register`
    
    Method: `POST`
    
    Body:

    ```json
    {
        "username": "<username>",
        "email": "<email>",
        "password": "<password>"
    }
    ```

2. **Login an existing user**

    Endpoint: `/users/login`

    Method: `POST`

    Body:

    ```json
    {
        "email": "<email>",
        "password": "<password>"
    }
    ```

3. **Get profile of authenticated user**

    Endpoint: `/users/me`
    
    Method: `GET`

    Headers:

    ```json
    {
        "Authorization": "Bearer <Your-Token>"
    }
    ```

4. **Logout user from current device**

    Endpoint: `/users/logout`
    
    Method: `POST`

    Headers:

    ```json
    {
        "Authorization": "Bearer <Your-Token>"
    }
    ```

5. **Logout user from all devices**

    Endpoint: `/users/logoutAll`
    
    Method: `POST`

    Headers:

    ```json
    {
        "Authorization": "Bearer <Your-Token>"
    }
    ```

#### Directory Structure

Here's an overview of the main directories and files:

```
.
├── LICENSE
├── README.md
├── app.js                # Main application entry point
├── env.example           # Example environment file
├── expressController.js  # Controller functions for routes
├── expressRoute.js       # Route definitions
├── generate.key.js       # Key generator utility
├── index.js              # Server initialization
├── middleware/
│   └── auth.js           # Authentication middleware
├── models/
│   └── User.js           # User Mongoose model
└── test/
    └── user.test.js      # User-related tests using Axios
```

#### Testing

To test user-related functionalities, use the `user.test.js` script. This script, built with Axios, tests the following:
1. Registering a new user.
2. Logging in an existing user.
3. Retrieving the authenticated user's profile.
4. Logging out the user from the current device.
5. Logging out the user from all devices.

To run the test:

```bash
node test/user.test.js
```

---
