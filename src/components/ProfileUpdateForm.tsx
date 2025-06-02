'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProfileUpdateForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        image: '',
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('/api/me').then((res) => {
            const data = res.data
            setFormData({
                name: data.name ?? '',
                email: data.email ?? '',
                phone: data.phone ?? '',
                bio: data.bio ?? '',
                image: data.image ?? '',
            })
        })
    }, [])

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.put('/api/me', formData)
            setSuccess(true)
        } catch (err) {
            console.error('Failed to update profile', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Enter your phone number"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Tell us about yourself"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        placeholder="Profile picture URL"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>

                {success && (
                    <p className="text-green-600 text-center pt-2">Profile updated successfully!</p>
                )}
            </form>
        </div>
    )
}
