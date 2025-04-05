import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({ message: "API Working" })
})

// Webhook route
app.post('/clerk', clerkWebhooks)

// Start server function
const startServer = async () => {
    try {
        // Connect to database
        await connectDB()
        
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

// Start the server
startServer()