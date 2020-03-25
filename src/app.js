import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from './components/NavigationBar'
import Carousel from './components/Carousel'
import LoginPage from './components/LoginPage'
import SignUp from './components/SignUp'

const jsx=(
    <div>
        <NavigationBar />
        <Carousel />
    </div>
    
)

ReactDOM.render(jsx, document.getElementById('app'))