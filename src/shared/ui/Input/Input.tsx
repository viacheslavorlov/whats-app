import {
    ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>
interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number;
    onChange?: (value: string) => void;
    placeholder?: string;
    autofocused?: boolean;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        value,
        type = 'text',
        className,
        onChange,
        placeholder,
        autofocused,
        readonly,
        ...otherProps
    } = props;
    const [isFocused, setIsFocused] = useState(autofocused);
    const [carretPosition, setCarretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onSelect = (e: any) => {
        setCarretPosition(e?.target?.selectionStart || 0);
    };

    useEffect(() => {
        if (autofocused) {
            setIsFocused(autofocused);
            ref?.current?.focus();
        }
    }, [autofocused]);

    const mods = {
        [cls.readonly]: readonly,
    };

    const isCaretVisible = isFocused && !readonly;

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {
                placeholder && (
                    <div className={cls.placeholder}>
                        {`${placeholder}>`}
                    </div>
                )
            }
            <div className={cls.caretWrapper}>
                <input
                    {...otherProps}
                    readOnly={readonly}
                    ref={ref}
                    value={value}
                    onChange={onChangeHandler}
                    type={type}
                    className={cls.input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                />
                {isCaretVisible && (
                    <span
                        style={{ left: `${carretPosition * 9.6}px` }}
                        className={cls.caret}
                    />
                )}
            </div>
        </div>
    );
});
