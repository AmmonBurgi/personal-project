import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
class Entries extends Component{
constructor(){
    super()
    this.state = {
        entries: []
    }
}

componentDidMount = () => {
    this.getEntries()
}

getEntries = () => {
    const {user_id} = this.props.user
    axios.get(`/api/getEntries/${user_id}`)
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

    render(){
        const {entries} = this.state
        const mapEntry = entries.map((entry, index) => {
            return <div key={index} onClick={() => this.navigateDisplay(entry.entry_id)}>
                    <p>{entry.date}</p>
                    <p>{entry.title}</p>
                 </div>
        })
        return(
            <div className='entries'>
                <button onClick={this.navigateEntry}>Create New Entry</button>
                {mapEntry}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Entries)