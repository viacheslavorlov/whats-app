import {fetchNotification} from 'entities/Notifications/model/service/fetchNotification';
import {useDispatch} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Notifications.module.scss';
import {memo, useEffect} from 'react';

interface NotificationsProps {
    className?: string;
}

export const Notifications = memo((props: NotificationsProps) => {
    const {
        className
    } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotification());
    }, [])

    return (
        <div className={classNames(cls.Notifications, {}, [className])}>

        </div>
    );
});