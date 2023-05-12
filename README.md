![Prisma](https://img.shields.io/badge/Prisma-v4.12.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue)
![Fastify](https://img.shields.io/badge/Fastify-v4.15.0-000000)
![Vitest](https://img.shields.io/badge/Vitest-v0.30.1-yellow)
![Zod](https://img.shields.io/badge/Zod-v3.294.0-orange)


# EasyGym

EasyGym-API is an open-source project that provides a simple and intuitive REST API for managing gym members, workouts, and schedules from the gym perspective and check-in in any registered gym from users perspective. The API is built using Node.js and Fastify, and uses a PostgreSQL database for data storage.

With EasyGym-API, developers can easily build gym management applications and integrate them with their own systems. The API allows for the creation, updating, and deletion of gym members, workouts, and schedules, as well as the retrieval of data for reporting and analysis.

The project includes detailed documentation and examples for using the API, as well as a set of tests to ensure the reliability and stability of the code. It also includes a Dockerfile for easy deployment and scaling of the API.

Whether you're a gym owner looking to build a custom management system, or a developer building a fitness app, EasyGym-API provides a flexible and easy-to-use solution for managing gym data.

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



