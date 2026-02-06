import { useState } from "react";

function App(){

    const [todos,setTodos] = useState([{
        title : "Wake Up",
        description :"At 6 am"
    },{
        title : "Wash my face",
        description :"With cleanser"
    },{
        title : "Apply moisturizer",
        description :"Apply 2 layers"
    }])

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    function addTodo(){
        setTodos([...todos,{
            title : title,
            description : description
        }])
            setTitle("");
            setDescription("");
        }

    return(
        <>   
            <input 
                type="text"
                placeholder="Put title here"
                onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>
            <input 
                type="text"
                placeholder="Put description here"
                onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <button onClick={addTodo}>Add Todo</button>
        

            {todos.map(function(todo, index) {
                return (
                    <div key={index} style={{
                        border: "2px solid black", 
                        margin: "10px",             
                        padding: "10px",            
                        borderRadius: "10px"        
                    }}>
                        <h2 style={{ margin: "5px 0" }}>{todo.title}</h2>
                        <p style={{ margin: "0" }}>{todo.description}</p>
                    </div>
                )
            })}
        </>
    )
}

export default App;