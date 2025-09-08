# Nest.js-Course-REST-API-01

A personal repository for my Nest.js learning journey.  
This part covers **Modules**, **Controllers**, **Services**, and using `@nestjs/config` for configuration.

## What I Learned

- Working on creating **Rest APIs**.
- **DTO**, **Pipes**, and **Validation**.

## Deploy PostgresSQL

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

## Environment Variables

```env
# DB
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres

```

## How to Run

```bash
npm install
npm run start:dev
```

## All Lessons

1. [Nest.js-Course-Concepts-00](https://github.com/ZeroaNinea/Nest.js-Course-Concepts-00)
2. [Nest.js-Course-REST-API-01](https://github.com/ZeroaNinea/Nest.js-Course-REST-API-01)

## Resources

- **[Nest JS Full Course 2025 | Node JS Full Course | Part 4](https://www.youtube.com/watch?v=XVZ10uFY9DU&t=3109s)** created by Sangam Mukherjee
- **[NestJS documentation](https://docs.nestjs.com/)**
