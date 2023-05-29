import {classNames} from 'shared/lib/classNames/classNames';
import cls from './AccountSettings.module.scss';
import {memo} from 'react';

interface UserProps {
    className?: string;
}

export const AccountSettings = memo((props: UserProps) => {
    const {
        className
    } = props;



    return (
        <div className={classNames(cls.User, {}, [className])}>
            Account Settings
        </div>
    );
});