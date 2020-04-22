import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const HeaderStyle = styled('header')`
display: flex;
justify-content: space-evenly;
align-items: center;
height: 100px;
padding: 10px;
position: relative;
background: #B1A296;
box-shadow: 0px 7px 5px #696e75;
`; 

const Align = styled('div')`
display: flex;
width: 400px;
justify-content: space-evenly;

`;

const Logo = styled('img')`
position: absolute;
left: 30px;
width: 100px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 5px;
`; 

const ButtonsStyle = styled('button')`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    margin: 10px;
    background: #7395AE;
    border: 2px solid #557A95;
    color:  #696e75;
    font-family: Andale Mono;
    text-align: center;
    font-size: 15px;
    transition: 1s;
    &:hover {
        background:  #696e75;
        color: #7395AE;
    }
`;

class Header extends Component{
constructor(){
    super()
    this.state = {

    }
}

logout = () => {
    axios.get('/api/logout')
    .then(() => {
        alert('You are now logged out')
    })
}

    render(){
        return(
            <HeaderStyle>
                <Logo src='assets/Free_Sample_By_Wix.jpeg' alt='logo'/>
                <Align>
                    <Link to='/home'><ButtonsStyle className='home-button'>Home</ButtonsStyle></Link>
                    <Link to='/entries'><ButtonsStyle className='entry-button'>Entries</ButtonsStyle></Link>
                    <Link to='/goals'><ButtonsStyle className='goal-button'>Goals</ButtonsStyle></Link>
                    <Link to='/'><ButtonsStyle className='logout-button' onClick={this.logout}>Logout</ButtonsStyle></Link>
                </Align>
            </HeaderStyle>
        )
    }
}

export default Header