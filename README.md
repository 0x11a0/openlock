# openlock

### Overview


#### Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [API Usage](#api-usage)
3. [Directory Structure](#directory-structure)
4. [Testing](#testing)

#### Installation and Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/lucasodra/openlock
    cd openlock
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up your environment**:

    Copy `env.example` to a new file named `.env`:

    ```bash
    cp env.example .env
    cd client_socket_test
    cp env.example .env
    cd ..
    ```

    Ensure you update `.env` with the required environment variables.
    Ensure you have MongoDB installed and running locally.

4. **Start the server**:

    ```bash
    npm run dev
    ```

    By default, the server runs on `http://localhost:3000`.

    ```bash
    cd client_socket_test
    node esp32Socket.js
    ```

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

1. **Login an existing user**

    Endpoint: `/users/login`

    Method: `POST`

    Body:

    ```json
    {
        "email": "<email>",
        "password": "<password>"
    }
    ```

1. **Get profile of authenticated user**

    Endpoint: `/users/me`
    
    Method: `GET`

    Headers:

    ```json
    {
        "Authorization": "Bearer <Your-Token>"
    }
    ```

1. **Logout user from current device**

    Endpoint: `/users/logout`
    
    Method: `POST`

    Headers:

    ```json
    {
        "Authorization": "Bearer <Your-Token>"
    }
    ```

1. **Logout user from all devices**

    Endpoint: `/admin/logoutAll`
    
    Method: `POST`

    Headers:

    ```json
    {
        "Authorization": "Bearer <Your-Token>"
    }
    ```

    Remarks: This can be only if you are an admin

1. **Create new admin**

    Endpoint: `/admin/logoutAll`
    
    Method: `POST`

    ```json
    {
        "username": "<username>",
        "email": "<email>",
        "password": "<password>",
        "role": "admin"
    }
    ```

    Remarks: If you are holding onto the admin role, you can create another admin.

1. **Unlock ESP32**

    Endpoint: `/esp32/unlock`
    
    Method: `POST`

    ```json
    {
        "esp32Code": "<code>",
        "instruction": "open"
    }
    ```

    Remarks: The code in the body has to match the ESP32_CODE on the esp32 server.