import React, {Component} from 'react'
import {connect} from 'react-redux'
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
            <div>
                <p>{`${user.username} is logged in!`}</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Home)