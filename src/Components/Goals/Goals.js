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
    height: 83vh;

`;

const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    background: white;
    // border: 2px solid #557A95;
    color: #557A95;
    font-family: Andale Mono;
    text-align: center;
    font-size: 12px;
    transition: .5s;
    &:hover {
        background:  #B1A296;
        color: white;
        font-weight: bolder;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`;

const Map = styled('button')`
    width: 100%;
    height: 100px;
    background: white;
    color: #557A95;
    border-radius: 100px;
    font-size: 20px;
    font-family: New Century Schoolbook, TeX Gyre Schola, serif;
    font-weight: bolder;
    margin: 10px;
    transition: 1s;
    // border: 3px solid #557A95;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    &:hover {
        background: #B1A296;
        color: white;
    }
`

const Align = styled('div')`
display: flex;
justify-content: space-between;
width: 45vw;
align-items: center;
margin: 10px;
`;

const StyledSearch = styled('input')`
border-radius: 10px;
padding: 5px;
height: 25px;
color: #696e75;
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

const FontStyle = styled('h1')`
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
`;

const Category = styled('div')`
width: 450px;
`

const CheckBox = styled('input')`
width: 20px;
height: 20px;
background: #557A95;
color: #557A95;
border-radius: 5px;
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
            return <Map key={element.goal_id} onClick={() => this.navDisplay(element.goal_id)}>
                    <div  >
                    <p>{element.title}</p>
                    </div>
                    <CheckBox type='checkbox' defaultChecked={false} value={element.completed} onClick={() => this.editCheck(element.completed, element.goal_id)} />
                </Map>
        })

        let completeMap = this.state.complete.map((element, index) => {
            // console.log('comp', element.completed)
            return <Map key={element.goal_id} onClick={() => this.navDisplay(element.goal_id)}>
                <div  >
                    <p>{element.title}</p>
                    </div>
                    <CheckBox type='checkbox' defaultChecked={true} value={element.completed} onClick={() => this.editCheck(element.completed, element.goal_id)} />
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
                    <Category>
                        <FontStyle>Goals:</FontStyle>
                        {goalsMap}
                    </Category>
                    <Category>
                        <FontStyle>Completed:</FontStyle>
                        {completeMap}
                    </Category>
                
            </AlignArray>
        </StyledGoals>
        )
    }
}

export default Goals