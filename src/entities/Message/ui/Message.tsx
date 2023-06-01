import {getCurrentContact} from 'entities/Contacts/model/selectors/contactSelectors';
// import {useSendMessageMutation} from 'entities/Message/model/service/sendMessage';
import {useGetNotificationQuery} from 'entities/Notifications/model/service/fetchNotification';
import {notificationActions} from 'entities/Notifications/model/slice/notificationSlice';
import {MessageShema} from 'entities/Notifications/model/type/NotificationsShema';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';
import {ChangeEvent, memo, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {HStack} from 'shared/ui/Stack';
import {getMessageSelector,} from '../model/selectors/messageSelectors';

import {messageActions} from '../model/slice/MessageSlice';
import cls from './Message.module.scss';
import Send from '../assets/send.svg';
import { Icon } from 'shared/ui/Icon';
import { sendMessage } from '../model/service/sendMessage';

interface MessageProps {
    className?: string;
}

export const Message = memo((props: MessageProps) => {
    const {
        className
    } = props;
    const number = useSelector(getCurrentContact)
    const dispatch = useDispatch();

    const messageData = useSelector(getMessageSelector);
    const onHandleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(messageActions.setMessage(e.target.value));
    };

    const idInstance = useSelector(getIdInstance)
    const apiTokenInstance = useSelector(getApiTokenInstance)
    const {refetch} = useGetNotificationQuery({idInstance, apiTokenInstance}, {})


    const disabled = !number;

    // const [sendMessage] = useSendMessageMutation()

    const onSendMessage = useCallback(() => {
        const localMessage: MessageShema = {
            message: messageData.message,
            timestamp: Math.round(Date.now() / 1000),
            typeWebhook: 'outgoingMessageSent',
            chatId: `${number}@c.us`,
            receiptId: Date.now()
        }
        if (messageData.message.trim()) {
            dispatch(sendMessage({
                message: messageData.message, chatId: `${number}@c.us`
            }));
            dispatch(notificationActions.addNotification(localMessage));
            dispatch(messageActions.clearMessageText());
            refetch()
        }
    },[messageData, dispatch, number, refetch]);
    useEffect(() => {
        function handleKeyPress(event: { key: string; }) {
            if (event.key === 'Enter') {
                onSendMessage()
            }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [onSendMessage]);

    return (
        <HStack max justify={'center'} align={'center'} className={classNames(cls.Message, {}, [className])}>
            <textarea
                placeholder={'Введите сообщение'}
                value={messageData.message}
                onChange={onHandleText}
                disabled={disabled}
                className={cls.textarea}/>

            <button

                className={cls.btn}
                onClick={onSendMessage}>
                <Icon Svg={Send} height={30} width={30} fill={'#7c8b95'}/>
            </button>
        </HStack>
    );
});