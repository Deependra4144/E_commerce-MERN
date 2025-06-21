import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json())
app.use(cookieParser())
//Route Imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";


app.use('/api/v1', user)
app.use('/api/v1', product)

export default app