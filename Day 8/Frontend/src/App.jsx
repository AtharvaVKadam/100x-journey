import { useState, useEffect } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then(async function(res) {
        const json = await res.json();
        setTodos(json.todos);
      })
  }, [])
  
  return (
    <div style={{ 
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",        
        padding: "20px" 
    }}>
       <h1 style={{ textAlign: "center", fontFamily: "Arial, sans-serif", color: "#333" }}>
         My Todo App
       </h1>
       <CreateTodo />
       <Todos todos={todos} />
    </div>
  )
}

export default App