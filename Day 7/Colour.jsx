import React, { useState } from "react";

function App (){

    const [colour, setColour] = useState("black");

    return(
        <>
            <Colors 
                colour = {colour} 
                setColour = {setColour} />
            <div style = {{
                backgroundColor : colour,
                height : "200px",
                width : "200px",
                marginTop : "20px"
            }}
            >
            </div>
        </>
    )
}

function Colors(props){
    function handleInputChange(e){
        props.setColour(e.target.value)
    }
    return(
        <>
            <input 
                type="text" 
                placeholder="Put Your desired colour"
                onChange={handleInputChange}
            />
        </>
    )
}
    
   

export default App;