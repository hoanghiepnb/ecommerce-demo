import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String },
    sessionId: { type: String, required: true },
    email: { type: String },
    amountTotal: { type: Number },
    items: [
        {
            name: String,
            size: String,
            color: String,
            quantity: Number,
            price: Number,
        }
    ],
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
