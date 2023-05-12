![Prisma](https://img.shields.io/badge/Prisma-v4.12.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue)
![Fastify](https://img.shields.io/badge/Fastify-v4.15.0-000000)
![Vitest](https://img.shields.io/badge/Vitest-v0.30.1-yellow)
![Zod](https://img.shields.io/badge/Zod-v3.294.0-orange)


# EasyGym

RentalX is a RESTful API for managing car rentals. It provides a robust and scalable solution for car rental companies to manage their fleets, customers, reservations, and rental contracts. The API is built using Node.js, TypeScript, TypeORM, Express and PostgreSQL database

The API provides a wide range of functionalities, including registering users, authenticating users, managing cars, managing categories, managing specifications, managing rentals, generating rental invoices, and more. It follows the best practices of RESTful API design, ensuring a clear separation of concerns, modularity, scalability, and ease of maintenance.

## Prerequisites

- Node.js 14+

## Installation

1. Clone the repository:

```
git clone https://github.com/joaogabrielf/easygym-api.git
```
2. Install dependencies:

```
cd RENTALX
npm install
```


3. Docker Compose:

With docker installed, enter in app directory and execute:

```
docker compose up
```

4. Run database migrations:

```
npx prisma migrate dev
```

5. Start the server:

```
npm run start:dev
```

## Testing

To run unit tests, execute the following command:

```
npm test
```

to run e2e test, run the following:

```
npm run test:e2e
```



## Technologies used

- Node.js (v19.8.1)
- TypeScript (v5.0.4)
- PostgreSQL (v13.3)
- Prisma (v4.12.0)
- Fastify (v4.15.0)
- Vitest (v0.30.1)
- Zod (v3.294.0)

## License

This project is licensed under the MIT License



