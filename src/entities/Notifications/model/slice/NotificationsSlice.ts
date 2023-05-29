import {createSlice} from '@reduxjs/toolkit';
import {fetchNotification} from 'entities/Notifications/model/service/fetchNotification';
import {NotificationsSchema} from 'entities/Notifications/model/type/NotificationsShema';

const initialState: NotificationsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNotification.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    console.log(action.payload);
                    state.data = action.payload
                }
            })
            .addCase(fetchNotification.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            })
    }
});

export const {actions: notificationActions, reducer: notificationReducer} = notificationsSlice;