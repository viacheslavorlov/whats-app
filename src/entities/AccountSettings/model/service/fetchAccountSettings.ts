import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ThunkConfig} from 'shared/types/thunkConfig/thunkConfig';
import {AccountData} from '../type/AccountSettingsShema';

export const fetchAccountSettings = createAsyncThunk<
    AccountData,
    { idInstance: string, apiTokenInstance: string },
    ThunkConfig<string>>(
        'AccountSettings',
        async ({idInstance, apiTokenInstance}, thunkAPI) => {
            const {rejectWithValue} = thunkAPI;
            try {
                console.log('fetchAccountSettings');
                const response = await axios(
                    `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`
                );
                return response.data;
            } catch ({message}) {
                rejectWithValue(`${message}`);
            }
        }
    );

