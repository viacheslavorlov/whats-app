import {contactsSliceActions} from 'entities/Contacts/model/slice/ContactsSlice';
import {memo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {Button, ButtonTheme} from 'shared/ui/Button/Button';
import {VStack} from 'shared/ui/Stack';
import cls from './Contacts.module.scss';

interface ContactsProps {
    className?: string;
}

export const Contacts = memo((props: ContactsProps) => {
    const {
        className
    } = props;
    const dispatch = useDispatch();
    const [number, setNumber] = useState<string | undefined>()

    const onInputContact = (num: string | undefined) => {
        if (num && num.length === 11) {
            dispatch(contactsSliceActions.setNumber(Number(num)))
        }
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
            <Button
                theme={ButtonTheme.ROUNDED}
                className={cls.button}
                onClick={() =>onInputContact(number)}
            >
                Подтвердить
            </Button>
        </VStack>
    );
});