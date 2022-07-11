import axios from "axios"

let serverUrl = ""

export let login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" })

        let { data } = await axios.post(`${serverUrl}/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "loginSuccess", payload: data })
    } catch (err) {
        dispatch({ type: "loginFailure", payload: err.response.data.message })
    }
}

export let loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" })

        let { data } = await axios.get(`${serverUrl}/me`);
        dispatch({ type: "loadUserSuccess", payload: data })
    } catch (err) {
        dispatch({ type: "loadUserFailure", payload: err.response.data.message })
    }
}

export let addTask = (title, description) => async (dispatch) => {
    try {
        dispatch({ type: "addTaskRequest" })

        let { data } = await axios.post(`${serverUrl}/newtask`, {
            title, description,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        dispatch({ type: "addTaskSuccess", payload: data.message })

    } catch (err) {
        dispatch({ type: "addTaskFailure", payload: err.response.data.message })
    }
}

export let updateTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: "updateTaskRequest" })

        let { data } = await axios.get(`${serverUrl}/task/${taskId}`)
        dispatch({ type: "updateTaskSuccess", payload: data.message })

    } catch (err) {
        dispatch({ type: "updateTaskFailure", payload: err.response.data.message })

    }
}

export let deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteTaskRequest" })

        let { data } = await axios.delete(`${serverUrl}/task/${taskId}`)
        dispatch({ type: "deleteTaskSuccess", payload: data.message })
    } catch (err) {
        dispatch({
            type: "deleteTaskFailure",
            payload: err.response.data.message
        })
    }
}

export let updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfileRequest" })

        let { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: "updateProfileSuccess", payload: data.message })
    } catch (err) {
        dispatch({
            type: "updateProfileFailure",
            payload: err.response.data.message
        })
    }
}

export let logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" })

        await axios.get(`${serverUrl}/logout`)
        dispatch({ type: "logoutSuccess" })

    } catch (err) {
        dispatch({
            type: "logoutFailure",
            payload: err.response.data.message
        })
    }
}

export let register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "registerRequest" })

        let { data } = await axios.post(`${serverUrl / register}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        dispatch({ type: "registerSuccess", payload: data })
    } catch (err) {
        dispatch({
            type: "registerFailure",
            payload: err.response.data.message
        })
    }
}

export let updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: "updatePasswordRequest" })

        let { data } = await axios.put(`${serverUrl}/updatepassword`, { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        dispatch({ type: "updatePasswordSuccess", payload: data.message })
    } catch (err) {
        dispatch({
            type: "updatePasswordFailure",
            payload: err.response.data.message
        })

    }
}

export let verify = (otp) => async (dispatch) => {
    try {
        dispatch({ type: "verificationRequest" })

        let { data } = await axios.post(`${serverUrl}/verify`, { otp }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "verificationSuccess", payload: data.message })
    } catch (err) {
        dispatch({ type: "verificationFailure", payload: err.response.data.message })
    }
}

export let forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: "forgetPasswordRequest" })

        let { data } = await axios.post(`${serverUrl}/forgetpassword`, { email }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({ type: "forgetPasswordSuccess", payload: data.message })
    } catch (err) {
        dispatch({
            type: "forgetPasswordFailure",
            payload: err.response.data.message
        })
    }
}

export let resetPassword = (otp, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: "resetPasswordRequest" })

        let { data } = await axios.put(`${serverUrl}/resetpassword`, { otp, newPassword }, {
            headers: { "Content-Type": "application/json", }
        })
        dispatch({ type: "resetPasswordSuccess", payload: data.message })
    } catch (err) {
        dispatch({ type: "resetPasswordFailure", payload: err.response.data.message })
    }
}