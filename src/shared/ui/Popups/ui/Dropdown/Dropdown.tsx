import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from '../../styles/consts';
import { AppLink } from '../../../AppLink/AppLink';
import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popups.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropDownDirection;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        trigger,
        className,
        items,
        direction = 'bottomLeft',
    } = props;
    const optionsClasses = popupCls[direction];

    return (
        <Menu as="div" className={classNames(popupCls.popup, {}, [className])}>
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.items, {}, [optionsClasses])}>
                {items.length && items.map((item, i) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, { [popupCls.active]: active })}
                        >
                            {item.content}
                        </button>
                    );
                    if (item.href) {
                        return (
                            <Menu.Item key={Date.now() + i.toString()} as={AppLink} to={item.href}>
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item key={Date.now() + i.toString()} as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
});
