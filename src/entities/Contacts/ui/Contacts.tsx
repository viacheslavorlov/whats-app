import {contactsSliceActions} from '../model/slice/ContactsSlice';
import {memo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {VStack} from 'shared/ui/Stack';
import {Text} from 'shared/ui/Text';
import cls from './Contacts.module.scss';

interface ContactsProps {
    className?: string;
}

export const Contacts = memo((props: ContactsProps) => {
    const {
        className
    } = props;
    const dispatch = useDispatch();
    const [number, setNumber] = useState<string | undefined>();
    const [active, setActive] = useState<boolean>(false);

    const onInputContact = (num: string | undefined) => {
        if (num && num.length === 11) {
            dispatch(contactsSliceActions.setNumber(Number(num)));
            setActive(true);
        }
    };

    const onExitContact = () => {
        dispatch(contactsSliceActions.setNumber(Number(undefined)));
        setActive(false);
    };

    return (
        <VStack max gap="8" justify={'center'} align={'center'} className={classNames(cls.Contacts, {}, [className])}>
            <input
                className={cls.input}
                type="text"
                placeholder={'Введите номер абонента'}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button
                className={cls.button}
                onClick={() => onInputContact(number)}
            >
                Подтвердить
            </button>
            <br/>
            {
                active ?
                    <Text className={cls.text} title={`Активный чат с абонентом: +${number}`}/>
                    :
                    <Text className={cls.text} title={'Нет активного чата'}/>
            }
            <button
                className={cls.exitButton}
                onClick={onExitContact}
            >
                Выйти
            </button>
        </VStack>
    );
});