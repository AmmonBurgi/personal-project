import React, { useEffect, useState } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const GoalStyle = styled('div')`
display: flex;
justify-content: center;
font-size: 30px;
background: #7295AE;
height: 85.4vh;
`
const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    margin-right: 10px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    background: white;
    border: 2px solid #557A95;
    color: black;
    font-family: Andale Mono;
    text-align: center;
    font-size: 12px;
    transition: .5s;
    &:hover {
        background:   #B1A296;
        font-weight: bolder;
        color:  white;
    }
`;

const InnerDisplay = styled('div')`
display: flex; 
flex-direction: column;
align-items: center;
border: 5px solid white;
border-radius: 5px;
margin-top: 20px;
margin-bottom: 7px;
// padding: 10px;
width: 80vw;
height: 70%;
// horizontal-overflow: scroll;
position: relative;
`;

const TitleStyle = styled('p')`
position: absolute;
top: 0px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// bottom-border: 2px solid black;
// text-decoration: underline;
`

const ContentBorder = styled('div')`
padding: 10px;
width: 95%;
height: 80%;
border: 3px solid white;
border-radius: 5px;
overflow-wrap: break-word;
word-wrap: break-word;
position: absolute;
bottom: 10px;
`
const ContentStyle = styled('p')`
font-size: 17px;
width: 99%;
overflow-wrap: break-word;
word-wrap: break-word;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
text-align: left;
// position: absolute;
// left: 0px;
`
const BackStyle = styled('button')`
width: 65px;
height: 40px;
border-radius: 5px;
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
font-size: 25px;
font-weight: bolder;
position: absolute;
left: 3%;
top: 140px;
z-index: 1000;
transition: .5s;
&:hover {
    background: #B1A296;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
`;
const GoalDisplay = (props) => {

const [goal, setGoal] = useState([]) 

const getGoal = () => {
    const {id} = props.match.params
    axios.get(`/api/getGoal/${id}`)
    .then(res => {
            setGoal(res.data[0])
    })
}

const deleteGoal = (props) => {
    // console.log(props)
    const {id} = props.match.params
    axios.delete(`/api/deleteGoal/${id}`)
    .then(() => props.history.push('/goals'))
}

const goBack = () => {
    props.history.push('/goals')
}

useEffect((props) => getGoal(props))
        return(
            <GoalStyle>
                <BackStyle onClick={goBack}>&#8592;</BackStyle>
                <div>
                    <InnerDisplay>
                        <TitleStyle>{goal.title}</TitleStyle> 
                        <ContentBorder>
                            <ContentStyle>{goal.content}</ContentStyle>
                        </ContentBorder>
                    </InnerDisplay>

                    
                    
                    <ButtonsStyle onClick={() => deleteGoal(props)}>Delete</ButtonsStyle>
                </div>
            </GoalStyle>
        )
    }

export default GoalDisplay