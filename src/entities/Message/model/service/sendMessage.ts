import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {idInstance, apiTokenInstance} from 'entities/AccountSettings/model/const/constID';
import {MessageSchema, ResponseSchema} from 'entities/Message/model/type/MessageShema';

export const sendMessage = createAsyncThunk<ResponseSchema, MessageSchema>(
    'sendMessage',
    async (message, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
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
)

