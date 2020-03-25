import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const AppRouter= ()=>(
    <BrowserRouter>
    
        <Switch>
            <Route path="/" />
        </Switch>
    </BrowserRouter>
)

export default AppRouter