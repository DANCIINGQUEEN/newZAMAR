import React from 'react';
import {useSelector} from "react-redux";
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";

function AuthPage(props) {

    const isAuth=Boolean(useSelector((state)=>state.token))

    return (
        <Login/>
    );
}

export default AuthPage;