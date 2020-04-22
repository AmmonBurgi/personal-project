import React, { Component } from 'react';
import {getUser} from '../../redux/reducer';
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'

const AuthStyle = styled('div')`
display: flex;
justify-content: center;
align-items: center; 
position: relative;
background: #7295AE;
width: 100%;
height: 100vh;
`;

const Form = styled('div')`
display: flex;
position: relative;
border-radius: 5px;
flex-direction: column;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
justify-content: space-evenly;
align-items: center;
background: #B1A296;
color:  #696e75;
padding: 10px;
width: 45%;
height: 500px;
margin: 10%
`;

const Logo = styled('img')`
width: 200px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 5px;
`; 

const Inputs = styled('input')`
border: none;
border-bottom: 3px solid #557A95;
background: transparent;
color: #696e75;
width: 215px;
font-size: 20px;
`;

const ButtonsStyle = styled('button')`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
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

const Toggle = styled('button')`
border: none;
background: transparent;
color: #557A95;
font-size: 15px;
`;

const Tag = styled('p')`
position: absolute;
bottom: 5px;
left: 36%;
// margin: 10px;
`;

const AltTag = styled('p')`
position: absolute;
bottom: 0px;
left: 34%;
`;

class Auth extends Component{
constructor(){
    super()
    this.state = {
        email: '',
        username: '',
        password: '',
        toggle: true
    }
}

register = () => {
    const {email, username, password} = this.state
    axios.post('/api/register', {email, username, password})
    .then(res => {
        this.props.getUser(res.data)
        this.props.history.push('/home')
    }).catch(err => alert('Failed to Register!'))
}

login = () => {
    const {email, password} = this.state
    axios.post('/api/login', {email, password})
    .then(res => {
        // console.log(res.data)
        this.props.getUser(res.data)
        this.props.history.push('/home')
    }).catch(err => alert('Failed to Login!'))
}

handleToggle = () => {
    this.setState({
        toggle: !this.state.toggle
    })
}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

    render(){
        return(
            <AuthStyle>
                
                {this.state.toggle ?
                (
                    <Form>
                        <Logo src='assets/Free_Sample_By_Wix.jpeg' alt='logo' />
                        <Inputs className='email-input' placeholder='Email' name='email' onChange={e => this.handleChange(e)} />
                        <Inputs className='pass-input' type='password' placeholder='Password' name='password' onChange={e => this.handleChange(e)} />
                        <div>
                            <ButtonsStyle className='login-register' onClick={this.login}>Login</ButtonsStyle>
                            <Tag>Need an account?<Toggle className='toggle-button' onClick={this.handleToggle}>Register</Toggle></Tag> 
                        </div>
                    </Form>
                ) 
                : 
                (
                    <Form>
                        <Logo src='assets/Free_Sample_By_Wix.jpeg' alt='logo' />
                        <Inputs className='email-input' placeholder='Email' name='email' onChange={e => this.handleChange(e)} />
                        <Inputs className='user-input' placeholder='Username' name='username' onChange={e => this.handleChange(e)} />
                        <Inputs type='password' className='pass-input' placeholder='Password' name='password' onChange={e => this.handleChange(e)} />
                        <div>
                            <ButtonsStyle className='login-register' onClick={this.register}>Register</ButtonsStyle>
                            <AltTag>Already Have Account?<Toggle className='toggle-button' onClick={this.handleToggle}>Login</Toggle></AltTag>
                       </div>
                    </Form>
                )}

            </AuthStyle>
        )
    }
}

// const mapStateToProps = (reduxState) => reduxState

export default connect(null, {getUser})(Auth)