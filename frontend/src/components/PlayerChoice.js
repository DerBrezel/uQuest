import React from 'react';
import {Row, ButtonGroup, Button} from "react-bootstrap";

function PlayerChoice({choices, text1, text2, onClick}) {

    return (
        <div style={{border: '2px solid #000000', borderRadius: '15px'}}>
            <ButtonGroup vertical className={"playerChoiceButton"}>
                {choices.map((job, i) => {
                    return (<Row style={{margin: '1rem'}}><Button
                        onClick={() => onClick(i)}>{text1}{choices[i]}{text2}</Button></Row>)
                })}
            </ButtonGroup>
        </div>
    );
}

export default PlayerChoice;