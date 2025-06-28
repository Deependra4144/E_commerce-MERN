import app from './app.js'

import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import connectDB from './config/database.js'

dotenv.config({ path: "backend/config/config.env" })

// handling Uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shuting down the server due to Uncaught exception`)

    server.close(() => {
        process.exit(1)
    })
})
connectDB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server working on http://localhost:${process.env.PORT}`)
})

//unhandled Promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the servre due to Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1);
    })
})