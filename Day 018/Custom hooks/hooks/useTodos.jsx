import { useEffect, useState } from "react";
import axios from "axios";

function useTodos(){ 
    
    const [todos,setTodos] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        function fetchTodos(){
            axios.get("")
                .then(res => {
                    setTodos(res.data.todos);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching todos:", err);
                    setLoading(false);
                });
            }
            fetchTodos();

            const intervalId = setInterval( fetchTodos, 10000 );

            return() => {
                clearInterval(intervalId);
            }
    }, [])

    return { todos, loading };
}

export default useTodos;


