import {useLiveQuery} from 'dexie-react-hooks';
import {useDeleteNotificationMutation} from 'entities/Notifications/model/service/deleteNotification';
import {memo} from 'react';
import {db} from 'shared/db';
import {classNames} from 'shared/lib/classNames/classNames';
import {useGetNotificationQuery} from '../model/service/fetchNotification';
import cls from './Notifications.module.scss';

interface NotificationsProps {
    className?: string;
}

export const Notifications = memo((props: NotificationsProps) => {
    const {
        className
    } = props;

    const messages = useLiveQuery(() => db.notifications.toArray());
    const {data: notfication, isSuccess, error} = useGetNotificationQuery(null, {
        pollingInterval: 10000
    });
    const [deleteNotification] = useDeleteNotificationMutation();
    if (isSuccess && notfication) {
        db.notifications.add(notfication);
    }
    return (
        <div
            onClick={() => deleteNotification(Number(notfication.receiptId))}
            className={classNames(cls.Notifications, {}, [className])}>
            {notfication?.messageData?.extendedTextMessageData?.text || ''}
        </div>
    );
});