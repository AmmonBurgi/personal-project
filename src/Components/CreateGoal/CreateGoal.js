import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
class CreateGoal extends Component{
constructor(){
    super()
    this.state = {
        title: '',
        content: ''
    }
}

createGoal = () => {
    const {title, content} = this.state
    axios.post('/api/createGoal', {title, content})
    .then(() => this.props.history.push('/goals'))
}

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value
    })
}

    

    render(){
        return(
            <div>
                <input name='title' onChange={e => this.handleChange(e)} placeholder='Title' />
                <input name='content' onChange={e => this.handleChange(e)} placeholder='Content' />
                <button onClick={this.createGoal}>Confirm</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(CreateGoal)