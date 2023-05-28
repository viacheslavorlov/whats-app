import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { CardVariant } from './const/cardConst';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
    variant?: CardVariant;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = CardVariant.NORMAL,
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(cls.Card, {}, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
