import mongoose from "mongoose"

export let connectDatabase = async () => {
    try {
        let { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`database connected: ${connection.host}`)
    } catch (err) {
        console.log(`error on database connection: ${err}`)
        process.exit(1)
    }
} 