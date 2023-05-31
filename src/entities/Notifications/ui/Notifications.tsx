import {Message} from 'entities/Notifications/model/type/NotificationsShema';
import {NotificationCard} from 'entities/Notifications/ui/NotificationCard/NotificationCard';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';
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
    const messages = useSelector(getNotifications);
    const idInstance = useSelector(getIdInstance);
    const apiTokenInstance = useSelector(getApiTokenInstance);
    const {data, isSuccess, refetch} = useGetNotificationQuery({idInstance, apiTokenInstance}, {
        pollingInterval: 3000
    });
    const messageContent = messages.map(msg => <NotificationCard notification={msg} />)


    const [deleteNotification] = useDeleteNotificationMutation();
    useEffect(() => {
        if (data && data.typeWebhook === 'stateInstanceChanged') {
            deleteNotification(Number(data.receiptId));
        }
        if (data && data.message !== '') {
            dispatch(notificationActions.addNotification(data));
            deleteNotification(Number(data.receiptId));
        }
    }, [data, deleteNotification, dispatch, refetch]);
    return (
        <div className={classNames(cls.Notifications, {}, [className])}>
            {messageContent}
        </div>
    );
});