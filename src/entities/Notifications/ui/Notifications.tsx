import {Message} from 'entities/Notifications/model/type/NotificationsShema';
import {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {getNotifications} from '../model/selectors/notificationSelector';
import {useDeleteNotificationMutation} from '../model/service/deleteNotification';
import {useGetNotificationQuery} from '../model/service/fetchNotification';
import {notificationActions} from '../model/slice/notificationSlice';
// import {useGetNotificationQuery} from '../model/service/fetchNotification';
import cls from './Notifications.module.scss';

interface NotificationsProps {
    className?: string;
}

export const Notifications = memo((props: NotificationsProps) => {
    const {
        className
    } = props;
    const dispatch = useDispatch();
    const messages = useSelector(getNotifications)
    const {data, isSuccess, refetch} = useGetNotificationQuery(null, {
        pollingInterval: 3000
    });

    const [deleteNotification] = useDeleteNotificationMutation();
    useEffect(() => {
        if (data) {
            console.log(data);
            if (data?.typeWebhook !== 'stateInstanceChanged') {
                dispatch(notificationActions.addNotification(data))
            }
            deleteNotification(data.receiptId)
            refetch()
        }
    }, [data, deleteNotification, dispatch, refetch])
    return (
        <div className={classNames(cls.Notifications, {}, [className])}>
            {messages.map((msg: Message) => (
                <div key={msg.receiptId}>
                    {msg.typeWebhook.startsWith('outgoing') ? 'Я: ' : msg.senderData.senderName + ': '}
                    {msg.message}
                </div>
            ))}
        </div>
    );
});