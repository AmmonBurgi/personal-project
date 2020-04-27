import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Feedback from './FeedBack'
import styled from 'styled-components'
import axios from 'axios'

const HomeStyled = styled('div')`
display: flex;
height: 85.4vh;
width: 100%;
align-items: center;
color: white;
flex-direction: column;
position: relative;
font-size: 20px;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// @media (max-width: 1024px) {
//  font-size: 24px;
// }
`;

const About = styled('p')`
width: 82%;
// margin-top: 30px;

`

const BorderStyle = styled('div')`
border-right: 5px solid white;
border-left: 5px solid white;
border-top: 5px solid white;
// margin: 10px;
top: 10px;
position: absolute;
width: 73%;
height: 83.5vh;
// @media (max-width: 768px) {
//     width: 78%
// }
// @media (max-width: 1024px) {
//  width: 76%;   
//  height: 87vh;
// }

`;

const Map = styled('div')`
    // display: flex;
    flex-direction: column;
    width: 40%;
    height: 140px;
    background: white;
    color: #557A95;
    border-radius: 50px;
    font-size: 23px;
    font-family: New Century Schoolbook, TeX Gyre Schola, serif;
    font-weight: bolder;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    // border: 3px solid #557A95;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    // @media (max-width: 768px) {
    // margin-top: 85px;
    // width: 45%;
    // }
    // @media (max-width: 1024px) {
    // width: 58%;
    // height: 220px;
    // margin-top: 80px;
    // font-size: 40px;
    // }
`

const TitleStyled = styled('p')`
font-size: 30px;
// @media (max-width: 1024px) {
//  font-size: 40px;   
// }
`

const InnerBorder = styled('div')`
width: 73%;
border-top: 3px solid white;
border-bottom: 3px solid white; 
display: flex;
justify-content: center;
// @media (max-width: 768px) {
//     width: 78%;
// }
// @media (max-width: 1024px) {
//  width: 76%;   
// }
`;
const Home = (props) =>{

const [userGoals, setGoals] = useState({})
     

const getGoals = () => {
        axios.get('/api/userGoals/')
        .then(res => {
                setGoals(res.data[0])
        })
    }

useEffect(() =>  getGoals())
        return(
            <HomeStyled>
                <BorderStyle> </BorderStyle>
                <InnerBorder>
                    <About>The 'Journal Of Life' was designed to be an easy way to record and save all your adventures through life! The app also allows you to set Goals that you can work towards. A Chat Room is provided so that you can share your ideas and adventures with other users.
                        Please enjoy!
                    </About>
                </InnerBorder>
                <Map>
                    {userGoals ? (<>
                    <p>{userGoals.username}'s Goal:</p>
                    <TitleStyled>{userGoals.title}</TitleStyled></>) : ( <><TitleStyled>No Goals have been set!</TitleStyled></>
                     )}
                   
                    
                </Map>
                
                    <Feedback />
                   
            </HomeStyled>
        )
    }

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Home)