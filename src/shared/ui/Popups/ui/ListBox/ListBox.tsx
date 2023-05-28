import { Fragment, memo, ReactNode } from 'react';
import { Listbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from '../../styles/consts';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import popup from '../../styles/popups.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    disabled?: boolean;
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    label?: string;
    direction?: DropDownDirection;
}

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        onChange,
        defaultValue,
        disabled,
        label,
        direction = 'topRight',
    } = props;

    const optionsClasses = popup[direction];

    return (
        <Listbox
            disabled={disabled}
            as="div"
            value={value}
            onChange={onChange}
            className={classNames(popup.popup, { [popup.disabled]: disabled }, [className])}
        >
            <Listbox.Button as="div" className={popup.trigger}>
                {label && <span className={cls.label}>{`${label}>`}</span>}
                <Button disabled={disabled}>
                    {value || defaultValue}
                </Button>
            </Listbox.Button>
            <Listbox.Options className={classNames(cls.options, {}, [optionsClasses])}>
                {items?.map((item) => (
                    <Listbox.Option
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        as={Fragment}
                    >
                        {({ active, selected }) => (
                            <li
                                className={classNames(cls.item, { [popup.active]: active })}
                            >
                                {selected && '>'}
                                {item.content}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
});
