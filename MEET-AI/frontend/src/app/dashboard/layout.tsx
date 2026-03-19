'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('meetai_token');

        if (!token) {
            console.warn("Unauthorized access attempt. Redirecting to login...");
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Authenticating session...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">MeetAI</h2>
                <nav className="space-y-4 text-slate-300">
                    <p className="hover:text-white cursor-pointer transition-colors">📊 Overview</p>
                    <p className="hover:text-white cursor-pointer transition-colors">📝 Transcripts</p>
                    <p className="hover:text-white cursor-pointer transition-colors">⚙️ Settings</p>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}