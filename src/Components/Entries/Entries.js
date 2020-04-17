import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import './entries.css'
class Entries extends Component{
constructor(){
    super()
    this.state = {
        entries: [],
        searchVal: ''
    }
}

componentDidMount = () => {
    this.getEntries()
}

getEntries = () => {
    const {searchVal} = this.state
    console.log(searchVal)
    axios.get(`/api/getEntries/?searchVal=${searchVal}`)
    .then(res => {
        // console.log(res)
        this.setState({
            entries: res.data
        })
    })
}

navigateEntry = () => {
    this.props.history.push('/newEntry')
}

navigateDisplay = (id) => {
    this.props.history.push(`/entry/${id}`)
}
handleChange = (val) => {
    this.setState({
        searchVal: val
    })
}

    render(){
        const {entries, searchVal} = this.state
        const mapEntry = entries.map((entry, index) => {
            return <div key={index} onClick={() => this.navigateDisplay(entry.entry_id)} className='entries-display'>
                    <p>Date: {entry.date}</p>
                    <p>Title: {entry.title}</p>
                 </div>
        })
        return(
            <div className='entries'>
                <button onClick={this.navigateEntry}>Create New Entry</button>
                <input placeholder='Search by Title or Date' value={searchVal} onChange={e => this.handleChange(e.target.value)} />
                <button onClick={this.getEntries}>Search</button>
                {mapEntry}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Entries)