import {createSlice} from '@reduxjs/toolkit';
import {MessageSliceShema} from '/entities/Message';

const initialState: MessageSliceShema = {
    message: {
        message: '',
        chatId: '',
    },
    isLoading: false,
    error: undefined,
    response: undefined
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message.message = action.payload;
        },
        clearMessageText: (state) => {
            state.message.message = '';
        }
    }
});

export const {actions: messageActions, reducer: messageReducer} = messageSlice;