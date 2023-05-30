import {getNotifications} from 'entities/Notifications/model/selectors/notificationSelector';
import {notificationActions} from 'entities/Notifications/model/slice/notificationSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useGetNotificationQuery} from '../model/service/fetchNotification';
import {memo, useEffect, useState} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import {useDeleteNotificationMutation} from '../model/service/deleteNotification';
// import {useGetNotificationQuery} from '../model/service/fetchNotification';
import cls from './Notifications.module.scss';

interface NotificationsProps {
    className?: string;
}

export interface Message {
    receiptId: number,
    body: any;
}

export const Notifications = memo((props: NotificationsProps) => {
    const {
        className
    } = props;
    const dispatch = useDispatch();
    const messages = useSelector(getNotifications)
    const {data, isSuccess, refetch} = useGetNotificationQuery(null, {});

    const [deleteNotification] = useDeleteNotificationMutation();
    useEffect(() => {
        if (data){
            dispatch(notificationActions.addNotification(data))
            deleteNotification(data.receiptId)
            refetch()
        }
    }, [data, deleteNotification, dispatch, refetch])
    return (
        <div
            className={classNames(cls.Notifications, {}, [className])}
            onClick={() => deleteNotification(Number(data.receiptId))}>
            {messages.map(msg => <div key={msg.receiptId}>{msg.receiptId}{msg.body.messageData?.extendedTextMessageData?.text}</div>)}
        </div>
    );
});