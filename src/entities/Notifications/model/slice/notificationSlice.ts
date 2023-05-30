import {createSlice} from '@reduxjs/toolkit';
import {NotificationSliceShema} from '../type/NotificationsShema';
const initialState: NotificationSliceShema = {
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notificztions',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            // @ts-ignore
            state.notifications.push(action.payload)
        }
    }
})

export const {reducer: notificationReducer, actions: notificationActions} = notificationSlice