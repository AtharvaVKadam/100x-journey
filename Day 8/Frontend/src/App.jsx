import { useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { useEffect } from 'react';

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
    <>
     <CreateTodo />
     <Todos todos={todos} />
    </>
  )
}

export default App
