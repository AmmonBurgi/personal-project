import React, { Component } from 'react';
import {getUser} from '../../redux/reducer';
import {connect} from 'react-redux'
import axios from 'axios'
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
        getUser(res.data)
        this.props.history.push('/home')
    })
}

login = () => {
    const {email, password} = this.state
    axios.post('/api/login', {email, password})
    .then(res => {
        console.log(res.data)
        getUser(res.data)
        this.props.history.push('/home')
    })
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
            <div className='auth'>
                {this.state.toggle ?
                (
                    <div className='auth-form'>
                        <input className='email-input' placeholder='Email' name='email' onChange={e => this.handleChange(e)} />
                        <input className='pass-input' placeholder='Password' name='password' onChange={e => this.handleChange(e)} />
                        <button className='login-register' onClick={this.login}>Login</button>
                        <button className='toggle-button' onClick={this.handleToggle}>Register Here</button>
                    </div>
                ) 
                : 
                (
                    <div className='auth-form'>
                        <input className='email-input' placeholder='Email' name='email' onChange={e => this.handleChange(e)} />
                        <input className='user-input' placeholder='Username' name='username' onChange={e => this.handleChange(e)} />
                        <input className='pass-input' placeholder='Password' name='password' onChange={e => this.handleChange(e)} />
                        <button className='login-register' onClick={this.register}>Register</button>
                        <button className='toggle-button' onClick={this.handleToggle}>Login Here</button>
                    </div>
                )}

            </div>
        )
    }
}

// const mapStateToProps = (reduxState) => reduxState

export default connect(null, getUser)(Auth)