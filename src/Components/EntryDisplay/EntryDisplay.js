import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const EntryStyle = styled('div')`
display: flex;
justify-content: center;
font-size: 30px;
background: #7295AE;
height: 85.4vh;
`;
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
    // @media (max-width: 1024px) {
    // width: 110px;
    // height: 55px;
    // font-size: 20px;
    // }
`;

const InnerDisplay = styled('div')`
display: flex; 
flex-direction: column;
align-items: center;
border: 5px solid white;
border-radius: 5px;
margin-top: 20px;
margin-bottom: 7px;
// padding: 10px;
width: 80vw;
height: 70%;
// horizontal-overflow: scroll;
position: relative;
// @media (max-width: 768px) {
//     width: 72vw;
    
// }
// @media (max-width: 1024px) {
//  width: 76vw;
//  height: 80%;

// }
`;

const DateStyle = styled('p')`
position: absolute;
left: 20px;
top: 0px;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
font-weight: bolder;
// bottom-border: 2px solid black;
// text-decoration: underline;
// @media (max-width: 1024px) {
//  top: 30px;
//  font-size: 30px;   
//  position: absolute;
// }
`
const TitleStyle = styled('p')`
position: absolute;
top: 0px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// bottom-border: 2px solid black;
// text-decoration: underline;
// @media (max-width: 1024px) {
//     position: absolute;
//  top: 30px;
//  font-size: 30px;   
// }
`

const ContentBorder = styled('div')`
padding: 10px;
width: 95%;
height: 80%;
border: 3px solid white;
border-radius: 5px;
overflow-wrap: break-word;
word-wrap: break-word;
position: absolute;
bottom: 10px;
// @media (max-width: 768px) {
//     width: 90%;
//     height: 83%;
// }
// @media (max-width: 1024px) {
//  width: 92%;
//  height: 85%;   
// }
`
const ContentStyle = styled('p')`
font-size: 17px;
width: 98.5%;
overflow-wrap: break-word;
word-wrap: break-word;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// float: left;
text-align: left;
position: absolute;
top: 0px;
// @media (max-width: 768px) {
//     width: 96.5%;
// }
// @media (max-width: 1024px) {
//  font-size: 25px;   
// }
`
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
// @media (max-width: 768px) {
//     left: 2%
//     position: absolute;
//     top: 190px;
// }
// @media (max-width: 1024px) {
//  position: absolute;
//  top: 240px;
//  width: 70px;
//  height: 45px;
//  font-size: 30px;
//  left: 2.3%;   
// }
`;


const DateStyleInput = styled('input')`
position: absolute;
left: 20px;
top: 30px;
width: 150px;
height: 20px;
border-radius: 5px;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
font-weight: bolder;
// bottom-border: 2px solid black;
// text-decoration: underline;
// @media (max-width: 768px) {
//  font-size: 16px;
//  width: 140px;   
// }
// @media (max-width: 1024px) {
//     top: 34px;
//  width: 200px;
//  height: 33px;
//  font-size: 19px;   
// }
`

const TitleStyleInput = styled('input')`
position: absolute;
top: 30px;
border-radius: 5px;
width: 200px;
height: 20px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
// bottom-border: 2px solid black;
// text-decoration: underline;
// @media (max-width: 768px) {
//     width: 170px;
//     font-size: 16px;
// }
// @media (max-width: 1024px) {
//     top: 34px;
//  width: 250px;
//  height: 33px;
//  font-size: 19px   
// }
`

const ContentBorderInput = styled('div')`
padding: 10px;
width: 95%;
height: 80%;
border: 3px solid white;
border-radius: 5px;
// overflow-wrap: break-word;
// word-wrap: break-word;
position: absolute;
bottom: 10px;
display: inline-block;
// @media (max-width: 768px) {
//     width: 91%;
//     height: 83%
// }
// @media (max-width: 1024px) {
//  height: 87%;
//  width: 93%;   
// }
`
const ContentStyleInput = styled('textarea')`
font-size: 17px;
width: 98%;
height: 98%;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
border-radius: 5px;
// position: absolute;
vertical-align: text-top;
// padding: 11px 0px 11px 0px;
// @media (max-width: 1024px) {
//  font-size: 23px;   
// }
`

class EntryDisplay extends Component{
constructor(){
    super()
    this.state = {
        entry: [],
        toggle: true,
        date: '',
        title: '',
        content: ''
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
            entry: res.data[0]
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

handleToggle = () => {
    this.setState({
        toggle: !this.state.toggle
    })
}

handleChange = (e) => {
 this.setState({
    [e.target.name]: e.target.value
 })
}

handleEdit = () => {
const {date, title, content} = this.state
// if statements makes sure date, title, content are not passed up to the server as empty strings vv
let newDate = '' 
let newTitle = ''
let newContent = ''
if(date === ''){
    newDate = this.state.entry.date
} else {
    newDate = date
}
if(title === ''){
    newTitle = this.state.entry.title
} else {
    newTitle = title
}
if(content === ''){
    newContent = this.state.entry.content
} else {
    newContent = content
}
const {id} = this.props.match.params
axios.put(`/api/editEntry/${id}`, {newDate, newTitle, newContent})
.then(() => {
    this.handleToggle()
    this.getEntry()
}).catch(err => console.log(err))
}

goBack = () => {
    this.props.history.push('/entries')
}

    render(){
        // console.log(this.state.date)
        // console.log(this.state.entry.date)
        const {entry} = this.state
        return(
            <EntryStyle>
                <BackStyle onClick={this.goBack}>&#8592;</BackStyle>
                {this.state.toggle ? 
                (
                <div className='entry-display-content'>
                    <InnerDisplay>
                        <DateStyle>{entry.date}</DateStyle>
                        <TitleStyle>{entry.title}</TitleStyle>
                        <ContentBorder>
                            <ContentStyle>{entry.content}</ContentStyle>
                        </ContentBorder>
                    </InnerDisplay>
                        <ButtonsStyle onClick={this.delete}>Delete</ButtonsStyle>
                        <ButtonsStyle onClick={this.handleToggle}>Edit</ButtonsStyle>
                </div>
                ) : 
                (
                    <div>
                    <InnerDisplay>
                        <DateStyleInput value={this.state.date || entry.date} onChange={e => this.handleChange(e)} name='date' />
                        <TitleStyleInput value={this.state.title || entry.title} onChange={e => this.handleChange(e)} name='title'/>
                        <ContentBorderInput>
                            <ContentStyleInput value={this.state.content || entry.content} onChange={e => this.handleChange(e)} name='content'/>
                        </ContentBorderInput>
                         
                         </InnerDisplay>
                         <ButtonsStyle onClick={this.handleEdit}>Confirm</ButtonsStyle>
                    </div>
                )}
              
            </EntryStyle>
        )
    }
}

export default EntryDisplay