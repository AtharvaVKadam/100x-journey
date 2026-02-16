import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <h1 className="font-bold text-4xl pt-6">Sign in</h1>
                <p className="text-slate-500 text-md pt-1 px-4 pb-4">
                    Enter your credentials to access your account
                </p>

                <div className="text-sm font-medium text-left py-2">Email</div>
                <input onChange={e => setUsername(e.target.value)} placeholder="harkirat@gmail.com" className="w-full px-2 py-1 border rounded border-slate-200" />

                <div className="text-sm font-medium text-left py-2">Password</div>
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="123456" className="w-full px-2 py-1 border rounded border-slate-200" />

                <div className="pt-4">
                    <button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
                </div>

                <div className="py-2 text-sm flex justify-center">
                    <div>Don't have an account?</div>
                    <Link className="pointer underline pl-1 cursor-pointer" to={"/signup"}>Sign up</Link>
                </div>
            </div>
        </div>
    </div>
}