import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { PORT, URI, FRONTEND_URL } from './config/index.js'
import App from './routes/App.js'

const server = express()

server.use(cors({origin: [`${FRONTEND_URL}`]}));
server.use(express.json());

mongoose
    .connect(URI)
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

server.use(App)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})