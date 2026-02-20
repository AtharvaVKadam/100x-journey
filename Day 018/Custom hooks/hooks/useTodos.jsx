import { useEffect, useState } from "react";
import axios from "axios";

function useTodos(){ 
    
    const [todos,setTodos] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        axios.get("")
        .then(res => {
            setTodos(res.data.todos);
            setLoading(false);
        })
    }, [])

    return { todos, loading };
}

export default useTodos;


