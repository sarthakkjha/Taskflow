# TaskFlow - Job Application Tracker

A full-stack job application tracker built with Node.js, React, MongoDB, Redis, and RabbitMQ.

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Node.js + Express |
| **Frontend** | React |
| **Database** | MongoDB |
| **Cache** | Redis |
| **Message Queue** | RabbitMQ |
| **Containerization** | Docker + Docker Compose |

---

## 🚀 Quick Start with Docker

The easiest way to run the entire application:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

**Services started:**
- Backend API: http://localhost:8001
- MongoDB: localhost:27017
- Redis: localhost:6379
- RabbitMQ: localhost:5672
- RabbitMQ Management UI: http://localhost:15672 (user: `taskflow`, pass: `taskflow123`)

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│  Node.js API    │
│   (Frontend)    │     │   (Backend)     │
└─────────────────┘     └────────┬────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    MongoDB      │     │     Redis       │     │   RabbitMQ      │
│   (Database)    │     │    (Cache)      │     │ (Message Queue) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 📦 How Each Service is Used

### 🔴 Redis - Caching Layer

**Purpose:** Fast in-memory cache for frequently accessed data.

**Current Usage:**
- **Company Search Caching**: Search results are cached for 1 hour to reduce API calls
  - Cache key: `company:{company_name}`
  - TTL: 3600 seconds (1 hour)

**Example Flow:**
```
1. User searches "Google"
2. Check Redis: GET company:google
3. Cache HIT → Return cached result instantly
4. Cache MISS → Generate result, then SET company:google (expires in 1 hour)
```

**Code Location:** `backend/services/redis.js`

**Available Functions:**
```javascript
const { setCache, getCache, deleteCache } = require('./services/redis');

// Cache any data
await setCache('key', { data: 'value' }, 3600); // expires in 1 hour
const data = await getCache('key');
await deleteCache('key');

// Session management
await setSession(userId, sessionData);
const session = await getSession(userId);
```

---

### 🐰 RabbitMQ - Message Queue

**Purpose:** Async processing for background tasks and notifications.

**Current Queues:**
| Queue | Purpose |
|-------|---------|
| `email_notifications` | Send emails to users |
| `job_reminders` | Interview/follow-up reminders |
| `background_tasks` | General background processing |

**Example Use Cases:**
1. **Interview Reminder**: When an interview is scheduled, queue a reminder to be sent
2. **Email Notification**: When a job status changes, queue an email notification
3. **Bulk Import**: Queue CSV processing as a background task

**Code Location:** `backend/services/rabbitmq.js`

**Usage:**
```javascript
const { 
  queueEmailNotification, 
  queueJobReminder, 
  queueBackgroundTask 
} = require('./services/rabbitmq');

// Send email (processed asynchronously)
await queueEmailNotification('user@email.com', 'Subject', 'Body');

// Schedule an interview reminder
await queueJobReminder(userId, jobId, 'interview', '2024-01-20T10:00:00Z');

// Queue any background task
await queueBackgroundTask('csv_import', { fileUrl: '...' });
```

**Creating a Worker (Consumer):**
```javascript
const { consumeQueue, QUEUES } = require('./services/rabbitmq');

// Process email notifications
await consumeQueue(QUEUES.EMAIL_NOTIFICATIONS, async (message) => {
  console.log('Sending email to:', message.email);
  // Send email logic here
});
```

---

### 🍃 MongoDB - Primary Database

**Purpose:** Stores all application data.

**Collections:**
| Collection | Description |
|------------|-------------|
| `users` | User accounts |
| `user_sessions` | Auth sessions |
| `tasks` | Todo tasks |
| `job_applications` | Job tracking |
| `templates` | Message templates |

---

## 🛠️ Development Setup

### Without Docker

```bash
# Prerequisites: MongoDB, Redis, RabbitMQ installed locally

# Backend
cd backend
npm install
npm start

# Frontend (separate terminal)
cd frontend
npm install
npm start
```

### Environment Variables

Create `backend/.env`:

```env
# MongoDB
MONGO_URL=mongodb://localhost:27017
DB_NAME=taskflow

# Server
PORT=8001
JWT_SECRET=your-secret-key
CORS_ORIGINS=http://localhost:3000

# Redis
REDIS_URL=redis://localhost:6379

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672
```

---

## 📊 Health Check

Check if all services are connected:

```bash
curl http://localhost:8001/api/health
```

Response:
```json
{
  "status": "healthy",
  "service": "TaskFlow API",
  "services": {
    "mongodb": "connected",
    "redis": "connected",
    "rabbitmq": "connected"
  }
}
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all applications |
| POST | `/api/jobs` | Create application |
| PUT | `/api/jobs/:id` | Update application |
| DELETE | `/api/jobs/:id` | Delete application |

### Templates
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/templates` | List templates |
| POST | `/api/templates` | Create template |
| PUT | `/api/templates/:id` | Update template |
| DELETE | `/api/templates/:id` | Delete template |

---

## 🚀 Deployment (Render + Vercel)

### Backend → Render

1. **Create MongoDB Atlas** (free):
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a free M0 cluster
   - Create database user and whitelist `0.0.0.0/0`
   - Get connection string: `mongodb+srv://...`

2. **Deploy to Render**:
   - Go to [render.com](https://render.com) → New → Web Service
   - Connect your GitHub repo
   - Set **Root Directory**: `backend`
   - Set **Build Command**: `npm install`
   - Set **Start Command**: `node server.js`
   
3. **Set Environment Variables** in Render:
   ```
   NODE_ENV=production
   PORT=8001
   MONGO_URL=mongodb+srv://...  (from MongoDB Atlas)
   DB_NAME=taskflow
   JWT_SECRET=your-secure-random-string
   CORS_ORIGINS=https://your-app.vercel.app
   ```

4. **Get your Render URL**: `https://your-app.onrender.com`

---

### Frontend → Vercel

1. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) → Add New → Project
   - Import your GitHub repo
   - Set **Root Directory**: `frontend`
   - Framework Preset: Create React App
   
2. **Set Environment Variable** in Vercel:
   ```
   REACT_APP_BACKEND_URL=https://your-app.onrender.com
   ```

3. **Update Render CORS** after getting Vercel URL:
   ```
   CORS_ORIGINS=https://your-app.vercel.app
   ```

---

## 📁 Project Structure

```
app_backup/
├── docker-compose.yml      # All services configuration
├── backend/
│   ├── Dockerfile          # Backend container config
│   ├── render.yaml         # Render deployment config
│   ├── server.js           # Express server entry
│   ├── package.json
│   ├── .env                # Environment variables
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   ├── routes/
│   │   ├── auth.js         # Auth endpoints
│   │   ├── tasks.js        # Task endpoints
│   │   ├── jobs.js         # Job endpoints
│   │   ├── templates.js    # Template endpoints
│   │   └── companies.js    # Company search (with Redis cache)
│   └── services/
│       ├── redis.js        # Redis caching service
│       └── rabbitmq.js     # Message queue service
└── frontend/
    ├── vercel.json         # Vercel deployment config
    └── src/
        ├── pages/          # React pages
        └── components/     # React components
```

