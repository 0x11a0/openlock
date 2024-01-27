# openlock

### Overview

#### Table of Contents

1. [Docker](#docker)
1. [Installation and Setup](#installation-and-setup)
1. [API Usage](#api-usage)

#### Docker

Docker compose in the root directory

```bash
docker compose up
```

NGINX proxies from 8080

##### Nodejs server only

1. **Build the docker image**

   ```bash
   docker build -t my-node-app .
   ```

1. **Run the docker container**

   ```bash
   docker run -p 3000:3000 -d my-node-app
   ```

1. **To see docker logs**

   ```bash
   docker ps
   docker logs -f -t [container_id_or_name]
   ```

1. **To update the docker image**

   ```bash
   docker build -t my-node-app:latest . --platform linux/amd64
   ```

**To push to docker hub**
https://docs.docker.com/get-started/04_sharing_app/

#### Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lucasodra/openlock
   cd openlock
   ```

1. **Install dependencies**:

   ```bash
   npm install
   ```

1. **Set up your environment**:

   Copy `env.example` to a new file named `.env`:

   ```bash
   cp env.example .env
   ```

   Ensure you update `.env` with the required environment variables.

1. **Start the server**:

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

#### Test SSL/TLS

This is if the SSL is up.
```bash
curl --insecure https://localhost/health
```

This is if the SSL is not up
```bash
curl --insecure http://localhost/health
```