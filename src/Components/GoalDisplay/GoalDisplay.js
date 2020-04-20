import React, { Component } from 'react';
import axios from 'axios'
class GoalDisplay extends Component{
constructor(){
    super()
    this.state = {
        goal: []
    }
}

componentDidMount = () => {
    this.getGoal()
}

getGoal = () => {
    const {id} = this.props.match.params
    axios.get(`/api/getGoal/${id}`)
    .then(res => {
        console.log(res.data)
        this.setState({
            goal: res.data[0]
        })
    })
}

// editGoal = () {
//     axios.put(`/api/edit/?complete=${}`)
// }

deleteGoal = () => {
    const {id} = this.props.match.params
    axios.delete(`/api/deleteGoal/${id}`)
    .then(() => this.props.history.push('/goals'))
}
    render(){
        // console.log(this.state.goal)
        const {goal} = this.state
        return(
            <div>
                <p>{goal.title}</p>
                <p>{goal.content}</p>
                <button onClick={this.deleteGoal}>Delete</button>
            </div>
        )
    }
}

export default GoalDisplay