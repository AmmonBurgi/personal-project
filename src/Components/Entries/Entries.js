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
    background: black;
    flex-direction: column;
    padding: 10px;
    height: 100vh;

`;

const ButtonsStyle = styled('button')`
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background: grey;
    color: white;
    text-align: center;
`;

const Map = styled('div')`
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
width: 80%;
align-items: center;
`;

const StyledSearch = styled('input')`
border-radius: 5px;
height: 25px;
width: 125px;
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
    console.log(searchVal)
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