/* NEW */
import { useState } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
      event.preventDefault();
      
      const credentials = { username, password };
      
      props.login(credentials);
  };

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Row className="w-100 justify-content-center">
            <h1 className='text-center'>Login</h1>
            <Col md={6}>
                <Form onSubmit={handleSubmit}>
                {props.message && <Alert variant={props.message.type}>{props.message.msg}</Alert>}
                <Form.Group controlId='username' className='mb-3'>
                    <Form.Label>email</Form.Label>
                    <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
                </Form.Group>

                <Form.Group controlId='password' className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true}/>
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button className="mx-2 my-2" type='submit'>Login</Button>
                </div>
            </Form>
            </Col>
        </Row>
  </Container>
  )
};

function LogoutButton(props) {
  return(
    <Button variant='outline-light' onClick={props.logout}>Logout</Button>
  )
}

export { LoginForm, LogoutButton };