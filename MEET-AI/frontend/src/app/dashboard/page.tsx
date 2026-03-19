'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/apiClient'; 
import UploadZone from './components/UploadZone';

interface UserProfile {
    username: string;
    email: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await apiClient('/users/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[80vh]">
            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.username || 'User'} 👋
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Logged in securely as <span className="font-semibold">{user?.email}</span>
                    </p>

                    <hr className="my-8 border-gray-100" />

                    <UploadZone />
                </>
            )}
        </div>
    );
}