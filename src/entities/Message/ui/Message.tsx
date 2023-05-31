import {getCurrentContact} from 'entities/Contacts/model/selectors/contactSelectors';
import {useGetNotificationQuery} from 'entities/Notifications/model/service/fetchNotification';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';
import {ChangeEvent, memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {Button} from 'shared/ui/Button';
import { VStack} from 'shared/ui/Stack';
import {getMessageError, getMessageLoading, getMessageSelector,} from '../model/selectors/messageSelectors';
import {sendMessage} from '../model/service/sendMessage';
import {messageActions} from '../model/slice/MessageSlice';
import cls from './Message.module.scss';

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

    const onSendMessage = () => {
        dispatch(sendMessage({message: messageData.message, chatId: `${number}@c.us`}));
        dispatch(messageActions.clearMessageText());
        refetch()
    };

    return (
        <VStack max justify={'center'} align={'center'} className={classNames(cls.Message, {}, [className])}>
            <textarea
                placeholder={'Введите сообщение'}
                value={messageData.message}
                onChange={onHandleText}
                className={cls.textarea}/>
            <Button onClick={onSendMessage}>Send</Button>
        </VStack>
    );
});