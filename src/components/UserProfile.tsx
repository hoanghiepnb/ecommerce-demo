'use client'

import { useEffect, useState } from 'react'

export default function UserProfile() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        fetch('/api/me')
            .then(res => res.json())
            .then(setUser)
    }, [])

    if (!user) return <div>Loading...</div>

    return (
        <div className="p-4 rounded shadow border w-fit">
            <img src={user.image} alt="Avatar" className="w-16 h-16 rounded-full" />
            <p className="font-bold">{user.name}</p>
            <p>{user.email}</p>
        </div>
    )
}
