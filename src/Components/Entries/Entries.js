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
    height: 100vh;

`;

const ButtonsStyle = styled('button')`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    // border: none;
    // box-shadow: 0 4px 8px 0 black;
    background: #696e75;
    border: 2px solid #557A95;
    color:  #7395AE;
    font-family: Andale Mono;
    text-align: center;
    font-size: 12px;
    transition: 1s;
    &:hover {
        background:  #7395AE;
        color: #696e75;
    }
`;

const Map = styled('button')`
    width: 100%;
    height: 100px;
    background: blue;
    color: white;
    border-radius: 50px;
    margin: 10px;
`

const Align = styled('div')`
display: flex;
justify-content: space-between;
width: 40%;
align-items: center;
margin: 10px;
`;

const StyledSearch = styled('input')`
border-radius: 10px;
padding: 5px;
height: 25px;
width: 130px;
// margin-right: 10px;
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
            entries: res.data
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