import {createSlice} from '@reduxjs/toolkit';
import {AuthorisationSchema} from 'features/Authorisation/model/type/AuthorisationShema';

const initialState: AuthorisationSchema = {
    idInstance: '',
    apiTokenInstance: '',
    authorized: ''
};

const authorisationSlice = createSlice({
    name: 'authoriastion',
    initialState,
    reducers: {
        setIdInstance: (state, action) => {
            state.idInstance = action.payload;
        },
        setApiTokenInstance: (state, action) => {
            state.apiTokenInstance = action.payload;
        },
        setAuthorized: (state, action) => {
            state.authorized = action.payload;
        },
        logOut: (state) => {
            state.apiTokenInstance = '';
            state.idInstance = '';
            state.authorized = '';
        }
    }
});

export const {reducer: authReducer, actions: authActions} = authorisationSlice;