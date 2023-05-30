import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {NotificationData} from '../type/NotificationsShema';

export const deleteNotification = createAsyncThunk(
    'fetchNotifications',
    async (receiptId, thunkAPI) => {
        try {
            const response = await axios<NotificationData>(
                `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Error while deleting notifications')
        }
    },
)