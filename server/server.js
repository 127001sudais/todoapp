import { app } from "./app.js"
import { config } from "dotenv"
import { connectDatabase } from "./config/databse.js"
import cloudindary from "cloudinary"

config({ path: "./config/config.env" })

cloudindary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log("server is running on port " + process.env.PORT)
})
