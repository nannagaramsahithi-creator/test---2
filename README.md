# 🌐 MERN Stack Project Starter

A complete, production-ready MERN (MongoDB, Express, React, Node.js) application template configured with MongoDB Atlas.

---

## 📁 Project Structure

```
├── client/                     # React Frontend (Create React App)
│   ├── public/                 # Static assets & index.html
│   ├── src/                    # React components and logic
│   │   ├── App.js              # Main application component
│   │   ├── index.js            # React DOM render entry
│   │   └── index.css           # Global styles
│   └── package.json            # Frontend dependencies & scripts
│
├── server/                     # Express Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB Atlas Mongoose connection
│   │   ├── controllers/
│   │   │   └── itemController.js # CRUD business logic
│   │   ├── middleware/
│   │   │   └── errorHandler.js # Centralized 404 & error handlers
│   │   ├── models/
│   │   │   └── Item.js         # Mongoose Schema & Model
│   │   ├── routes/
│   │   │   └── itemRoutes.js   # REST API routes
│   │   └── server.js           # Express app setup & listener
│   ├── .env                    # Environment variables (Atlas URI, PORT)
│   ├── .env.example            # Environment variables template
│   ├── .gitignore              # Ignores node_modules & .env
│   └── package.json            # Backend dependencies & scripts
│
└── package.json                # Root package for running scripts
```

---

## 🍃 Setting Up MongoDB Atlas (Step-by-Step)

1. **Sign Up / Log In**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a free account or log in.

2. **Create a Free Cluster**:
   - Click **Create Deployment** -> Choose **M0 Free Tier**.
   - Select your preferred cloud provider and region (e.g. AWS / us-east-1 or closest to you).
   - Click **Create**.

3. **Configure Database Access (Username & Password)**:
   - In Atlas left sidebar, go to **Security** -> **Database Access**.
   - Click **Add New Database User**.
   - Choose **Password Authentication**.
   - Enter a username (e.g., `admin`) and secure password (avoid special characters like `@` or `:` in password, or URL-encode them).
   - User Privileges: `Read and write to any database`.
   - Click **Add User**.

4. **Configure Network Access (IP Whitelist)**:
   - In Atlas left sidebar, go to **Security** -> **Network Access**.
   - Click **Add IP Address**.
   - For development, select **Allow Access from Anywhere** (`0.0.0.0/0`), or add your current IP address.
   - Click **Confirm**.

5. **Get Connection String**:
   - In **Database** -> click **Connect** on your cluster.
   - Choose **Drivers** -> Driver: **Node.js** (latest version).
   - Copy the connection string. It will look like:
     ```
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```

6. **Update `server/.env`**:
   - Open `server/.env` and paste your connection string into `MONGODB_URI`:
     ```env
     PORT=5000
     NODE_ENV=development
     MONGODB_URI=mongodb+srv://admin:YourPassword123@cluster0.abcde.mongodb.net/mern_db?retryWrites=true&w=majority
     CLIENT_URL=http://localhost:3000
     ```
   *(Note: Remember to replace `<username>` and `<password>` with your real credentials and set your database name, e.g. `/mern_db`)*

---

## 🚀 Running the Project

### 1. Start the Backend Server (Express + MongoDB)
```bash
# Option A: From root directory
npm run server

# Option B: Directly from server folder
cd server
npm run dev
```
Backend runs on **http://localhost:5000**.

### 2. Start the Frontend (React)
```bash
# Option A: From root directory
npm run client

# Option B: Directly from client folder
cd client
npm start
```
Frontend runs on **http://localhost:3000**.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status & DB connection state |
| `GET` | `/api/health` | Diagnostic health check (DB status, server time) |
| `GET` | `/api/items` | Fetch all items |
| `GET` | `/api/items/:id` | Fetch single item by ID |
| `POST` | `/api/items` | Create new item (`{ title, description, status }`) |
| `PUT` | `/api/items/:id` | Update item by ID |
| `DELETE` | `/api/items/:id` | Delete item by ID |
