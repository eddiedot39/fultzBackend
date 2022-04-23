import mongoose from 'mongoose';

export default async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO)
        console.log(`Mongoose connected on ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}