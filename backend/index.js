// import express from 'express'
// import dotenv from 'dotenv'
// import connectDB from './utils/db.js'
// import cookieParser from 'cookie-parser'
// import cors from 'cors'
// import todoRoute from '../backend/route/todo.route.js'
// import userRoute from '../backend/route/user.route.js'
// import path from "path"


// const app = express()
// dotenv.config()

// // body se data json form me bhejate hai json ko read karane ke liye
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())

// const DIRNAME = path.resolve()

// // backend aur frontend ka middlewares
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true,
//     methods:"GET, POST, PUT, DELETE",
//     allowedHeaders:["Content-Type", "Authorization"]
// }))

// // routes
// app.use('/', userRoute)
// app.use('/todo',todoRoute)


// app.use(express.static(path.join(DIRNAME, "/frontend/dist")))
// app.use("*",(_,res) => {
//     res.sendFile(path.resolve(DIRNAME, "frontend", "dist", "index.html"))
// })

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=>{
//     connectDB()
//     console.log(`Server is runing at port ${PORT}`)
// })





import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import todoRoute from './route/todo.route.js';
import userRoute from './route/user.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

dotenv.config();

// ES Module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Backend routes
app.use('/', userRoute);
app.use('/todo', todoRoute);

// Frontend static files
const frontendPath = path.resolve(__dirname, '../frontend/dist');

app.use(express.static(frontendPath));

// React fallback route (Express 5 compatible)
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

startServer();