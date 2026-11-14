// npm install react-hot-toast

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] =useState(false)
    const navigate = useNavigate()

    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:8000/signup', {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            toast.success(data.message || "User registered");
            
            if (data.user?.token) {
            localStorage.setItem("token", data.user.token);
            }
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "User registration failed");
        }
    };


    return (
        <div className='flex items-center justify-center md:p-5 p-2 w-screen h-screen'>
            <form onSubmit={signupHandler} className='shadow-lg w-full max-w-md flex flex-col gap-1 p-8 rounded-md '>
                <div className='my-2'>
                    <h1 className='text-center font-bold text-xl'>Signup</h1>
                </div>
                <div className='gap-3 flex flex-col mb-2' >
                    <span className='font-medium'>Username</span>
                    <input type="text" name="username" placeholder='Username' 
                        value={username} 
                        className="focus:outline-none focus:ring-1 focus:ring-blue-500 w-full px-2 py-1  rounded border-2 border-gray-300 " 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='gap-3 flex flex-col mb-2'>
                    <span className='font-medium'>Email</span>
                    <input type="email" name="email" placeholder='@email.com'
                        value={email} 
                        className="focus:outline-none focus:ring-1 focus:ring-blue-500 w-full px-2 py-1  rounded border-2 border-gray-300 " 
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className='gap-3 flex flex-col mb-2'>
                    <span className='font-medium'>Password</span>
                    <input type="password" name="password" placeholder='Password...'
                        value={password} 
                        className="focus:outline-none focus:ring-1 focus:ring-blue-500 w-full px-2 py-1  rounded border-2 border-gray-300 " 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {
                loading ? (
                    <button>
                        Please wait...
                    </button>
                ) : (
                    <button type="submit" className="mt-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-md py-1">Signup</button>
                )
                }

                {/* <button type="submit" className="mt-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-md py-1">Signup</button> */}

                <span className='text-center mt-4'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link> </span>
            </form>
        </div>
    )
}

export default Signup
