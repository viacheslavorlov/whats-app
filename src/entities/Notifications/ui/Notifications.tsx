import {getCurrentContact} from 'entities/Contacts/model/selectors/contactSelectors';
import {NotificationCard} from 'entities/Notifications/ui/NotificationCard/NotificationCard';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';
import {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {VStack} from 'shared/ui/Stack';
import {Text} from 'shared/ui/Text';
import PlaceholderImage from '../../../shared/assets/background.svg';
import {getNotifications} from '../model/selectors/notificationSelector';
import {useDeleteNotificationMutation} from '../model/service/deleteNotification';
import {useGetNotificationQuery} from '../model/service/fetchNotification';
import {notificationActions} from '../model/slice/notificationSlice';
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
    const currentNumber = useSelector(getCurrentContact);
    const idInstance = useSelector(getIdInstance);
    const apiTokenInstance = useSelector(getApiTokenInstance);
    const {data, refetch} = useGetNotificationQuery({idInstance, apiTokenInstance}, {
        pollingInterval: 3000
    });

    const messageContent = messages.filter(message => {
        if (message.senderData?.sender === `${currentNumber}@c.us` || message.typeWebhook === 'outgoingMessageSent') {
            return true;
        } else {
            return false;
        }
    }).map((msg) => <NotificationCard key={msg.timestamp} notification={msg}/>);

    const [deleteNotification] = useDeleteNotificationMutation();

    useEffect(() => {
        if (data && data.typeWebhook !== 'incomingMessageReceived') {
            deleteNotification({receiptId: data.receiptId, idInstance, apiTokenInstance});
        } else if (data && data.message !== '') {
            dispatch(notificationActions.addNotification(data));
            deleteNotification({receiptId: data.receiptId, idInstance, apiTokenInstance});
        }
    }, [data, deleteNotification, dispatch, refetch]);

    const styles = {
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    };

    return (
        currentNumber ? (
            <VStack
                max
                style={styles}
                justify={'end'}
                className={classNames(cls.Notifications, {}, [className])}>
                {messageContent}
            </VStack>
        ) : (
            <VStack
                max
                justify={'center'}
                align={'center'}
                className={classNames(cls.Notifications, {}, [className])}>
                <PlaceholderImage/>
                <Text className={cls.text} content={'Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым.'}/>
            </VStack>
        )
    );
});