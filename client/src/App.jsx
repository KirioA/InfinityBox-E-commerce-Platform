import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import {Button, Col, Form, Row} from "react-bootstrap"


function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                password,
            }, { withCredentials: true });

            if (response.status === 201) {
                alert('Registered successfully!');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            }, { withCredentials: true });

            if (response.status === 200) {
                alert('Logged in successfully!');
            }
        } catch (error) {
            alert('Invalid credentials');
            console.error('Login error:', error);
        }
    };



  return (

      <>
          <h1 style={{marginBottom: '100px'}}>Регистрация/Авторизация тест</h1>

          <Form>
              <Form.Group>
                  <Form.Label>Введите логин</Form.Label>
                  <Form.Control type="text"
                                placeholder="KirioA"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                  />

              </Form.Group>
              <Form.Group>
                  <Form.Label>Введите Пароль</Form.Label>
                  <Form.Control type="password"

                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                  />

              </Form.Group>
          </Form>


          <Row style={{marginTop: '50px'}}>
              <Col><Button onClick={register}>Регистрация</Button></Col>
              <Col> <Button onClick={login}>Вход</Button></Col>
          </Row>



      </>
  );
}

export default App;
