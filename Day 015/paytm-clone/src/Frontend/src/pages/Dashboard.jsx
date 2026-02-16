import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch Balance
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }).then(response => {
            setBalance(response.data.balance);
        })
        
        // Fetch Users
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }).then(response => {
            setUsers(response.data.user)
        })
    }, [filter])

    return <div className="p-8">
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="font-bold text-xl">Paytm App</div>
            <div className="flex items-center">
                <div className="mr-4">Hello, User</div>
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-xl">U</div>
            </div>
        </div>

        <div className="m-8">
            <div className="font-bold text-lg">Your balance: ₹{balance}</div>
            
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            
            <div>
                {users.map(user => (
                    <div key={user._id} className="flex justify-between items-center p-2 border-b">
                        <div className="flex items-center">
                            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-xl mr-2">
                                {user.firstName[0]}
                            </div>
                            <div className="font-semibold">{user.firstName} {user.lastName}</div>
                        </div>
                        <button onClick={() => {
                            navigate("/send?id=" + user._id + "&name=" + user.firstName);
                        }} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-900">Send Money</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
}