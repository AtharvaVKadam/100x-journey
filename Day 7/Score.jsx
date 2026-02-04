import React, { useState } from "react";

function App (){

    const [scoreTeamA, setScoreTeamA] = useState(0);
    const [scoreTeamB, setScoreTeamB] = useState(0);

    return(
        <>
            <Team
                name = "Team A" 
                score = {scoreTeamA} 
                setScore = {setScoreTeamA} />
            <Team 
                name = "Team B"
                score = {scoreTeamB} 
                setScore = {setScoreTeamB} />
        </>
    )
}

function Team(props){
    function Score(){
        props.setScore(props.score + 1)
    }
    return (
        <>
            <h2>{props.name}</h2>
            <h2>{props.score}</h2>
            <button onClick={Score}>Add Score</button>
        </>
    )
}

export default App;