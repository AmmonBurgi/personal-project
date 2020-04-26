import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import styled from 'styled-components'

const CreateGoalStyle = styled('div')`
width: 100%;
height: 85.4vh;
background: #7295AE;
display: flex;
align-items: center;

flex-direction: column;
`;

const InnerDisplay = styled('div')`
display: flex; 
flex-direction: column;
align-items: center;
border: 5px solid #557A95;
border-radius: 5px;
margin-top: 20px;
padding: 10px;
width: 80vw;
height: 70%;
// horizontal-overflow: scroll;
position: relative;
`;


const TitleStyle = styled('input')`
position: absolute;
top: 35px;
border-radius: 5px;
width: 200px;
height: 20px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// bottom-border: 2px solid black;
// text-decoration: underline;
`

const ContentBorder = styled('div')`
padding: 10px;
width: 95%;
height: 80%;
border: 3px solid #557A95;
border-radius: 5px;
// overflow-wrap: break-word;
// word-wrap: break-word;
position: absolute;
bottom: 10px;
display: inline-block;

`
const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    // margin-right: 10px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    background: white;
    margin-right: 10px;
    // border: 2px solid #557A95;
    color: black;
    font-family: Andale Mono;
    text-align: center;
    font-size: 15px;
    transition: .5s;
    margin-top: 10px;
    &:hover {
        background:   #B1A296;
        font-weight: bolder;
        color:  white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`;

const BackStyle = styled('button')`
width: 65px;
height: 40px;
border-radius: 5px;
// box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
font-size: 25px;
font-weight: bolder;
position: absolute;
left: 3%;
top: 140px;
z-index: 1000;
transition: .5s;
&:hover {
    background: #B1A296;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
`;

const ContentStyle = styled('textarea')`
font-size: 17px;
width: 98%;
height: 98%;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
border-radius: 5px;
// position: absolute;
vertical-align: text-top;
// padding: 11px 0px 11px 0px;
`
class CreateGoal extends Component{
constructor(){
    super()
    this.state = {
        title: '',
        content: ''
    }
}

createGoal = () => {
    const {title, content} = this.state
    axios.post('/api/createGoal', {title, content})
    .then(() => this.props.history.push('/goals'))
}

handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value
    })
}

goBack = () => {
    this.props.history.push('/goals')
}    

    render(){
        return(
            <CreateGoalStyle>
                <BackStyle onClick={this.goBack}>&#8592;</BackStyle>
                <InnerDisplay>
                    <TitleStyle name='title' onChange={e => this.handleChange(e)} placeholder='Title' />
                    <ContentBorder>
                        <ContentStyle name='content' onChange={e => this.handleChange(e)} placeholder='Content' />
                    </ContentBorder>
                </InnerDisplay>
                <ButtonsStyle onClick={this.createGoal}>Confirm</ButtonsStyle>
            </CreateGoalStyle>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(CreateGoal)