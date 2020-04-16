import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
class CreateEntry extends Component{
constructor(){
    super()
    this.state = {
        date: '',
        title: '',
        content: ''
    }
}

createEntry = () => {
    const {user_id} = this.props.user
    const {date, title, content} = this.state
    axios.post(`/api/createEntry/${user_id}`, {title, content, date})
    .then(() => this.props.history.push('/entries'))
    .catch(err => console.log(err))
}

handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

    render(){
        return(
            <div className='create-entry'>
                <input placeholder='Date' onChange={e => this.handleChange(e)} className='date-input' name='date' />
                <input placeholder='Title' onChange={e => this.handleChange(e)} className='title-input' name='title' />
                <input placeholder='Content' onChange={e => this.handleChange(e)} className='content-input' name='content' />
                <button onClick={this.createEntry}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(CreateEntry)