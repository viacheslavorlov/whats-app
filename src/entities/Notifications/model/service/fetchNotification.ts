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
            transformResponse: (ressponse) => {
                let message, timestamp, senderData;
                // @ts-ignore
                if (!ressponse.body.typeWebhook.match('API')) {
                    // @ts-ignore
                    message = ressponse.body.messageData.textMessageData.textMessage;
                    // @ts-ignore
                    timestamp = ressponse.body.timestamp;
                    senderData = {
                        // @ts-ignore
                        sender: ressponse.body.senderData.sender,
                        // @ts-ignore
                        senderName: ressponse.body.senderData.senderName
                    };
                    return {// @ts-ignore
                        receiptId: ressponse.receiptId,
                        message,
                        timestamp,
                        senderData
                    };
                } else {// @ts-ignore
                    message = ressponse.body.messageData.textMessageData.textMessage;
                    // @ts-ignore
                    timestamp = ressponse.body.timestamp;
                    senderData = {// @ts-ignore
                        sender: ressponse.body.senderData.sender,
                        // @ts-ignore
                        senderName: ressponse.body.senderData.senderName
                    };
                    return {// @ts-ignore
                        receiptId: ressponse.receiptId,
                        message,
                        timestamp,
                        senderData
                    };
                }
            }
        })
    })
});

export const {useGetNotificationQuery} = fetchNotification;