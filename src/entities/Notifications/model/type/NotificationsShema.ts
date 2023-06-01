export type NotificationData = Notification | null;

export interface Notification {
    receiptId: number,
    body: {
        typeWebhook: string,
        instanceData?: {
            idInstance: number,
            wid: string,
            typeInstance: string
        },
        timestamp?: number,
        idMessage?: string,
        senderData?: {
            chatId: string,
            chatName?: string,
            sender: string,
            senderName: string
        },
        messageData?: {
            typeMessage: string,
            textMessageData?: {
                textMessage?: string
            }
            extendedTextMessageData?: {
                text: string
            }
        }
    };
}

export interface MessageSendSchema {
    chatId: string;
    message: string;
}

export interface MessageShema {
    receiptId: number;
    typeWebhook: string;
    message: string;
    timestamp: number;
    senderData?: {
        sender: string;
        senderName: string;
    };
}

export interface NotificationSliceShema {
    notifications: MessageShema[]
}

const data = {
    'receiptId': 59,
    'body': {
        'typeWebhook': 'incomingMessageReceived',
        'instanceData': {
            'idInstance': 1101825879,
            'wid': '79539051812@c.us',
            'typeInstance': 'whatsapp'
        },
        'timestamp': 1685472935,
        'idMessage': '8F38E1441830D480A3655779E35553A6',
        'senderData': {
            'chatId': '79116011800@c.us',
            'chatName': 'Elena',
            'sender': '79116011800@c.us',
            'senderName': 'Elena'
        },
        'messageData': {
            'typeMessage': 'textMessage',
            'textMessageData': {
                'textMessage': 'Завтра в 7.40'
            }
        }
    }
};

const outgoing = {
    'receiptId': 60,
    'body': {
        'typeWebhook': 'outgoingMessageReceived',
        'instanceData': {
            'idInstance': 1101825879,
            'wid': '79539051812@c.us',
            'typeInstance': 'whatsapp'
        },
        'timestamp': 1685472969,
        'idMessage': '62AD4EB9451EF397466A0E3318F3F7B1',
        'senderData': {
            'chatId': '79116011800@c.us',
            'chatName': 'Elena',
            'sender': '79539051812@c.us',
            'senderName': 'Orlov Viacheslav'
        },
        'messageData': {
            'typeMessage': 'textMessage',
            'textMessageData': {
                'textMessage': 'Ок'
            }
        }
    }
};

const outgoingMessageStatus = {
    'receiptId': 61,
    'body': {
        'typeWebhook': 'outgoingMessageStatus',
        'chatId': '79116011800@c.us',
        'instanceData': {
            'idInstance': 1101825879,
            'wid': '79539051812@c.us',
            'typeInstance': 'whatsapp'
        },
        'timestamp': 1685472969,
        'idMessage': '62AD4EB9451EF397466A0E3318F3F7B1',
        'status': 'sent',
        'sendByApi': false
    }
};

const outG2 = {
    'receiptId': 62,
    'body': {
        'typeWebhook': 'outgoingMessageStatus',
        'chatId': '79116011800@c.us',
        'instanceData':
            {
                'idInstance': 1101825879, 'wid': '79539051812@c.us', 'typeInstance': 'whatsapp'
            },
        'timestamp': 1685472969,
        'idMessage': '62AD4EB9451EF397466A0E3318F3F7B1',
        'status': 'delivered',
        'sendByApi': false
    }
};