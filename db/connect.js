import mongoose from 'mongoose';

export default async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://edialimehmeti:nukembajmend@cluster0.8cw3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        console.log(`Mongoose connected on ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}