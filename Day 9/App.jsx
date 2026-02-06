import { useState } from "react";

function App(){
     
    const [name, setName] = useState("Atharva")

    function Rerender() {
        setName (Math.random());
    }
    return(
        <>
            <h1>My name is {name}</h1>
            <button onClick={Rerender}>Click me </button>
        </>
    )
}

export default App;