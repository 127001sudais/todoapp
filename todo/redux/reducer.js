import { createReducer } from "@reduxjs/toolkit"

export let authReducer = createReducer(
    {}, {
    loginRequest: (state) => {
        state.loading = true;
    }, loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;

    },
    registerRequest: (state, action) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    loadUserRequest: (state) => {
        state.loading = true;

    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload
    },
    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.err = action.payload;
    },
    verificationRequest: (state) => {
        state.loading = true;
    },
    verificationSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    verificationFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload

    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null
    },

}
);

export let messageReducer = createReducer({}, {
    addTaskRequest: (state) => {
        state.loading = true;
    },
    addTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addTaskFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateTaskRequest: (state) => {
        state.loading = true;
    },
    updateTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    updateTaskFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteTaskRequest: (state) => {
        state.loading = true
    }, deleteTaskSuccess: (state, action) => {
        state.loading = false,
        state.message = action.payload
    }

})