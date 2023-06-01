import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {MessageSchema, ResponseSchema} from '../type/MessageShema';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';

export const sendMessage = createAsyncThunk<ResponseSchema, MessageSchema>(
    'sendMessage',
    async (message, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        // @ts-ignore
        const idInstance = getIdInstance(getState())
        // @ts-ignore
        const apiTokenInstance = getApiTokenInstance(getState())
        try {
            console.log('sending message');
            const response = await axios(
                `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
                {
                    method: 'POST',
                    data: message,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data;
        } catch (e) {
            rejectWithValue(e)
        }
    }
);