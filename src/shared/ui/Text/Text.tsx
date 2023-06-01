import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import {memo, ReactNode} from 'react';
interface TextProps {
    className?: string;
    title?: string | undefined;
    content?: string | undefined;
    children?: ReactNode;
}
export const Text = memo((props: TextProps) => {
    const {content, title, className, children} = props;
    return (
        <div className={classNames(cls.Text, {}, [className])}>
            { title && <div className={cls.title}>{title}</div>}
            {content && <div className={cls.content}>{content}</div>}
            {children}
        </div>
    );
});
