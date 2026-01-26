# TaskFlow - Job Application Tracker

Tracking job applications is a mess. Spreadsheets are boring, and existing tools are too complex.

I built **TaskFlow** to organize the chaos of the job hunt. It helps you track applications, manage to-do lists, and get reminders, all in one place.

## Why I Built This

I needed a way to visualize my application progress without drowning in tabs. I also wanted to learn how to build a robust full stack system that handles real world scenarios like background jobs and caching.

## Tech Stack

I used this project to experiment with some cool technologies:

-   **Frontend**: React (with Tailwind CSS & Shadcn UI for a clean look).
-   **Backend**: Node.js & Express.
-   **Database**: MongoDB (flexible storage for applications).
-   **Caching**: Redis (to speed up company searches).
-   **Queue**: RabbitMQ (handling email reminders and background tasks asynchronously).

## How to Run It

### Prerequisites
Make sure you have **Node.js**, **MongoDB**, **Redis**, and **RabbitMQ** installed (or use Docker).

### 1. Backend
```bash
cd backend
# Create a .env file based on .env.example (or just use defaults)
npm install
npm start
```
Runs on `http://localhost:8001`

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

## Features

-   **Kanban Board**: Drag-and-drop your applications through different stages.
-   **Smart Reminders**: Get notified about upcoming interviews.
-   **Company Insights**: Instantly see details about companies you apply to.
-   **Task Management**: Keep track of everything you need to do for each application.
