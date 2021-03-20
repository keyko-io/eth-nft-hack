import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './routes/Home/Home'



const Routes = () => {
    return(
        <Switch>
            <Route component={Home} exact path="/" />
        </Switch>
    )
}

export default Routes