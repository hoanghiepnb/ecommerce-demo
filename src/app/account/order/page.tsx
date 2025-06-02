'use client'

import { useEffect, useState } from 'react'

interface OrderItem {
    name: string
    quantity: number
    price: number
    size: string
    color: string
}

interface Order {
    _id: string
    email: string
    amountTotal: number
    createdAt: string
    items: OrderItem[]
}

export default function AccountPage() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/account/orders')
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) throw new Error('Invalid response')
                setOrders(data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch orders:', err)
                setOrders([])
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="p-8 text-center text-xl">Loading orders...</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

            {orders.length === 0 ? (
                <p className="text-gray-600">You have no orders yet.</p>
            ) : (
                <ul className="space-y-6">
                    {orders.map((order) => (
                        <li key={order._id} className="border p-4 rounded-md">
                            <p className="text-gray-700 mb-1">
                                <strong>Order ID:</strong> {order._id}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Email:</strong> {order.email}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-700 mb-3">
                                <strong>Total:</strong> ${(order.amountTotal / 100).toFixed(2)}
                            </p>

                            <ul className="text-left space-y-1 text-sm">
                                {order.items.map((item, i) => (
                                    <li key={i}>
                                        {item.name} — Qty: {item.quantity}, Size: {item.size}, Color: {item.color}, Price: ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
