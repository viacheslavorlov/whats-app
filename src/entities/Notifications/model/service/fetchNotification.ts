// https://api.green-api.com/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}
// import {createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {rtkApi} from 'shared/api/rtkApi';
// import {NotificationData} from '../type/NotificationsShema';
// import {rtkApi} from 'shared/api/rtkApi';
//
// export const fetchNotification = createAsyncThunk(
//     'fetchNotifications',
//     async (_, thunkAPI) => {
//         try {
//             const response = await axios<NotificationData>(
//                 `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
//             );
//             if (!response.data) {
//                 throw new Error();
//             }
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue('Error while fetching notifications')
//         }
//     },
// )

const fetchNotification = rtkApi.injectEndpoints({
    endpoints: build => ({
        getNotification: build.query({
            query: () => ({
                url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
            }),
        })
    })
});

export const {useGetNotificationQuery} = fetchNotification;