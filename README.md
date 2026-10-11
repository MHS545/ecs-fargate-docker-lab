# Docker Compose Multi-Container Application on AWS ECS Fargate

## Project Overview

This project demonstrates the deployment of a multi-container application using Docker, Docker Compose, Amazon ECR, and Amazon ECS Fargate.

The application consists of:

- Frontend 1 (HTML, CSS, JavaScript)
- Frontend 2 (HTML, CSS, JavaScript)
- Flask Backend API
- MongoDB Database

The application was first tested locally using Docker Compose and then deployed to AWS ECS Fargate.

---

# Architecture

```
                    User
                      │
                      ▼
          ┌──────────────────────┐
          │    Frontend 1        │
          │     Port 80          │
          └──────────────────────┘
                      │
                      │ HTTP API
                      ▼
          ┌──────────────────────┐
          │   Flask Backend      │
          │     Port 5000        │
          └──────────────────────┘
                      │
                localhost:27017
                      │
                      ▼
          ┌──────────────────────┐
          │      MongoDB         │
          │     Port 27017       │
          └──────────────────────┘

          Frontend 2 follows the same flow.
```

---

# Technologies Used

- Docker
- Docker Compose
- Python Flask
- MongoDB
- HTML
- CSS
- JavaScript
- Amazon ECS Fargate
- Amazon ECR
- AWS CloudWatch
- AWS IAM

---

# Local Development

Clone the repository:

```bash
git clone <repository-url>
cd docker-compose
```

Build and start all services:

```bash
docker compose up --build
```

Application URLs:

Frontend 1

```
http://localhost:3001
```

Frontend 2

```
http://localhost:3002
```

Backend API

```
http://localhost:5000/api/messages
```

---

# Docker Compose Services

The project contains four services:

- frontend1
- frontend2
- backend
- mongo

Docker Compose automatically:

- Builds application images
- Downloads MongoDB image
- Creates Docker network
- Starts all containers
- Connects containers together

---

# AWS Deployment

Deployment Steps:

1. Build Docker images
2. Push images to Amazon ECR
3. Create ECS Task Definitions
4. Create ECS Services
5. Configure networking
6. Deploy Backend and MongoDB
7. Deploy Frontend 1
8. Deploy Frontend 2
9. Verify API communication

---

# Project Structure

```
.
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend1/
│   ├── Dockerfile
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── frontend2/
│   ├── Dockerfile
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# Features

- Multi-container architecture
- REST API using Flask
- MongoDB database integration
- Docker Compose orchestration
- ECS Fargate deployment
- Containerized frontend and backend
- Shared database communication
- Cloud deployment using AWS

---

# Challenges Faced

During deployment the following challenges were encountered:

- Backend to MongoDB connectivity
- ECS networking configuration
- Service communication
- Container deployment
- Image version management
- ECS task updates

These issues were resolved by deploying the Backend and MongoDB containers within the same ECS Task while keeping them as separate containers.

---

# Learning Outcomes

This project provided practical experience with:

- Docker containerization
- Docker Compose
- Image creation
- Amazon ECR
- Amazon ECS
- ECS Task Definitions
- ECS Services
- Container networking
- Flask API development
- MongoDB integration
- AWS cloud deployment

---

# Author

Developed as part of a Docker Compose and AWS ECS Fargate Lab.