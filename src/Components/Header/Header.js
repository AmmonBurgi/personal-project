import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

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
            <div className='Header'>
                <Link to='/home'><button className='home-button'>Home</button></Link>
                <Link to='/entries'><button className='entry-button'>Entries</button></Link>
                <Link to='/goals'><button className='goal-button'>Goals</button></Link>
                <Link to='/'><button className='logout-button' onClick={this.logout}>Logout</button></Link>
            </div>
        )
    }
}

export default Header