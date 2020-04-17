import React, { Component } from 'react';
import axios from 'axios'

class EntryDisplay extends Component{
constructor(){
    super()
    this.state = {
        entry: [],
        toggle: true,
        date: '',
        title: '',
        content: ''
    }
}

componentDidMount = () => {
    this.getEntry()
}

getEntry = () => {
    const {id} = this.props.match.params
    axios.get(`/api/getEntry/${id}`)
    .then(res => {
        console.log(res.data)
        this.setState({
            entry: res.data[0]
        })
    })
}

delete = () => {
    const {id} = this.props.match.params
    axios.delete(`/api/deleteEntry/${id}`)
    .then(() => {
        this.props.history.push('/entries')
    }).catch(err => console.log(err))
}

handleToggle = () => {
    this.setState({
        toggle: !this.state.toggle
    })
}

handleChange = (e) => {
 this.setState({
    [e.target.name]: e.target.value
 })
}

handleEdit = () => {
const {date, title, content} = this.state
// if statements makes sure date, title, content are not passed up to the server as empty strings vv
let newDate = '' 
let newTitle = ''
let newContent = ''
if(date === ''){
    newDate = this.state.entry.date
} else {
    newDate = date
}
if(title === ''){
    newTitle = this.state.entry.title
} else {
    newTitle = title
}
if(content === ''){
    newContent = this.state.entry.content
} else {
    newContent = content
}
const {id} = this.props.match.params
axios.put(`/api/editEntry/${id}`, {newDate, newTitle, newContent})
.then(() => {
    this.handleToggle()
    this.getEntry()
}).catch(err => console.log(err))
}

    render(){
        // console.log(this.state.date)
        // console.log(this.state.entry.date)
        const {entry} = this.state
        return(
            <div className='entry'>
                {this.state.toggle ? 
                (
                <div className='entry-display-content'>
                        <p className='date'>{entry.date}</p>
                        <p className='title'>{entry.title}</p>
                        <p className='content'>{entry.content}</p>
                        <button onClick={this.delete}>Delete</button>
                        <button onClick={this.handleToggle}>Edit</button>
                </div>
                ) : 
                (
                    <div>
                        <input value={this.state.date || entry.date} onChange={e => this.handleChange(e)} name='date' />
                        <input value={this.state.title || entry.title} onChange={e => this.handleChange(e)} name='title'/>
                        <input value={this.state.content || entry.content} onChange={e => this.handleChange(e)} name='content'/>
                         <button onClick={this.handleEdit}>Confirm Edit</button>
                    </div>
                )}
              
            </div>
        )
    }
}

export default EntryDisplay