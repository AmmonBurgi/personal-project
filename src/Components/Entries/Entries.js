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

    render(){
        const {entries} = this.state
        const mapEntry = entries.map((entries, index) => {
            return <div key={index}>
                    <p>{entries.date}</p>
                    <p>{entries.title}</p>
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