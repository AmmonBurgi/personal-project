import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import axios from 'axios'

const FeedBackStyle = styled('div')`
width: 65vw;
height: 350px;
border: 5px solid white;
// border-radius: 5px;
padding: 10px;
// margin: 10px;
position: absolute;
bottom: 0px;
// @media (max-width: 1024px) {
//  height: 520px;   
//  width: 69vw;
// }
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
    // @media (max-width: 1024px) {
    // width: 140px;
    // height: 55px;
    // font-size: 17px;
    // margin-top: 57px;
    // }
`;

const Titles = styled('p')`
font-size: 25px;
font-weight: bolder;
font-family: New Century Schoolbook, TeX Gyre Schola, serif;
`;

const QuillStyle = styled(ReactQuill)`
height: 180px;
// @media (max-width: 1024px) {
//  height: 330px;   
// }
`

const FeedBack = () => {
       
const [feedValue, setFeedValue] = useState('')

const handleChange = (val) => {
        setFeedValue(val)
    }
const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    }
const sendFeedback = (value) => {
    axios.post('/api/feedback', {feedValue: value})
    .then(() => {
        alert('FeedBack Sent!')
        setFeedValue('')
    }).catch(err => console.log(err));
}

        return(
            <FeedBackStyle>
                <Titles>SEND SOME FEEDBACK!</Titles>
                <QuillStyle 
                theme='snow'
                modules={modules}
                value={feedValue}
                onChange={(e) => handleChange(e)}
                >
                </QuillStyle>
                <ButtonsStyle onClick={() => sendFeedback(feedValue)}>Send FeedBack</ButtonsStyle>
            </FeedBackStyle>
        )
    }

export default FeedBack