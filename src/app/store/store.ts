import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {StateSchema} from 'app/store/types/StateSchema';
import {accountSettingsReducer} from 'entities/AccountSettings';
import {messageReducer} from 'entities/Message';
import {rtkApi} from 'shared/api/rtkApi';

const combinedReducer = combineReducers<StateSchema>({
    message: messageReducer,
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