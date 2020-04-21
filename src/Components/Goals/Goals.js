import React, { Component } from 'react';
import axios from 'axios'


class Goals extends Component{
constructor(){
    super()
    this.state = {
        goals: [],
        complete: [],
        searchVal: ''
    }
}

componentDidMount = () => {
    this.getGoals()
    this.getCompleted()
}

getGoals = () => {
    const {searchVal} = this.state
    axios.get(`/api/getGoals/?searchVal=${searchVal}`)
    .then(res => {
        this.setState({goals: res.data})
    }).catch(err => console.log(err))
}

getCompleted = () => {
    axios.get('/api/complete')
    .then(res => {
        // console.log(res.data)
        this.setState({
            complete: res.data
        })
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

navDisplay = (id) => {
    this.props.history.push(`/goal/${id}`)
}

editCheck = (e, index) => {
    // console.log(e)
    let theCheck = !e
    // console.log(theCheck)
    axios.put(`/api/editGoal/?check=${theCheck}&id=${index}`)
    .then((res)=> {
        // console.log(res.data)
        this.componentDidMount()
    }).catch(err => console.log(err))
}

    render(){
        let goalsMap = this.state.goals.map((element, index) => {
            console.log('goals', element.completed)
            return <div key={index}>
                    <div  onClick={() => this.navDisplay(element.goal_id)}>
                    <p>{element.title}</p>
                    </div>
                    <input type='checkbox' defaultChecked={false} value={element.completed} onClick={() => this.editCheck(element.completed, element.goal_id)} />
                </div>
        })

        let completeMap = this.state.complete.map((element, index) => {
            console.log('comp', element.completed)
            return <div key={index}>
                <div  onClick={() => this.navDisplay(element.goal_id)}>
                    <p>{element.title}</p>
                    </div>
                    <input type='checkbox' defaultChecked={true} value={element.completed} onClick={() => this.editCheck(element.completed, element.goal_id)} />
            </div>
        })
        return(
        <div>
            
                <button onClick={this.createGoal}>Create Goal</button>
                
                <input onChange={e => this.handleChange(e)} />
                <button onClick={this.getGoals}>Search</button>
            <div>
                <p>Goals:</p>
                {goalsMap}
            </div>
            <div>
                <p>Completed:</p>
                {completeMap}
            </div>
        </div>
        )
    }
}

export default Goals