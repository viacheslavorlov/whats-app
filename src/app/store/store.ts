import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {StateSchema} from 'app/store/types/StateSchema';
import {accountSettingsReducer} from 'entities/AccountSettings';
import {contactsSliceReducer} from 'entities/Contacts/model/slice/ContactsSlice';
import {messageReducer} from 'entities/Message';
import {notificationReducer} from 'entities/Notifications/model/slice/notificationSlice';
import {authReducer} from 'features/Authorisation/model/slice/AuthorisationSlice';
import {rtkApi} from 'shared/api/rtkApi';

const combinedReducer = combineReducers<StateSchema>({
    message: messageReducer,
    authorisation: authReducer,
    notifications: notificationReducer,
    contacts: contactsSliceReducer,
    accountSettings: accountSettingsReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
})

export const store = configureStore(
    {
        devTools: true,
        reducer: combinedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
    }
)