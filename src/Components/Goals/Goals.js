import React, { Component } from 'react';
import axios from 'axios'


class Goals extends Component{
constructor(){
    super()
    this.state = {
        goals: [],
        searchVal: ''
    }
}

componentDidMount = () => {
    this.getGoals()
}

getGoals = () => {
    const {searchVal} = this.state
    axios.get(`/api/getGoals/?searchVal=${searchVal}`)
    .then(res => {
        this.setState({goals: res.data})
    }).catch(err => console.log(err))
}

createGoal = () => {
    this.props.history.push('/newGoal')
}

handleChange = (e) => {
    this.setState({
        searchVal: e.target.value
    })
}

    render(){
        let goalsMap = this.state.goals.map((element, index) => {
            return <div key={index}>
                <p>{element.title}</p>
            </div>
        })
        return(
            <div>
                <button onClick={this.createGoal}>Create Goal</button>
                <input onChange={e => this.handleChange(e)} />
                <button onClick={this.getGoals}>Search</button>
                {goalsMap}
            </div>
        )
    }
}

export default Goals