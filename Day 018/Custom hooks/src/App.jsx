import useTodos from "../hooks/useTodos"

function App() {

  const { todos, loading } = useTodos();

  return (
    <div>
      {loading ? ( <div>Loading...</div> ) :  todos.map(todo => <Track todo = {todo} />)}
    </div>
  )
}

function  Track ({ todo }) {
  return <>
    {todo.title}
    <br />
    {todo.description}
    <br />
  </>
}

export default App;