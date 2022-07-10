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