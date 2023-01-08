import React, {useState} from 'react';
// import './login.css'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {login} from "../state";
import {useTheme, Box, TextField, Button} from "@mui/material";
import {tokens} from "../theme";
import Header from "../components/Header";
import {Formik} from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";


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

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

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
        // <Box m="20px">
        //     <Box display="flex" justifyContent="space-between" alignItems="center">
        //
        //         <div className="container">
        //             <div className="login-container">
        //                 <Header title="SIGN IN" subtitle="Log in and use the service"/>
        //                 {/*<input id="item-1" type="radio" name="item" className="sign-in" checked/>*/}
        //                 {/*<label htmlFor="item-1" className="item">Sign In</label>*/}
        //                 <div className="login-form">
        //                     <form onSubmit={setLogin}>
        //
        //                         <div className="sign-in-htm">
        //                             <div className="group">
        //                                 <input placeholder="email" id="user" type="email" className="input"
        //                                        value={email}
        //                                        onChange={(e) => setEmail(e.target.value)}/>
        //                             </div>
        //                             <div className="group">
        //                                 <input placeholder="Password" id="pass" type="password" className="input"
        //                                        data-type="password" value={password}
        //                                        onChange={(e) => setPassword(e.target.value)}/>
        //                             </div>
        //
        //                             <div className="group">
        //                                 <input type="submit" className="button" value="Sign In"/>
        //                             </div>
        //                             <div className="hr"></div>
        //                             <div className="footer">
        //                                 <a href="/signUp">Create Account</a>
        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     <div className="container">
        //         <div className="login-container">
        //             <Header title="SIGN UP" subtitle="Log in and use the service"/>
        //             {/*<input id="item-1" type="radio" name="item" className="sign-in" checked/>*/}
        //             {/*<label htmlFor="item-1" className="item">Sign In</label>*/}
        //             <div className="login-form">
        //                 <form onSubmit={setLogin}>
        //
        //                     <div className="sign-in-htm">
        //                         <div className="group">
        //                             <input placeholder="email" id="user" type="email" className="input"
        //                                    value={email}
        //                                    onChange={(e) => setEmail(e.target.value)}/>
        //                         </div>
        //                         <div className="group">
        //                             <input placeholder="Password" id="pass" type="password" className="input"
        //                                    data-type="password" value={password}
        //                                    onChange={(e) => setPassword(e.target.value)}/>
        //                         </div>
        //
        //                         <div className="group">
        //                             <input type="submit" className="button" value="Sign In"/>
        //                         </div>
        //                         <div className="hr"></div>
        //                         <div className="footer">
        //                             <a href="/signUp">Create Account</a>
        //                         </div>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        //     </Box>
        //
        //
        // </Box>
        <Box m="20px">
            {/*<Box display="flex" justifyContent="space-between" alignItems="center">*/}

            <Box
                display="grid"
                gridTemplateColumns="repeat(7, 1fr)"
                gridAutoRows="400px"
                gap="100px"
                border="1px solid grey"
            >
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid grey"

                >
                    <form onSubmit={setLogin}>
                        <Header title="Log In" subtitle="Log in and Use the service"/>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="email"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // value={values.firstName}
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // error={!!touched.firstName && !!errors.firstName}
                            // helperText={touched.firstName && errors.firstName}
                            // sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="password"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // value={values.lastName}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // error={!!touched.lastName && !!errors.lastName}
                            // helperText={touched.lastName && errors.lastName}
                            // sx={{gridColumn: "span 2"}}
                        />
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Log In
                            </Button>
                        </Box>
                    </form>
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid grey"

                >
                    {/*Sign Up*/}
                    <form onSubmit={setLogin}>
                        <Header title="Sign Up" subtitle="Create a New User Profile"/>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="name"
                            label="name"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // value={values.lastName}
                            name="text"
                            // value={name}
                            // onChange={(e) => setPassword(e.target.value)}
                            // error={!!touched.lastName && !!errors.lastName}
                            // helperText={touched.lastName && errors.lastName}
                            sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="email"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // value={values.firstName}
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // error={!!touched.firstName && !!errors.firstName}
                            // helperText={touched.firstName && errors.firstName}
                            sx={{gridColumn: "span 2"}}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="password"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            // value={values.lastName}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // error={!!touched.lastName && !!errors.lastName}
                            // helperText={touched.lastName && errors.lastName}
                            sx={{gridColumn: "span 2"}}
                        />

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>

            {/*</Box>*/}
        </Box>
    );
}

export default Login;