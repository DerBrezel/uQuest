import React from 'react';
import {ButtonGroup, Button} from "react-bootstrap";

function PlayerChoice({choices, text1, text2, onClick}) {

    return (
            <ButtonGroup vertical className={"playerChoiceButton"}>
                {choices.map((job, i)=>{
                    return (<Button onClick={()=>onClick(i)}>{text1}{choices[i]}{text2}</Button>)
                })}
            </ButtonGroup>
    );
}

export default PlayerChoice;