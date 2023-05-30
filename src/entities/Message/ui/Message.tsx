import {useGetNotificationQuery} from 'entities/Notifications/model/service/fetchNotification';
import {ChangeEvent, memo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {Button} from 'shared/ui/Button';
import {HStack, VStack} from 'shared/ui/Stack';
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
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const messageData = useSelector(getMessageSelector);
    const isLoading = useSelector(getMessageLoading);
    const error = useSelector(getMessageError);
    const onHandleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(messageActions.setMessage(e.target.value));
    };

    const onChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value);
    };
    const {refetch} = useGetNotificationQuery(null, {})

    const onSendMessage = () => {
        dispatch(sendMessage({message: messageData.message, chatId: `${number}@c.us`}));
        dispatch(messageActions.clearMessageText());
        refetch()
    };

    return (
        <VStack max justify={'center'} align={'center'} className={classNames(cls.Message, {}, [className])}>
            <input type="text" placeholder={'Введите номер абонента'} value={number} onChange={onChangeNumber}/>
            <textarea
                placeholder={'Введите сообщение'}
                value={messageData.message}
                onChange={onHandleText}
                className={cls.textarea}/>
            <Button onClick={onSendMessage}>Send</Button>
        </VStack>
    );
});