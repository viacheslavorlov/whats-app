// https://api.green-api.com/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {NotificationData} from 'entities/Notifications/model/type/NotificationsShema';

export const fetchNotification = createAsyncThunk(
    'fetchNotifications',
    async (_, thunkAPI) => {
        try {
            const response = await axios<NotificationData>(
                `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Error while fetching notifications')
        }
    },
)