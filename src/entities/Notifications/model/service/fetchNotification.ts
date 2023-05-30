// https://api.green-api.com/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}
import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {DeleteResponse} from 'entities/Message';
import {rtkApi} from 'shared/api/rtkApi';

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
            query: () => `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
        }),
        deleteNotification: build.mutation<DeleteResponse, number>({
            query: (receiptId) => ({
                url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                method: 'DELETE'
            })
        })
    })
});

export const {useGetNotificationQuery, useDeleteNotificationMutation} = fetchNotification;