import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
// import {toastify} from 'react-toastify'

const HeaderStyle = styled('header')`
display: flex;
justify-content: space-evenly;
align-items: center;
height: 100px;
padding: 10px;
position: relative;
background: #B1A296;
box-shadow: 0px 7px 5px #696e75;
z-index: 100;

@media (max-width: 768px) {
    height: 130px;
}
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
@media (max-width: 768px) {
    width: 135px;
    left: 100px;
}
`; 

const ButtonsStyle = styled('button')`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    // display: initial;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    margin: 10px;
    background: white;
    border: 2px solid #557A95;
    color:  #557A95;
    font-family: Andale Mono;
    text-align: center;
    font-size: 15px;
    transition: 1s;
    &:hover {
        font-weight: bolder;
        background:  #7395AE;
        color: white;
    }
    // @media (max-width: 768px) {
    //     // display: none;
    // }
`;

// const HamBurger = styled('button')`
// display: none;
// position: absolute;
// :active {
//  width: 500px;   
// }
// @media (max-width: 768px) {
//     display: initial;
//     font-size: 40px;
//     background: white;
//     border-radius: 5px;
//     width: 80px;
//     right: 130px;
//     &:hover {
//         background: #7395AE;
//     }
// }
// `

class Header extends Component{
constructor(){
    super()
    this.state = {

    }
}

logout = () => {
    axios.get('/api/logout')
    .then(() => {
        // alert('You are now logged out')
    })
}

    render(){
        return(
            <HeaderStyle>
                <Logo src='assets/Free_Sample_By_Wix.jpeg' alt='logo'/>
                <Align>
                    <Link to='/home'><ButtonsStyle>Home</ButtonsStyle></Link>
                    <Link to='/entries'><ButtonsStyle>Entries</ButtonsStyle></Link>
                    <Link to='/goals'><ButtonsStyle>Goals</ButtonsStyle></Link>
                    <Link to='/chatroom'><ButtonsStyle>Chat</ButtonsStyle></Link>
                    <Link to='/'><ButtonsStyle onClick={this.logout}>Logout</ButtonsStyle></Link>
                </Align>
                {/* <HamBurger>&#9776;</HamBurger> */}
            </HeaderStyle>
        )
    }
}

export default Header