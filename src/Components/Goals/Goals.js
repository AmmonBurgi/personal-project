import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const StyledGoals = styled('div')`
    display: flex;
    // justify-content: center;
    align-items: center;
    background: #7295AE;
    flex-direction: column;
    padding: 10px;
    height: 100vh;

`;

const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    background: #696e75;
    border: 2px solid #557A95;
    color:  #7395AE;
    font-family: Andale Mono;
    text-align: center;
    font-size: 12px;
    transition: 1s;
    &:hover {
        background:  #7395AE;
        color: #696e75;
    }
`;

const Map = styled('button')`
    width: 100%;
    height: 100px;
    background: blue;
    color: white;
    border-radius: 50px;
    margin: 10px;
`

const Align = styled('div')`
display: flex;
justify-content: space-between;
width: 40%;
align-items: center;
margin: 10px;
`;

const StyledSearch = styled('input')`
border-radius: 10px;
padding: 5px;
height: 25px;
width: 130px;
// margin-right: 10px;
`;

const AlignArray = styled('div')`
display: flex;
justify-content: space-around;
width: 100%;
font-family: Andale Mono;
font-size: 25px;
font-weight: bold;
margin-top: 30px;
`;

const FontStyle = styled('p')`
bottom-border: 2px solid black;
text-decoration: underline;
`;

const Line = styled('div')`
border-left: 6px solid black
height: 500px;
`;


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
        console.log()
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
            // console.log('goals', element.completed)
            return <Map key={element.goal_id}>
                    <div  onClick={() => this.navDisplay(element.goal_id)}>
                    <p>{element.title}</p>
                    </div>
                    <input type='checkbox' defaultChecked={false} value={element.completed} onClick={() => this.editCheck(element.completed, element.goal_id)} />
                </Map>
        })

        let completeMap = this.state.complete.map((element, index) => {
            // console.log('comp', element.completed)
            return <Map key={element.goal_id}>
                <div  onClick={() => this.navDisplay(element.goal_id)}>
                    <p>{element.title}</p>
                    </div>
                    <input type='checkbox' defaultChecked={true} value={element.completed} onClick={() => this.editCheck(element.completed, element.goal_id)} />
            </Map>
        })
        return(
        <StyledGoals>
                <Align>
                    <ButtonsStyle onClick={this.createGoal}>Create New Goal</ButtonsStyle>
                    
                    <StyledSearch onChange={e => this.handleChange(e)} placeholder='Search by Title' />
                    <ButtonsStyle onClick={this.getGoals}>Search</ButtonsStyle>
                </Align>
            <AlignArray>
                    <div>
                        <FontStyle>Goals</FontStyle>
                        {goalsMap}
                    </div>
                    <div>
                        <FontStyle>Completed</FontStyle>
                        {completeMap}
                    </div>
                
            </AlignArray>
        </StyledGoals>
        )
    }
}

export default Goals