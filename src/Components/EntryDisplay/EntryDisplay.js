import React, { Component } from 'react';
import axios from 'axios'

class EntryDisplay extends Component{
constructor(){
    super()
    this.state = {
        entry: []
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
            entry: res.data
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
    render(){
        // console.log(this.state.entry[0])
        let entryMap = this.state.entry.map((element, index) => {
            return <div className='entry-display' key={index}>
                    <p className='date'>{element.date}</p>
                    <p className='title'>{element.title}</p>
                    <p className='content'>{element.content}</p>
                    <button onClick={this.delete}>Delete</button>
                </div>
        })
        return(
            <div className='entry'>
                {entryMap}
            </div>
        )
    }
}

export default EntryDisplay