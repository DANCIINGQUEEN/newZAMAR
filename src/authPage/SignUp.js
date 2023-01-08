import React, {useState} from 'react';
// import './login.css'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import {useTheme, Box} from "@mui/material";
import {tokens} from "../theme";



function SignUp(props) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const navigate=useNavigate()

    const setSignUp = (e) => {
        e.preventDefault();

        axios.post('http://13.209.212.124:5001/user/signup', {
            name: newName,
            email: newEmail,
            password: newPassword
        })
            .then(function (response) {
                console.log(response);
                // Handle successful signup
                navigate('/')
            })
            .catch(function (error) {
                console.log(error);
                setError('Error creating account');
            });
        setNewEmail('')
        setNewPassword('')
        setNewName('')
    }

    return (
        <Box m="20px">

            <div className="container">
                <div className="login-container">
                    <input id="item-2" type="radio" name="item" className="sign-up"/>
                    {/*<label htmlFor="item-2" className="item">Sign Up</label>*/}
                    <Header title="SIGN UP" subtitle="Create a New User Profile" />

                    <div className="login-form">


                        <form onSubmit={setSignUp}>

                            <div className="sign-up-htm">
                                <div className="group">
                                    <input placeholder="Username" id="user" type="text" className="input"
                                           value={newName}
                                           onChange={(e) => setNewName(e.target.value)}/>
                                </div>

                                <div className="group">
                                    <input placeholder="Email adress" id="pass" type="email" className="input"
                                           value={newEmail}
                                           onChange={(e) => setNewEmail(e.target.value)}/>
                                </div>

                                <div className="group">
                                    <input placeholder="Password" id="pass" type="password" className="input"
                                           data-type="password" value={newPassword}
                                           onChange={(e) => setNewPassword(e.target.value)}/>
                                </div>

                                <div className="group">
                                    <input type="submit" className="button" value="Sign Up"/>
                                </div>
                                <div className="hr"></div>
                                <div className="footer">
                                    <label htmlFor="item-1"><a href="/">Already have an account?</a></label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
        </Box>
    );
}

export default SignUp;