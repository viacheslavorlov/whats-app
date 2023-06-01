import { createSlice } from '@reduxjs/toolkit';
import {ContactsSchema} from '../type/ContactsShema';

const initialState: ContactsSchema = {
    contacts: [],
    currentContact: undefined
};

export const ContactsSliceSlice = createSlice({
    name: 'ContactsSlice',
    initialState,
    reducers: {
        setNumber: (state, action) => {
            state.currentContact = action.payload
        }
    },
});

export const { reducer: contactsSliceReducer, actions: contactsSliceActions } = ContactsSliceSlice;
