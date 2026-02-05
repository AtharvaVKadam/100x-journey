export function Todos({todos}) {
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", 
            gap: "20px",
            padding: "20px"
        }}>
            {todos.map(function(todo) {
                return (
                    <div key={todo._id} style={{
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "20px",
                        width: "300px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderTop: todo.completed ? "5px solid #4CAF50" : "5px solid #FF5722" 
                    }}>
                        <div>
                            <h2 style={{ margin: "0 0 10px 0", fontSize: "20px", color: "#333", fontFamily: "Arial, sans-serif" }}>
                                {todo.title}
                            </h2>
                            <p style={{ color: "#666", fontFamily: "Arial, sans-serif" }}>
                                {todo.description}
                            </p>
                        </div>

                        <button 
                            style={{
                                marginTop: "20px",
                                padding: "10px",
                                background: todo.completed ? "#e8f5e9" : "#fff3e0", 
                                color: todo.completed ? "#2e7d32" : "#e64a19",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                fetch("http://localhost:3000/completed", {
                                    method: "PUT",
                                    body: JSON.stringify({ id: todo._id }),
                                    headers: { "Content-type": "application/json" }
                                }).then(async (res) => {
                                    await res.json();
                                    alert("Marked as done!");
                                })
                            }}
                        >
                            {todo.completed ? "✅ Completed" : "Mark as Complete"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}