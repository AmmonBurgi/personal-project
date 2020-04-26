import React, {Component} from 'react'
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
`;

const About = styled('p')`
width: 40%;
margin-top: 30px;
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
    margin: 5px;
    padding: 10px;
    // border: 3px solid #557A95;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`

const TitleStyled = styled('p')`
font-size: 30px;
`
class Home extends Component{
    constructor(){
        super()
        this.state = {
            userGoals: []
        }
    }

    componentDidMount(){
        this.getGoals()
    }

    getGoals = () => {
        axios.get('/api/userGoals/')
        .then(res => {
            // console.log(res)
            this.setState({
                userGoals: res.data[0]
            })
        })
    }

    render(){
        // console.log(this.state.userGoals)
        return(
            <HomeStyled>
                <BorderStyle> </BorderStyle>
                <About>The 'Journal Of Life' was designed to be an easy way to record and save all your adventures through life! The app also allows you to set Goals that you can work towards. A Chat Room is provided so that you can share your ideas and adventures with other users.
                    Please enjoy!
                </About>
                <Map>
                    <p>{this.state.userGoals.username}'s Goal:</p>
                    {!this.state.userGoals.title ? (<TitleStyled>No Goals Have Been Set!</TitleStyled>) : (<TitleStyled>{this.state.userGoals.title}</TitleStyled>)}
                    
                </Map>
                
                    <Feedback />
                   
            </HomeStyled>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Home)