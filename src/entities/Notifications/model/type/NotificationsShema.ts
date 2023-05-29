export interface NotificationData {
    receiptId: number | undefined,
    body: {
        typeWebhook: string,
        instanceData: {
            idInstance: number,
            wid: string,
            typeInstance: string
        },
        timestamp: number,
        idMessage: string,
        senderData: {
            chatId: string,
            sender: string,
            senderName: string
        },
        messageData:{
            typeMessage:string,
            textMessageData:{
                textMessage:string
            }
        }
    } | undefined;
}


export interface NotificationsSchema {
    isLoading: boolean;
    error: string | undefined;
    data: NotificationData | undefined;
}