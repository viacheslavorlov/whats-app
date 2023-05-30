import {memo, useEffect} from 'react';
import {classNames} from 'shared/lib/classNames/classNames';
import {useDeleteNotificationMutation, useGetNotificationQuery} from '../model/service/fetchNotification';
import cls from './Notifications.module.scss';

interface NotificationsProps {
    className?: string;
}

export const Notifications = memo((props: NotificationsProps) => {
    const {
        className
    } = props;
    const {data, isLoading, error, refetch} = useGetNotificationQuery({
        pollingInterval: 3000
    });
    const [deleteNotification, result] = useDeleteNotificationMutation();

    useEffect(() => {
        refetch();
    }, [refetch])

    if (data === null) {
        return (
            <div className={classNames(cls.Notifications, {}, [className])}>
                Нет новых уведомлений
            </div>
        )
    }

    const text = data?.body?.messageData?.extendedTextMessageData?.text || '';

    return (
        <div
            onClick={()=> {
                refetch()
                deleteNotification(data.receiptId)
            }}
            className={classNames(cls.Notifications, {}, [className])}>
            {text || ''}
        </div>
    );
});