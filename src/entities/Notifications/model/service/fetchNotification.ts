// https://api.green-api.com/waInstance{{idInstance}}/receiveNotification/{{apiTokenInstance}}

import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {Message, NotificationData} from '../type/NotificationsShema';
import {rtkApi} from 'shared/api/rtkApi';

const fetchNotification = rtkApi.injectEndpoints({
    endpoints: build => ({
        getNotification: build.query<Message | null, null>({
            query: () => ({
                url: `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
            }),// @ts-ignore
            transformResponse: (response: NotificationData | null) => {
                if (response === null || response?.body?.typeWebhook === 'stateInstanceChanged') {
                    return null;
                }
                const message = response?.body?.messageData?.extendedTextMessageData?.text || response?.body?.messageData?.textMessageData?.textMessage;
                console.log(message);
                const timestamp = response.body.timestamp;
                const senderData = {
                    // @ts-ignore
                    sender: response.body.senderData.sender,
                    // @ts-ignore
                    senderName: response.body.senderData.senderName
                };
                return {// @ts-ignore
                    receiptId: response.receiptId,
                    // @ts-ignore
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