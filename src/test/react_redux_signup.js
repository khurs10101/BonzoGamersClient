import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import {connect, Provider} from 'react-redux'
import { Formik } from 'formik'
import { Container, Form, Col, InputGroup, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'


const MOCK_URL= 'https://5e76c3d1e3fd85001601f4ce.mockapi.io/api/v1/SignUp'

const axios= require('axios')
const thunkMiddleware= require('redux-thunk').default

//full react redux sign up
const initialSignupState={
    inProgress: false,
    isSubmitted: false,
    error: '',
    token: '',
    data: {
        firstName: '',
        lastName: '',
        email: 'hello@hello.in',
        city: 'Guwahati',
        state: 'Assam'
    }
}

//action creators
const signUpAction=(payload)=>{
    return {
        type: 'SIGN_UP',
        payload: payload
    }
}

const actionSubmitSuccess=(token='')=>{
    return {
        type: 'ACTION_SUCCESS',
        payload: token
    }
}

const actionSubmitFailure=(error='')=>{
    return {
        type: 'ACTION_FAILURE',
        payload: error
    }
}

const actionSubmitInProgress=()=>{
    return {
        type: 'ACTION_IN_PROGRESS'
    }
}

//reducers
const signUpReducer= (state=initialSignupState, action)=>{
    switch(action.type){
        case 'SIGN_UP':
            return {
                data:{
                    ...state.data,
                    ...action.payload
                }
            }
        
        case 'ACTION_IN_PROGRESS':
            return {
                
                ...state,
                inProgress: true

            }

        case 'ACTION_SUCCESS':
            return {
                inProgress: false,
                isSubmitted: true,
                error: '',
                token: action.payload,
                data: {
                    ...state.data
                }
            }

        case 'ACTION_FAILURE':
            return {
                inProgress: false,
                isSubmitted: false,
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

//create store 
const store = createStore(signUpReducer, applyMiddleware(thunkMiddleware,createLogger()))
store.subscribe(()=>console.log(store.getState().data))


const submitSignUpData= (values)=>{
    return (dispatch, values)=>{
        dispatch(signUpAction(values))
        dispatch(actionSubmitInProgress())
        axios.post(MOCK_URL,{
            data: values
        })
        .then((response)=>{
            console.log(response)
            dispatch(actionSubmitSuccess())
        })
        .catch((error)=>{
            console.log(error)
            dispatch(actionSubmitFailure())
        })
    }
}



//validation schema
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });



const SignUpComponent =(props)=>{
    
    return (

        <Formik
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                // props.actionSignup(values)
                props.submitSignUpData(values)
                setSubmitting(false)
            }}
            initialValues={{
                firstName: props.data.firstName,
                lastName: props.data.lastName,
                email: props.data.email,
            }}
        >
            {
                ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, isValidating=true}) => (

                    <Container>
                        <Form noValidate onSubmit={handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col} md="8" controlId="validationFormik01">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    isValid={touched.firstName && !errors.firstName? !isValidating: isValidating}
                                />
                                <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="8"  controlId="validationFormik02">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    isValid={touched.lastName && !errors.lastName? !isValidating: isValidating}
                                />
                                <Form.Control.Feedback>Looks good</Form.Control.Feedback>
                            </Form.Group>
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
                                    isInvalid={!!errors.email? !isValidating: isValidating}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            {props.state.inProgress?<Button>In Progress</Button>: <Button type="submit">SignUp</Button>}
                        </Form.Row>
                        

                        </Form>


                    </Container>

                    

                )
            }

        </Formik>

    )
    
    
    
}

const mapStateToProps =(state) =>{
    return {
        data: state.data, 
        state: state
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        actionSignup: (values)=>dispatch(signUpAction(values)),
        submitSignUpData: (values)=>dispatch(submitSignUpData(values))
    }
}

const SignUpHOC= connect(mapStateToProps, mapDispatchToProps)(SignUpComponent)

const jsx=(
    <div>
        <Provider store={store}>
            <SignUpHOC />
        </Provider>
        
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'))