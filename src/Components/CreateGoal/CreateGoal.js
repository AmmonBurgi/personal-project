import React, { useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import styled from 'styled-components'

const CreateGoalStyle = styled('div')`
width: 100%;
height: 85.4vh;
background: #7295AE;
display: flex;
align-items: center;

flex-direction: column;
`;

const InnerDisplay = styled('div')`
display: flex; 
flex-direction: column;
align-items: center;
border: 5px solid white;
border-radius: 5px;
margin-top: 20px;
padding: 10px;
width: 80vw;
height: 70%;
// horizontal-overflow: scroll;
position: relative;
// @media (max-width: 768px) {
//  width: 75vw;

// }
// @media (max-width: 1024px) {  
//     width: 74vw;
//     height: 80%;
//    }
`;


const TitleStyle = styled('input')`
position: absolute;
top: 35px;
border-radius: 5px;
width: 200px;
height: 20px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// bottom-border: 2px solid black;
// text-decoration: underline;
// @media (max-width: 768px) {
//  font-size: 16px;   
// }
// @media (max-width: 1024px) {  
//  width: 250px;
//  height: 33px;
//  font-size: 19px;
// }
`

const ContentBorder = styled('div')`
padding: 10px;
width: 95%;
height: 80%;
border: 3px solid white;
border-radius: 5px;
// overflow-wrap: break-word;
// word-wrap: break-word;
position: absolute;
bottom: 10px;
display: inline-block;
// @media (max-width: 768px) {
//     width: 92%;
//     height: 83%;
// }
// @media (max-width: 1024px) {
//     height: 87%;
//     width: 93%;   
//    }
`
const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    // margin-right: 10px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    background: white;
    margin-right: 10px;
    // border: 2px solid #557A95;
    color: black;
    font-family: Andale Mono;
    text-align: center;
    font-size: 15px;
    transition: .5s;
    margin-top: 10px;
    &:hover {
        background:   #B1A296;
        font-weight: bolder;
        color:  white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    // @media (max-width: 1024px) {  
    // width: 110px;
    // height: 55px;
    // font-size: 20px;
    // }
`;

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
// @media (max-width: 768px) {
//  width: 55px;
//  height: 35px;
//  position: absolute;
//  left: 2%;
//  top: 190px;   
// }
// @media (max-width: 1024px) {
//     position: absolute;
//     top: 225px;
//     width: 70px;
//     height: 45px;
//     font-size: 30px;   
//    }
`;

const ContentStyle = styled('textarea')`
font-size: 17px;
width: 98%;
height: 98%;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
border-radius: 5px;
// position: absolute;
vertical-align: text-top;
// padding: 11px 0px 11px 0px;
// @media (max-width: 1024px) {
//     font-size: 23px;
//    }
`
const CreateGoal = (props) => {
 const [title, setTitle] = useState('')
 const [content, setContent] = useState('')

const createGoal = (props) => {
    axios.post('/api/createGoal', {title, content})
    .then(() => {
    // console.log(props)
    props.history.push('/goals')
})}

const goBack = (props) => {
    props.history.push('/goals')
}    

        return(
            <CreateGoalStyle>
                <BackStyle onClick={() => goBack(props)}>&#8592;</BackStyle>
                <InnerDisplay>
                    <TitleStyle name='title' onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <ContentBorder>
                        <ContentStyle name='content' onChange={e => setContent(e.target.value)} placeholder='Goal Details' />
                    </ContentBorder>
                </InnerDisplay>
                <ButtonsStyle onClick={() => createGoal(props)}>Confirm</ButtonsStyle>
            </CreateGoalStyle>
        )
    }

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(CreateGoal)