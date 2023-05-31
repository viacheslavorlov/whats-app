import {createSlice} from '@reduxjs/toolkit';
import {MessageSliceShema} from '/entities/Message';
import {sendMessage} from '../service/sendMessage';

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
    },
    extraReducers: builder => {
        builder
            .addCase(sendMessage.pending, state => {
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.response = action.payload;
            });
    }
});

export const {actions: messageActions, reducer: messageReducer} = messageSlice;