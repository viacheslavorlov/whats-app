import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {MessageSchema, ResponseSchema} from 'entities/Message';
import {MessageSendSchema} from 'entities/Notifications/model/type/NotificationsShema';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';
import {useSelector} from 'react-redux';
import {rtkApi} from 'shared/api/rtkApi';

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
)

// const sendMessageQuery = rtkApi.injectEndpoints({
//     endpoints: build => ({
//         sendMessage: build.mutation<{ idMessage: string }, {
//             apiTokenInstance: string, idInstance: string, body: MessageSendSchema
//         }>({
//             query: ({apiTokenInstance, idInstance, body}) => ({
//                 url: `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
//                 method: 'POST',
//                 body: body,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//         })
//     })
// });
//
//
// export const {useSendMessageMutation} = sendMessageQuery;