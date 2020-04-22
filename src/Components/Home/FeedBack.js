import React, {Component} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
// import Mailto from 'react-mailto'

const FeedBackStyle = styled('div')`
width: 80vw;
// height: 500px;
// border: 5px white;
// border-radius: 5px;
// padding: 5px;
// margin: 10px;
position: absolute;
bottom: 0px;
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
    
    render(){
        // console.log(this.state.feedValue)
        return(
            <FeedBackStyle>
                <ReactQuill 
                theme='snow'
                modules={this.modules}
                formats={this.formats}
                value={this.state.feedValue}
                onChange={(e) => this.handleChange(e)}
                >
                </ReactQuill>
            </FeedBackStyle>
        )
    }
}

export default FeedBack