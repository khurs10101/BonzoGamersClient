import React from 'react'
import ReactDOM from 'react-dom'
import {Formik} from 'formik'
import { createStore, applyMiddleware } from 'redux'
import {Provider, connect} from 'react-redux'
import { Container, Form, Col, InputGroup, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import {createLogger} from 'redux-logger'

const MOCK_URL= 'https://5e76c3d1e3fd85001601f4ce.mockapi.io/api/v1/Login'
const axios= require('axios')
const thunkMiddleware= require('redux-thunk').default


import 'bootstrap/dist/css/bootstrap.min.css'





//initial state (REDUX)
const initialLoginState={
    inProgress: false,
    isLoggedIn: false,
    error: '',
    token: '',
    data: {
        email: '',
        password: ''
    }
}

//action creators (REDUX)

const actionLoginData=(payload)=>{
    return {
        type: 'LOGIN_DATA',
        payload: payload
    }
}

const actionLoginProgress= ()=>{
    return {
        type: 'LOGIN_PROGRESS'
    }
}

const actionLoginSuccess= (data='')=>{
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}

const actionLoginFailure= (data='')=>{
    return {
        type: 'LOGIN_FAILURE',
        payload: data
    }
}


//reducers (REDUX)

const loginReducer= (state=initialLoginState, action)=>{

    switch(action.type){
        case 'LOGIN_DATA':
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        case 'LOGIN_PROGRESS':
            return {
                inProgress: true,
                isLoggedIn: false,
                error: '',
                token: '',
                data: {
                    ...state.data
                }
            }

        case 'LOGIN_SUCCESS':
            return {
                inProgress: false,
                isLoggedIn: true,
                error: '',
                token: action.payload,
                data: {
                    ...state.data
                }
            }

        case 'LOGIN_FAILURE':
            return {
                inProgress: false,
                isLoggedIn: false,
                error: action.payload,
                token: '',
                data: {
                    ...state.data
                }
            }
        default:
            return state
    }
}


//Store (REDUX)

const store= createStore(loginReducer, applyMiddleware(thunkMiddleware,createLogger()))
store.subscribe(()=>console.log(store.getState()))


//validation schema
const SignupSchema = Yup.object().shape({
    
    password: Yup.string()
      .min(6, 'Minimum Six Characters')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required')
  })



const LoginComponent =(props)=>{



    return (

        <Formik
        
            validationSchema={SignupSchema}
            onSubmit={(values)=>{
                console.log(values)
                props.actionLoginData(values)
                props.startLogin(values)
            }}
            initialValues={{
                email: '',
                password: ''
            }}
        
        >
        {
            ({handleChange, handleSubmit, values, touched, errors, isValid, isInvalid})=>(


                <Container>

                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col} md="8" controlId="validationFormikUsername">
                            <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="8" controlId="validationFormik01">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                        
                        </Form.Row>

                        <Button type="submit">Login</Button>
                    
                    
                    </Form>
                
                
                </Container>

            )



            
        }
        
        
        </Formik>

    )
}


//async REDUX-THUNK
const startLogin= (values)=>{
    return (dispatch, values)=>{
        //dispatch(actionLoginData(values))
        dispatch(actionLoginProgress())
        const data= store.getState().data
        axios.post(MOCK_URL,{
            email: data.email,
            password: data.password
        })
        .then((response)=>{
            console.log(response)
            dispatch(actionLoginSuccess())
        })
        .catch((error)=>{
            console.log(error)
            dispatch(actionLoginFailure())
        })
    }
}


//connect the (REACT-REDUX)
const mapStateToProps =(state)=>{
    return {
        state: state,
        data: state.data
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        startLogin: (values)=>dispatch(startLogin(values)),
        actionLoginData: (values)=>dispatch(actionLoginData(values))
    }
}

const LoginHOC= connect(mapStateToProps,mapDispatchToProps)(LoginComponent)

const jsx=(

    <Provider store={store}>
        <LoginHOC />
    </Provider>

)



ReactDOM.render(jsx, document.getElementById('app'));