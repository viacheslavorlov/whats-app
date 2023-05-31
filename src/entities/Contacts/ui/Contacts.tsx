import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Contacts.module.scss';
import {memo} from 'react';

interface ContactsProps {
    className?: string;
}

export const Contacts = memo((props: ContactsProps) => {
    const {
        className
    } = props;

    return (
        <div className={classNames(cls.Contacts, {}, [className])}>

        </div>
    );
});