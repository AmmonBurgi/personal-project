import React, {Component} from 'react'
import {connect} from 'react-redux'
import Feedback from './FeedBack'
import styled from 'styled-components'

const HomeStyled = styled('div')`
display: flex;
height: 85.4vh;
width: 100%;
// justify-content: space-evenly;
align-items: center;
background: #7295AE;
color: #696e75;
flex-direction: column;
position: relative;
`;

// const FeedBox = styled('div')`
// position: absolute; 
// bottom: 0px;
// display: flex;
// justify-content: center;
// align-items: center;
// border: 5px solid black
// width: 100px;
// `;
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
                {/* <FeedBox> */}
                    <Feedback />
                {/* </FeedBox> */}
            </HomeStyled>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Home)