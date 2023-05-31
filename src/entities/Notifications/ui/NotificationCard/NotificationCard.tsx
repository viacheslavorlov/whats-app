import {Message, NotificationData} from 'entities/Notifications/model/type/NotificationsShema';
import {memo} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import {VStack} from 'shared/ui/Stack';
import cls from './NotificationCard.module.scss';

interface NotificationCardProps {
    className?: string;
    notification: Message;
}

export const NotificationCard = memo(({notification,className}: NotificationCardProps) => {
    const {
        typeWebhook, message,timestamp, senderData,
    } = notification;
    const date = new Date(timestamp * 1000).toLocaleString()
    const sender = typeWebhook.startsWith('out') ? 'Я: ' : senderData.senderName || senderData.sender

    return (
        <VStack className={classNames(cls.NotificationCard, {}, [className])}>
            <div>{sender}</div>
            <div>{message}</div>
            <div>{date}</div>
        </VStack>
    );
});