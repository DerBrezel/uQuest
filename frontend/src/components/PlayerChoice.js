import React, {useState} from 'react';
import {Row, Col,} from "react-bootstrap";
import ChatBackground from '../assets/uiElements/pc_background.png';
import CurrentSelection from '../assets/uiElements/compass_left.png';
import './PlayerChoice.css';
import '../assets/Futura Condensed.ttf';

function PlayerChoice({choices, text1, text2, onClick, type}) {
    const [isHovered, setIsHovered] = useState([false, false, false, false, false]);

    function changeHoveredChoice(i) {
        const temp = [false, false, false, false, false]
        temp[i] = true
        setIsHovered(temp)
    }

    return (
        <div style={{backgroundImage: `url(${ChatBackground})`, minHeight: '400px'}}>
            <div style={{minHeight: "100px"}}></div>
            {choices.map((job, i) => {
                return (<Row onMouseEnter={() => {
                    changeHoveredChoice(i)
                }}>
                    <Col>
                        <div
                            onClick={() => onClick(i, type)}><p style={{
                            color: isHovered[i] ? "#FFFFFF" : "#000000",
                            cursor: "pointer"
                        }}>{text1}{choices[i]}{text2}</p>
                        </div>
                    </Col>
                    <Col>
                        <img src={CurrentSelection} height={24} hidden={!isHovered[i]}/> </Col>
                </Row>)
            })}
        </div>
    );
}

export default PlayerChoice;