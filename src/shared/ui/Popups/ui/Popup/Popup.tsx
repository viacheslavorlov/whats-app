import { memo, ReactNode } from 'react';
import { Popover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '../../styles/consts';
import cls from './Popup.module.scss';
import popupCls from '../../styles/popups.module.scss';

interface PopupProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropDownDirection;
    children: ReactNode;
}

export const Popup = memo((props: PopupProps) => {
    const {
        className, children, trigger, direction = 'bottomRight',
    } = props;

    const optionsClasses = popupCls[direction];

    return (
        <Popover className={classNames(popupCls.popup, {}, [className, cls.Popup])}>
            <Popover.Button as="div" className={classNames(popupCls.trigger, {}, [])}>{trigger}</Popover.Button>
            <Popover.Panel className={classNames(cls.items, {}, [optionsClasses])}>
                {children}
            </Popover.Panel>
        </Popover>
    );
});
