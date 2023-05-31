import {classNames} from 'shared/lib/classNames/classNames';
import {VStack} from '../../Stack';
import cls from './SideBar.module.scss';
import {memo, ReactNode} from 'react';

interface SideBarProps {
    className?: string;
    children: ReactNode;
}

export const SideBar = memo((props: SideBarProps) => {
    const {
        className, children
    } = props;

    return (
        <VStack align={'center'} justify={'start'} className={classNames(cls.SideBar, {}, [className])}>
            {children}
        </VStack>
    );
});