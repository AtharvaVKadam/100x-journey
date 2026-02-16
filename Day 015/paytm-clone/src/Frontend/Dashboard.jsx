import { useEffect, useState } from "react";
import api from "./api"; 

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        // Fetch Balance
        api.get("/account/balance").then(res => setBalance(res.data.balance));
    }, []);

    useEffect(() => {
        // Fetch Users based on search filter
        api.get("/user/bulk?filter=" + filter).then(res => setUsers(res.data.user));
    }, [filter]);

    return (
        <div className="bg-slate-50 min-h-screen p-8">
            <h1 className="text-3xl font-bold border-b pb-4">Paytm App</h1>
            
            <div className="my-8">
                <span className="font-bold text-xl">Your Balance: </span>
                <span className="font-semibold text-xl">₹{balance}</span>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Users</h2>
                <input 
                    onChange={(e) => setFilter(e.target.value)}
                    type="text" placeholder="Search users..." 
                    className="border p-2 rounded w-full md:w-1/2"
                />
                
                <div className="flex flex-col gap-2">
                    {users.map(user => (
                        <User key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

function User({ user }) {
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-xl">
                    {user.firstName[0]}
                </div>
                <div className="font-semibold">{user.firstName} {user.lastName}</div>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 transition">
                Send Money
            </button>
        </div>
    );
}