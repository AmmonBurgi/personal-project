import React, {Component} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import axios from 'axios'

const FeedBackStyle = styled('div')`
width: 65vw;
// height: 500px;
border: 5px white;
border-radius: 5px;
padding: 5px;
margin: 10px;
position: absolute;
bottom: 0px;
`;

const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    background: white;
    // border: 2px solid #557A95;
    color:  #557A95;
    font-family: Andale Mono;
    text-align: center;
    font-size: 12px;
    margin-top: 50px;
    transition: .5s;
    &:hover {
        background:  #B1A296;
        color: white;
        font-weight: bolder;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`;

const Titles = styled('p')`
font-size: 25px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
`;

const QuillStyle = styled(ReactQuill)`
height: 200px;
`

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
                <ButtonsStyle onClick={this.sendFeedback}>Send FeedBack</ButtonsStyle>
            </FeedBackStyle>
        )
    }
}

export default FeedBack