import axios from "axios";
import { useEffect, useState } from "react";

function App(){

    const [todos, setTodos] = useState([]);

    useEffect( () => {
        axios.get("http://localhost:3000/todo")
            .then(function (response) {
                setTodos(response.data.todos);
            })
    },[])
    return <div>
        {todos.map(todo => < Todo key = {todo.id} title = {todo.title} description = {todo.description}/>)}
        </div>
}

function Todo({title,description}){
    return<>
        <h1>{title}</h1>
        <h2>{description}</h2>
    </>
}
export default App;