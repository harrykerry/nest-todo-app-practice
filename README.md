# NestJS To-Do API Practice App

A simple **To-Do API** built with [NestJS](https://nestjs.com/).  
Features include user authentication with JWT and CRUD operations for tasks.  
Database schema is managed using **TypeORM**.

---

## Features
- User **Registration**    `/auth/register`
- User **Login** (returns JWT token)   `/auth/login`
- User **Logout**  
- **JWT Authentication** for protected routes  (some `/users` and all `/tasks` routes)  
- **CRUD operations** for tasks (Create, Read, Update, Delete)  
- Database migrations with **TypeORM**

---

## Tech Stack
- [NestJS](https://nestjs.com/)  
- [TypeORM](https://typeorm.io/)  
- [PostgreSQL](https://www.postgresql.org/)  
- JWT Authentication  

---

## Installation

```bash
# clone repo
git clone <repo-url>
cd <project-folder>

# install dependencies
npm install
 ```

# Migrations

```bash
# run migrations first
npm run typeorm:run

# start app in development
npm run start:dev

# production build
npm run build
npm run start:prod


# run pending migrations
npm run typeorm:run

# revert last migration
npm run typeorm:revert

# drop schema
npm run typeorm:drop

# show migration status
npm run typeorm:show

```

## API Endpoints

### Auth
- POST /auth/register  
- POST /auth/login  
- POST /auth/logout  (protected with JWT)  

### Tasks (protected with JWT)
- POST /tasks  
- GET /tasks  
- GET /tasks/:id  
- PATCH /tasks/:id  
- DELETE /tasks/:id  

### Users (protected with JWT)
- POST /users  
- GET /users  
- GET /users/:id  
- PATCH /users/:id  
- DELETE /users/:id  

