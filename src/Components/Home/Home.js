import React, {Component} from 'react'
import {connect} from 'react-redux'
class Home extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        console.log(this.props)
        return(
            <div>Home Component</div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Home)