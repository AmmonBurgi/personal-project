import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import './entries.css'
import styled from 'styled-components'

//styled Components
const StyledEntries = styled('div')`
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
    // height: 45px;
    // font-size: 14px;
    // }
    // @media (max-width: 1024px) {
    // height: 55px;
    // width: 130px;
    // font-size: 18px;
    // }
`;

const Map = styled('button')`
    width: 58vw;
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
    // @media (max-width: 1024px) {
    // width: 60vw;
    // height: 120px;
    // font-size: 25px;
    // }
`

const Align = styled('div')`
display: flex;
justify-content: space-between;
width: 45vw;
align-items: center;
margin: 10px;
// @media (max-width: 768px) {
//  width: 58%;   
// }
// @media (max-width: 1024px) {
//  width: 60%;   
// }
`;

const StyledSearch = styled('input')`
border-radius: 10px;
padding: 5px;
height: 25px;
width: 130px;
// margin-right: 10px;
// @media (max-width: 768px) {
//     height: 30px;
// }
// @media (max-width: 1024px) {
//  height: 45px;
//  width: 158px;
//  font-size: 15px;   
// }
`;

class Entries extends Component{
constructor(){
    super()
    this.state = {
        entries: [],
        searchVal: ''
    }
}

componentDidMount = () => {
    this.getEntries()
}

getEntries = () => {
    const {searchVal} = this.state
    // console.log(searchVal)
    axios.get(`/api/getEntries/?searchVal=${searchVal}`)
    .then(res => {
        // console.log(res)
        this.setState({
            entries: res.data, searchVal: ''
        })
    })
}

navigateEntry = () => {
    this.props.history.push('/newEntry')
}

navigateDisplay = (id) => {
    this.props.history.push(`/entry/${id}`)
}
handleChange = (val) => {
    this.setState({
        searchVal: val
    })
}



    render(){
        const {entries, searchVal} = this.state
        const mapEntry = entries.map((entry, index) => {
            return <Map key={index} onClick={() => this.navigateDisplay(entry.entry_id)} >
                    <p>Date: {entry.date}</p>
                    <p>Title: {entry.title}</p>
                 </Map>
        })
        return(
            <StyledEntries>
                <Align>
                    <ButtonsStyle onClick={this.navigateEntry}>Create New Entry</ButtonsStyle>
                    {/* <button onClick={this.navigateEntry}>Create New Entry</button> */}
                    
                    <StyledSearch placeholder='Search by Title or Date' value={searchVal} onChange={e => this.handleChange(e.target.value)} />
                    <ButtonsStyle onClick={this.getEntries}>Search</ButtonsStyle>
                  
                </Align>
                {mapEntry}
            </StyledEntries>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Entries)