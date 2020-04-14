import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Home from './Components/Home/Home'
import Entries from './Components/Entries/Entries'
import EntryDisplay from './Components/EntryDisplay'
import CreateEntry from './Components/CreateEntry'
import Goals from './Components/Goals'
import GoalDisplay from './Components/GoalDisplay'
import CreateGoal from './Components/CreateGoal'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/home' component={Home} />
        <Route path='/entries' component={Entries} />
        <Route path='/entry/:id' component={EntryDisplay} />
        <Route path='/newEntry' component={CreateEntry} />
        <Route path='/goals' component={Goals} />
        <Route path='/goal/:id' component={GoalDisplay} />
        <Route path='/newGoal' component={CreateGoal} />
    </Switch>
)