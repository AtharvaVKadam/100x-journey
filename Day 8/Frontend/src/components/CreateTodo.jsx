import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div style={{
            maxWidth: "600px",
            margin: "20px auto", 
            padding: "30px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)", 
            textAlign: "center"
        }}>
            <h2 style={{ marginBottom: "20px", color: "#333", fontFamily: "Arial, sans-serif" }}>Create a New Task</h2>
            
            <input 
                style={{
                    width: "100%",
                    padding: "12px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    boxSizing: "border-box"
                }}
                type="text" 
                placeholder="Title (e.g. Go to Gym)" 
                onChange={(e) => setTitle(e.target.value)}
            /> 
            
            <input 
                style={{
                    width: "100%",
                    padding: "12px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    boxSizing: "border-box"
                }}
                type="text" 
                placeholder="Description (e.g. 5pm to 7pm)" 
                onChange={(e) => setDescription(e.target.value)}
            /> 

            <button 
                style={{
                    padding: "12px 24px",
                    marginTop: "15px",
                    background: "#4CAF50", 
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background 0.3s"
                }}
                onClick={() => {
                    fetch("http://localhost:3000/todo", {
                        method: "POST",
                        body: JSON.stringify({ title: title, description: description }),
                        headers: { "Content-type": "application/json" }
                    }).then(async (res) => {
                        await res.json();
                        alert("Todo added!");
                    })
                }}
            >
                + Add Todo
            </button>
        </div>
    )
}