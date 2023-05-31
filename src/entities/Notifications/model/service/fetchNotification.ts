// https://api.green-api.com/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}

import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {Message, NotificationData} from '../type/NotificationsShema';
import {rtkApi} from 'shared/api/rtkApi';

const fetchNotification = rtkApi.injectEndpoints({
    endpoints: build => ({
        getNotification: build.query<Message, {apiTokenInstance: string, idInstance: string}>({
            query: ({apiTokenInstance, idInstance}) => ({
                url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
            }),// @ts-ignore
            transformResponse: (response: NotificationData) => {
                if (response === null || !/message/ig.test(response.body?.typeWebhook)) {
                    return {
                        typeWebhook: response?.body?.typeWebhook || '',
                        receiptId: response?.receiptId || '',
                        message: '',
                        senderData: {},
                        timestamp: response?.body.timestamp || 0
                    };
                }
                const message = response.body?.messageData?.extendedTextMessageData?.text || response.body?.messageData?.textMessageData?.textMessage;
                console.log(message);
                const timestamp = response.body.timestamp;
                const senderData = {
                    sender: response.body?.senderData?.sender,
                    senderName: response.body?.senderData?.senderName
                };
                return {
                    receiptId: response.receiptId,
                    typeWebhook: response.body.typeWebhook,
                    message,
                    timestamp,
                    senderData
                };


            }
        })
    })
});

export const {useGetNotificationQuery} = fetchNotification;