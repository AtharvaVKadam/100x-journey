import { useState } from "react";

function App(){

    const [count,setCount] = useState(0);
    const [n,setN] = useState(0);

function Counter(){
    setCount(count + 1);
}

function Sum(){

    let ans = 0;

    for( let i = 0; i<=n ; i++){
        ans = ans + i;
    }

    return ans;
}
    return<>
        <input 
            type = "number"
            placeholder="Give me a number"
            onChange={(e) => {setN(Number(e.target.value))}} 
        >    
        </input>
        <h1>Sum is {Sum()}</h1>
        <button onClick={Counter}>Counter {count}</button>
    </>
}

export default App;