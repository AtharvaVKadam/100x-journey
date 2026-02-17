import { Appbar } from "../pages/Appbar";
import { BalanceCard } from "../pages/BalanceCard" 
import { Users } from "../pages/Users"
import { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setBalance(response.data.balance);
            })
            .catch(error => {
                console.error("Error fetching balance:", error);
            });
        }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-64 bg-white border-r border-gray-200 hidden md:block p-6">
                <div className="flex items-center gap-2 mb-10 text-blue-700 font-bold text-2xl">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                    PayTM App
                </div>
                <nav className="space-y-2">
                    <SidebarItem icon="🏠" text="Dashboard" active />
                    <SidebarItem icon="💸" text="Transactions" />
                    <SidebarItem icon="👤" text="Profile" />
                    <SidebarItem icon="⚙️" text="Settings" />
                </nav>
            </div>

            <div className="flex-1">
                <Appbar />
                <div className="p-8 max-w-6xl mx-auto space-y-8">
                    
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Good Morning, User! 👋</h1>
                        <p className="text-gray-500 mt-1">Here is what's happening with your money today.</p>
                    </div>

                    <BalanceCard value={balance} />
                    <Users />
                </div>
            </div>
        </div>
    )
}

function SidebarItem({ icon, text, active }) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}>
            <span>{icon}</span>
            <span className="font-medium">{text}</span>
        </div>
    )
}