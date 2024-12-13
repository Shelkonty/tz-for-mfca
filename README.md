# Crypto Rates Project

## Prerequisites

- Node.js (recommended version)
- Docker
- npm

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file and configure any necessary environment variables.

### 3. Database Setup

Run the PostgreSQL database using Docker:

```bash
docker run --name crypto-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=crypto_rates \
  -p 5433:5432 \
  -d postgres
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run start:dev
```

## Access Points

- **Main API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## Additional Commands

- `npm run start:dev`: Run project tests

## Troubleshooting

- Ensure Docker is running before starting the project
- Check that port 5433 is not being used by another service
- Verify that all environment variables are correctly set in the `.env` file

```
