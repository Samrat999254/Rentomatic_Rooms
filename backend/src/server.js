import dotenv from 'dotenv';
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config();
const PORT = process.env.PORT || 4000

// app.use(cors())

app.listen(PORT, () => {
    // console.log(process.env.MONGO_URI)
    mongoose
        .connect(process.env.MONGO_URI, { dbName: 'RentomaticRooms' })
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch(error => console.error(error))
    console.log(`Server is running on port ${PORT}`)
})
