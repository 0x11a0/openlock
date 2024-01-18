# openlock

### Overview

#### Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [API Usage](#api-usage)

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
   ```

   Ensure you update `.env` with the required environment variables.

4. **Start the server**:

   ```bash
   npm run dev
   ```

   By default, the HTTP and WebSocket server runs on `http://localhost:3000`.

#### API Usage

**Base URL**: `http://localhost:3000/api`

1. **Unlock ESP32**

   Endpoint: `/esp32/unlock`

   Method: `POST`

   ```json
   {
     "esp32Code": "<code>",
     "password": "<password>",
     "instruction": "open"
   }
   ```

   Remarks: The code in the body has to match the ESP32_CODE on the esp32 server.
