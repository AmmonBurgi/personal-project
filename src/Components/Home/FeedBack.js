import React, {Component} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import axios from 'axios'

const FeedBackStyle = styled('div')`
width: 80vw;
// height: 500px;
border: 5px white;
border-radius: 5px;
padding: 5px;
margin: 10px;
position: absolute;
bottom: 0px;
`;

const ButtonStyle = styled('button')`
width: 120px;
height: 40px;
border-radius: 10px;
padding: 5px;
// border: none;
// box-shadow: 0 4px 8px 0 black;
background: #B1A296;
border: 2px solid #557A95;
color:  #696e75;
font-family: Andale Mono;
text-align: center;
font-size: 12px;
transition: 1s;
margin-top: 55px;
&:hover {
    background:  #696e75;
    color:  #B1A296;
}
`;

const Titles = styled('p')`
bottom-border: 2px solid black;
text-decoration: underline;
font-size: 25px;
font-weight: bold;
`;

const QuillStyle = styled(ReactQuill)`
height: 300px;
`;

class FeedBack extends Component{
    constructor(){
        super()
        this.state = {
            feedValue: ''
        }
    }

    handleChange = (val) => {
        this.setState({
            feedValue: val
        })
    }

    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    }
    
sendFeedback = () => {
    const {feedValue} = this.state
    console.log(feedValue)
    axios.post('/api/feedback', {feedValue})
    .then(() => {
        console.log('Feedback Sent')
    }).catch(err => console.log(err));
}

    render(){
        // console.log(this.state.feedValue)
        return(
            <FeedBackStyle>
                <Titles>SEND SOME FEEDBACK!</Titles>
                <QuillStyle 
                theme='snow'
                modules={this.modules}
                formats={this.formats}
                value={this.state.feedValue}
                onChange={(e) => this.handleChange(e)}
                >
                </QuillStyle>
                <ButtonStyle onClick={this.sendFeedback}>Send FeedBack</ButtonStyle>
            </FeedBackStyle>
        )
    }
}

export default FeedBack