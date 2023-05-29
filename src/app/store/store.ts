import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {StateSchema} from 'app/store/types/StateSchema';
import {accountSettingsReducer} from 'entities/AccountSettings';
import {messageReducer} from 'entities/Message/model/slice/MessageSlice';
import {notificationReducer} from 'entities/Notifications/model/slice/NotificationsSlice';

const combinedReducer = combineReducers<StateSchema>({
    message: messageReducer,
    accountSettings: accountSettingsReducer,
    notifications: notificationReducer
})

export const store = configureStore(
    {
        devTools: true,
        reducer: combinedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    }
)