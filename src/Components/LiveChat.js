import React, {Component} from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import styled from 'styled-components'
// import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
margin: 10px;
position: relative;
width: 50%;
padding: 10px;
display: flex;
overflow-wrap: break-word;
word-wrap: break-word;
flex-direction: column;
height: 94%;
// @media (max-width: 768px) {
//  height: 96%;   
//  width: 75%;
// }
// @media (min-width: 1024px) {
//     width: 74.5%;
//     height: 99%;
//    }
// `;

const StyledMessages = styled('div')`
display: flex;
width: 98%;
// flex-direction: column;
// float: right;
// @media (min-width: 1024px) {
//    font-size: 30px;
//    }
// `;

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
// @media (max-width: 768px) {
//  height: 31px;
//  font-size: 15px;   
// }
// @media (min-width: 1024px) {
//     height: 42px;
//     font-size: 18px;
//    }
// `;

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
    // @media (max-width: 768px) {
    // font-size: 16px;
    // width: 80px;
    // height: 33px;
    // }
    // @media (min-width: 1024px) {
    //     width: 100px;
    //     height: 46px;
    //     font-size: 20px;
    //    }
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
            messageArray: [],
            connection: ''
        }
    }

    componentDidMount(){
        socket.on('message-received', (data) => {
            let newArray = [...this.state.messageArray, data]
            return this.setState({messageArray: newArray})
        })
        socket.emit('new-user', this.props.user.username)
        socket.on('user-connected', name => {
            // toast.info(`${name} connected!`)
            // alert(`${name} connected`)
            this.setState({connection: `${name} connected`})
        })
        socket.on('user-disconnected', name => {
            // toast.info(`${name} disconnected!`)
            // alert(`${name} disconnected`)
            this.setState({connection: `${name} disconnected`})
        })
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
        console.log(this.state.connection)
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
                {/* <ToastContainer /> */}
                <BorderStyle>
                    <Align>
                        <StyledInput placeholder="What's on your mind?" value={this.state.message} onChange={(e)=> this.handleChange(e)}></StyledInput>
                        <StyledButton onClick={this.sendMessage}>Send</StyledButton>
                    </Align>
                    <p>{this.state.connection}</p>
                    {mapMessages}
                </BorderStyle>
            </StyledChat>
        )
    }

}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(LiveChat)