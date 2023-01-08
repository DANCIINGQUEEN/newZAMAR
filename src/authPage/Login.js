import React, {useState} from 'react';
import './login.css'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {login} from "../state";
import {useTheme, Box} from "@mui/material";
import {tokens} from "../theme";
import Header from "../components/Header";



function Login(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setLogin = (e) => {
        e.preventDefault();
        console.log(email, password)
        axios.post('http://13.209.212.124:5001/auth/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                //api데이터 출력
                console.log(response);
                // Handle successful login
                console.log(response.data.accessToken)
                if (response.data.accessToken) {
                    // Save the JWT token in the session storage
                    sessionStorage.setItem('jwt', response.data.accessToken);
                    dispatch(
                        login({
                            token: response.data.accessToken
                        })
                    )
                    return true;
                } else {
                    return false;
                }


            })
            .catch(function (error) {
                console.log(error);
                setError('Invalid email or password');
            });
    }


    return (
        <Box m="20px">
            <div className="container">
                <div className="login-container">
            <Header title="SIGN IN" subtitle="Log in and use the service" />
                    {/*<input id="item-1" type="radio" name="item" className="sign-in" checked/>*/}
                    {/*<label htmlFor="item-1" className="item">Sign In</label>*/}
                    <div className="login-form">
                        <form onSubmit={setLogin}>

                            <div className="sign-in-htm">
                                <div className="group">
                                    <input placeholder="email" id="user" type="email" className="input" value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="group">
                                    <input placeholder="Password" id="pass" type="password" className="input"
                                           data-type="password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>

                                <div className="group">
                                    <input type="submit" className="button" value="Sign In"/>
                                </div>
                                <div className="hr"></div>
                                <div className="footer">
                                    <a href="/signUp">Create Account</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Login;