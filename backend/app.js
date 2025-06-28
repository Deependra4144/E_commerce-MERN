import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: process.env.CORSE_ORIGIN,
    credentials: true
}))

//Route Imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from './routes/orderRoute.js';


app.use('/api/v1', user)
app.use('/api/v1', product)
app.use('/api/v1', order)

export default app