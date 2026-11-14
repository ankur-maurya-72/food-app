import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate} from 'react-router-dom'
import { AiTwotoneDelete } from "react-icons/ai";

const Home = () => {
    const [todos, setTodos] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [newTodo, setNewTodo] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        const fetchtodos = async () => {
            try{
                setLoading(true)
                const response = await axios.get('http://localhost:8000/todo/fetch',{
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                })
                setTodos(response.data.todos)
                setError(null)
            }catch(error){
                setError("Failed to fetch todos")
            }finally{
                setLoading(false)
            }
        }
        fetchtodos()
    },[])

    const todoCreate = async () => {
    if (!newTodo) return;
    try {
        const response = await axios.post('http://localhost:8000/todo/create', {
            text: newTodo,
            completed: false
        }, {
            withCredentials: true
        });

        // ✅ Fix: Wrap with brackets to form an array
        setTodos([...todos, response.data.newTodo]);
        setNewTodo("");
        }catch (error) {
            setError("Failed to create todos");
        }
    };

    const todoUpdate = async (id) => {
        const todo = todos.find((t) => t._id === id)
        try{
            const response = await axios.put(`http://localhost:8000/todo/update/${id}`,{
                ...todo,
                completed:!todo.completed                
            },{
                withCredentials:true
            })
            setTodos(todos.map((t)=> (t._id===id? response.data.update:t)))
        }catch(error){
            setError("Failed to update todos")
        }
    }

    const todoDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8000/todo/delete/${id}`,{withCredentials:true})
            setTodos(todos.filter((t)=>t._id!==id))
        }catch(error){
            setError("Failed to delete todos")
        }
    }

    const logout = async () => {
        try{
            await axios.get('http://localhost:8000/logout',{withCredentials:true});
            toast.success("User logged out successfully");
            navigate("/login")
            localStorage.removeItem("token");
        }catch(error){
            toast.error("Failed to delete todos")
        }
    }

    const remeningTodo = todos.filter((todo) => !todo.completed).length

  return (
    <div className='bg-gray-300 max-w-md mx-auto  md:mx-auto md:max-w-xl rounded-lg shadow-lg m-10 p-6 '>
        <h1 className='text-pink-400 text-4xl font-bold text-center'>Todo list</h1>
        <div className='my-4 flex md:flex-row flex-col items-center gap-5 '>
            <input type="text" 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && todoCreate()}
                placeholder='Add new text' 
                className='flex-grow w-full focus:outline-none p-2 rounded-md bg-gray-50 '
            />
            <button onClick={todoCreate}  className='bg-green-500 rounded-md text-white px-8 py-2 border-none active:scale-95 hover:bg-green-700 duration-300 cursor-pointer'>Add</button>
        </div>
        { loading?(<div className='text-center'><span className='text-gray-500'>loading...</span></div>): 
            error?(<div className='text-center text-red-500 font-semibold' >{error}</div>):
            (
            <ul className='space-y-2'>
                {
                    
                    todos.map((todo, index) => (
                        <li key={index} className='flex items-center justify-between gap-3 md:gap-5'>
                            <div className='flex items-center w-full p-2 bg-gray-200  rounded-md gap-2'>
                                <input type="checkbox" checked={todo.completed} onChange={()=> todoUpdate(todo?._id)} />
                                <span className={`${todo.completed? "line-through": ""} text-gray-800 font-semibold`}>{todo.text}</span>                    
                            </div>
                            <button onClick={()=>todoDelete(todo._id)} className='bg-red-500 hidden md:flex rounded-md text-white px-6 py-2 border-none hover:bg-red-700 duration-300 cursor-pointer '>Delete</button>
                            <button onClick={()=>todoDelete(todo._id)} className='bg-red-500 md:hidden lg:hidden rounded-full text-white px-2 py-2 border-none hover:bg-red-700 duration-300 cursor-pointer '><AiTwotoneDelete/></button>
                        </li>
                    ))
                
                }
            </ul>
        )}
        <p className='my-6 text-center text-gray-700 text-sm'>{remeningTodo} remening todos</p>
        <button onClick={()=>logout()} className='bg-blue-500 hover:bg-blue-700 w-full rounded-md py-1 duration-300 text-xl cursor-pointer'>Logout</button>
    </div>
  )
}

export default Home
