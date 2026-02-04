import React, { useState } from "react";

function App(){

    const [bulb, setBulb] = useState(false);

    return(
        <>
            <Exhausted bulb ={bulb} setBulb ={setBulb} />
       </>
    )
}

function Exhausted(props){
    function toggleSwicth(){
        props.setBulb(!props.bulb)
    }

    return(
        <>
        <button onClick={toggleSwicth}>Toggle Switch</button>
            {props.bulb == false ?(              
                <h1>Bulb is off</h1>
            ) : (
                <h1>Bulb is on </h1>
            )    
        }

        </>
    )
}


export default App;