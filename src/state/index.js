import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    name: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.token = actions.payload.token
            console.log('login success!' + state.token)
        },
        logout: (state, actions) => {
            state.token = null
            console.log('logout success!')

        },
        getUser: (state, actions) => {
            state.email = actions.payload.email
            state.name = actions.payload.name
        }
    }
})

export const {login, logout, getUser} = authSlice.actions
export default authSlice.reducer