
# SPA Application

This is a full-stack web application consisting of a **React frontend (client)** and an **Express + MongoDB backend (server)**.
## 📁 Project Structure

root/

├── client/ # React frontend (Vite)

├── server/ # Express backend with MongoDB

└── README.md # Project documentation

---

## 🚀 Tech Stack

### Frontend (`client/`)
- React 18
- Vite
- Tailwind CSS
- React Hook Form + Zod
- Axios
- React DatePicker
- React Icons
- Hot Toast (notifications)

### Backend (`server/`)
- Express.js
- MongoDB & Mongoose
- CORS
- dotenv

---
## 🔧 Setup Instructions

- Clone the project

```bash
  git clone https://github.com/eeshalteluri/karl-spa.git
```

- Go to the project directory

### Environment Variables


To run this project, you will need to add `.env` files. One in client directory, and other in server directory.

### Frontend (client)
- Go to the `client` folder
- Create a `.env` file inside the client folder, and add:
`VITE_BACKEND_URL` variable

`VITE_BACKEND_URL`= `http://localhost:5005` (for development)

`VITE_BACKEND_URL`= `<your-backend-url>` (for production)

### Backend (server)
- Go to the `server` folder
- Create a `.env` file inside the server folder, and add:
`URI`, `PORT`, `FRONTEND_URL` variables.

`URI`=`<your-mongodb-connection-uri>`

`PORT`=`5005`

`FRONTEND_URL` = `http://localhost:5173` (for development)

`FRONTEND_URL` = `<your-backend-url>` (for production)

### Installing Dependencies

- Start both client and server in separate terminals.

#### for Client(Frontend)

```bash
  cd client
  npm install
```
#### for Server(Backend)

```bash
  cd server
  npm install
```

### Development Mode (Run locally)

Start both client and server in separate terminals.

#### on Client(Frontend)

```bash
  cd client
  npm run dev
```

#### on Server(Backend)

```bash
  cd client
  npm run dev
```

### Build for Production

#### Client (Production Build)

```bash
  cd client
  npm run build
```

#### on Server(Backend)

```bash
  cd client
  npm start
```

### Linting

```bash
  cd client
  npm run lint
```

## Notes
- This application assumes CORS is enabled on the backend to allow requests from the frontend.

- Ensure MongoDB service is running or accessible (e.g., via MongoDB Atlas).

- If using HTTPS or deploying to production, make sure to update the environment variables accordingly.

---

Let me know:
- If you want to include any other instructions.




    
