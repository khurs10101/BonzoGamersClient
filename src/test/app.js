import React from 'react'
import ReactDOM from 'react-dom'
import { Formik } from 'formik'
import { Container, Form, Col, InputGroup, Button } from 'react-bootstrap'
import * as yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'


const schema = yup.object({
    
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required()

})



const SignUpComponent =(props)=>{
    
    return (

        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                firstName: 'Marks',
                lastName: 'Weins',
                email: '',
                city: '',
                state: '',
            }}
        >
            {
                ({handleSubmit, handleChange, handleBlur, values, touched, isValid, errors}) => (

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
                                    isValid={touched.firstName && !errors.firstName}
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
                                    isValid={touched.lastName && !errors.lastName}
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
                                    isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Button type="submit">SignUp</Button>
                        </Form.Row>
                        

                        </Form>


                    </Container>

                    

                )
            }

        </Formik>

    )
    
    
    
}

const jsx=(
    <div>
        <SignUpComponent />
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'))