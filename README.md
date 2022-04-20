### App to manage a school system with authentication (nestwnext_schoolsystem_auth)

#### Used tecnologies:
- Nest.js and Next.js

#### Tables:
- users (name, email, roles, password),
    subject (name, status),
    course (name, duration, time_course, status),
    course_subject (id_course, id_subject)

## Backend - Nest.js (schoolsystem_backend)
- Dependencies (Mongo, Mongoose, Jest, Etc...)

## Frontend - Next.js (schoolsystem_frontend)
- Dependencies (Cookies, Axios, Etc...)
- Server Side Rendering

### Start Apps
- Docker [required]

In Development (commands):
    Backend:
        - yarn install
        - yarn start:dev
    Frontend:
        - yarn install
        - yarn dev

In Production (up with docker locally)
    Backend (in projet's folder):
        - docker network create schoolsystem_network
        - docker build -t <your_dockerhub>/schoolsystem_backend:latest .
        - docker-compose up
    Frontend (in projet's folder)
        - docker build -t <your_dockerhub>/schoolsystem_frontend:latest .
        - docker-compose up