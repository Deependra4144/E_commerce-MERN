import mongoose from 'mongoose';
const DB_NAME = 'Ecommerce'
const connectDB = async () => {
    // befor unhandled promise rejection
    /*try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb connect !! DB HOST : ${connectionInstance}`)
    } catch (error) {
        console.log('mongodb connection faild : ', error)
        process.exit()
    }*/


    // after unhandled promise rejection inside app.js

    const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
    console.log(`\n Mongodb connect !! DB HOST : ${connectionInstance}`)
}

export default connectDB