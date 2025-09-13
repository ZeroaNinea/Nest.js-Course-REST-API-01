# Nest.js-Course-REST-API-01

A personal repository for my Nest.js learning journey.  
This part covers **Modules**, **Controllers**, **Services**, and using `@nestjs/config` for configuration.

## What I Learned

- Working on creating **Rest APIs**.
- **DTO**, **Pipes**, and **Validation**.
- **TypeORM** and database integration with **PostgresSQL**.
- **JWT**, **`@nestjs/passport`**, **`@nestjs/jwt`**, and **RBAC (role-based access control)**.
- **`@nestjs/throttler`**.
- **`@nestjs/cache-manager`** and **`cache-manager`**.
- File upload with **`@nestjs/platform-express`**, **`@types/express`**, **`cloudinary`**, **`multer`**/**`@types/multer`**, and **`streamifier`**.
- **`@nestjs/event-emitter`**.

## Deploy PostgresSQL

```bash
docker run --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres

```

Run the container again to restart the database.

```bash
docker start -a postgres
```

Stop the container.

```bash
docker stop -a postgres
```

## Environment Variables

```env
# Application
PORT=3000

# Database
DB_DIALECT=postgres
DB_USERNAME=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres

DATABASE_URL=postgres://postgres:password@localhost:5432/postgres

# Add your data here.
# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
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
- **[TypeORM documentation](https://typeorm.io/docs/getting-started/)**
