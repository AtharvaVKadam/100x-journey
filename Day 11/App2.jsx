import { useState, useContext, createContext } from "react";

const CountContext = createContext();

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CountContext.Provider value={{ count, setCount }}>
        <MiddleComponent />
      </CountContext.Provider>
    </div>
  );
}

function MiddleComponent() {
  return (
    <div>
      <h1>I don't need props anymore! 😎</h1>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const { count } = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons() {
  const { setCount } = useContext(CountContext);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Increase
    </button>
  );
}

export default App;