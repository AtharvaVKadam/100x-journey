import React, { useState } from "react";

function App(){
    const [count, setCount] = useState(0);

    return (
        <div>
            <Button count = {count} setCount = {setCount}></Button>
        </div>
    )
}

function Button(props){
    function OnButtonClick() {
        props.setCount(props.count + 1);
    }
    return(
        <button onClick={OnButtonClick}>Counter {props.count}</button>
    )
}

export default App