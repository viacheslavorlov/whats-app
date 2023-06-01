import {MessageShema} from '../../model/type/NotificationsShema';
import {memo} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import {VStack} from 'shared/ui/Stack';
import cls from './NotificationCard.module.scss';

interface NotificationCardProps {
    className?: string;
    notification: MessageShema;
}

export const NotificationCard = memo(({notification,className}: NotificationCardProps) => {
    const {
        typeWebhook, message,timestamp, senderData,
    } = notification;
    const time = new Date(timestamp * 1000).toString().substring(15, 21)
    // const sender = typeWebhook.startsWith('out') ? 'Я: ' : senderData.senderName || senderData.sender
    const align = typeWebhook.startsWith('out') ? cls.me : cls.notMe

    return (
        <VStack className={classNames(cls.NotificationCard, {}, [className, align])}>
            {/*<div >{sender}</div>*/}
            <div className={cls.message}>{message}</div>
            <div className={cls.time}>{time}</div>
        </VStack>
    );
});