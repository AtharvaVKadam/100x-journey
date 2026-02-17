import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">People</h2>
                <div className="relative">
                    <input 
                        onChange={(e) => setFilter(e.target.value)}
                        type="text" 
                        placeholder="Search users..." 
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-64 text-sm"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
            <div className="space-y-4">
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    )
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-700 font-bold text-lg shadow-sm group-hover:shadow-md transition">
                {user.firstName[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-gray-500">User ID: ...{user._id.slice(-4)}</span>
            </div>
        </div>

        <button onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
        }} className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium transition transform active:scale-95 shadow-lg shadow-gray-200">
            Send Money
        </button>
    </div>
}