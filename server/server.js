import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { PORT, URI } from './config/index.js'
import App from './routes/App.js'

const server = express()

server.use(cors({origin: 'https://zapllo-test.vercel.app'}))
server.use(express.json());

mongoose
    .connect(URI)
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

server.use(App)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})