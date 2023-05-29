export interface AccountData {
    wid: string,
    countryInstance: string,
    typeAccount: string,
    webhookUrl: string,
    webhookUrlToken: string,
    delaySendMessagesMilliseconds: number,
    markIncomingMessagesReaded: string,
    markIncomingMessagesReadedOnReply: string,
    outgoingWebhook: string,
    outgoingMessageWebhook: string,
    stateWebhook: string,
    incomingWebhook: string,
    deviceWebhook: string,
    statusInstanceWebhook: string,
    sendFromUTC: string,
    sendToUTC: string
}

export interface AccountSettingsSchema {
    isLoading: boolean;
    error: undefined | string;
    accountData: AccountData
}