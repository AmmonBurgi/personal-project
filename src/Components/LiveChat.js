import React, {Component} from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import styled from 'styled-components'

const endpoint = "http://localhost:4002"
const socket = io(endpoint)

const StyledChat = styled('div')`

color: white;
font-size: 30px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
width: 100%;
height: 85%;
// border-right: 10px solid black;
display: flex;
// align-items: flex-start;
justify-content: center;

`;
const BorderStyle = styled('div')`
border-right: 5px solid white;
border-left: 5px solid white;
border-top: 5px solid white;
// border: 5px solid white;
margin: 10px;
position: relative;
width: 50%;
padding: 10px;
display: flex;
overflow-wrap: break-word;
word-wrap: break-word;
flex-direction: column;
// align-items: flex-start;
// justify-content: flex-start;
// align-text: left;
height: 94%;
`;

const StyledMessages = styled('div')`
display: flex;
width: 98%;
// flex-direction: column;
// float: right;
`;

const CurrentUserStyle = styled('div')`
color: rgb(255, 230, 209);
display: flex;
width: 98%;
// float: left;
// flex-direction: column;
`;

const TextStyle = styled('p')`
margin-right: 5px; 
`;

const StyledInput = styled('input')`
width: 40%;
border-radius: 5px;
height: 20px;
`;

const StyledButton = styled('button')`
    width: 70px;
    height: 26px;
    border-radius: 10px;
    padding: 5px;
    margin-left: 5px;
    background: white;
    // border: 2px solid #557A95;
    color:  #557A95;
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

const Align = styled('div')`
width: 100%;
display: flex;
justify-content: center;
position: absolute;
top: 10px;
align-items: center;
`;
class LiveChat extends Component{
    constructor(){
        super()
        this.state={
            message: '',
            messageArray: []
        }
    }

    componentDidMount(){
        socket.on("chat-message", data => {
            // console.log(data)
        });
        socket.on('message-received', (data) => {
            let newArray = [...this.state.messageArray, data]
            return this.setState({messageArray: newArray})
        })
        socket.emit('new-user', this.props.user.username)
    }
    sendMessage = () => {
        socket.emit('chat-message', this.state.message)
        this.setState({message: ''})
        let newArray = [...this.state.messageArray, {message: this.state.message, name: this.props.user.username}]
        this.setState({messageArray: newArray})
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    render(){
        // console.log(this.state.messageArray)
        const mapMessages = this.state.messageArray.map((element, index) => {
            if(element.name === this.props.user.username){
                return <CurrentUserStyle key={index}>
                    <TextStyle>You:</TextStyle>
                    <TextStyle>{element.message}</TextStyle>
                </CurrentUserStyle>
            } else {
            return <StyledMessages  key={index}>
                <TextStyle>{element.name}:</TextStyle>
                <TextStyle>{element.message}</TextStyle>
                
            </StyledMessages>
        }})
        return(
            <StyledChat>
                <BorderStyle>
                    <Align>
                        <StyledInput placeholder="What's on your mind?" value={this.state.message} onChange={(e)=> this.handleChange(e)}></StyledInput>
                        <StyledButton onClick={this.sendMessage}>Send</StyledButton>
                    </Align>
                    {mapMessages}
                </BorderStyle>
            </StyledChat>
        )
    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(LiveChat)