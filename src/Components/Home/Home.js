import React, {Component} from 'react'
import {connect} from 'react-redux'
import Feedback from './FeedBack'
import styled from 'styled-components'

const HomeStyled = styled('div')`
display: flex;
height: 100vh;
justify-content: space-around;
align-items: center;
background: black;
color: white;
flex-direction: column;
`;
class Home extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        // console.log(this.props)
        const {user} = this.props
        return(
            <HomeStyled>
                <p>{`${user.username} is logged in!`}</p>
                <Feedback />
            </HomeStyled>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Home)