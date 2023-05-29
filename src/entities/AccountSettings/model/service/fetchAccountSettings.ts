import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {idInstance, apiTokenInstance} from 'entities/AccountSettings/model/const/constID';
import {AccountData} from 'entities/AccountSettings/model/type/AccountSettingsShema';
import {AccountSettings} from 'entities/AccountSettings/ui/AccountSettings';
import {ThunkConfig} from 'shared/types/thunkConfig/thunkConfig';

export const fetchAccountSettings = createAsyncThunk<AccountData, null, ThunkConfig<string>>(
    'AccountSettings',
    async (_, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            console.log('fetchAccountSettings');
            const response = await axios(`https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`)
            return response.data;
        } catch ({message}) {
            rejectWithValue(`${message}`)
        }
    }
)

