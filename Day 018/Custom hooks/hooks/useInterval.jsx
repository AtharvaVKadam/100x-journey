import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
    
  }, []);

  return (
    <div>
      <h1>Auto-Counter: {count}</h1>
    </div>
  );
}