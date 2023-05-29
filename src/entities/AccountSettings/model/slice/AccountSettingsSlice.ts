import {createSlice} from '@reduxjs/toolkit';
import {fetchAccountSettings} from 'entities/AccountSettings/model/service/fetchAccountSettings';
import {AccountSettingsSchema} from 'entities/AccountSettings/model/type/AccountSettingsShema';

const initialState: AccountSettingsSchema = {
    isLoading: false,
    error: undefined,
    accountData: {
        wid: '',
        countryInstance: '',
        typeAccount: '',
        webhookUrl: '',
        webhookUrlToken: '',
        delaySendMessagesMilliseconds: 0,
        markIncomingMessagesReaded: '',
        markIncomingMessagesReadedOnReply: '',
        outgoingWebhook: '',
        outgoingMessageWebhook: '',
        stateWebhook: '',
        incomingWebhook: '',
        deviceWebhook: '',
        statusInstanceWebhook: '',
        sendFromUTC: '',
        sendToUTC: ''
    }
}

const accountSettingsSlice = createSlice({
    name: 'accountSettings',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAccountSettings.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAccountSettings.fulfilled, (state, action) => {
                state.isLoading = false
                state.accountData = action.payload;
            })
            .addCase(fetchAccountSettings.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string;
            })
    }
})

export const {reducer: accountSettingsReducer, actions: accountSettingsActions} = accountSettingsSlice;