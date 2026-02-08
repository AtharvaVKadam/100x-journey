import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <MiddleComponent count={count} setCount={setCount} />
    </div>
  );
}

function MiddleComponent({ count, setCount }) {
  return (
    <div>
      <h1>I am just a messenger! </h1>
      <CountRenderer count={count} />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CountRenderer({ count }) {
  return <div>{count}</div>;
}

function Buttons({ setCount }) {
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Increase
    </button>
  );
}

export default App;