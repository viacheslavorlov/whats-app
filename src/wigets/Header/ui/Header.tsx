import {classNames} from 'shared/lib/classNames/classNames';
import {HStack} from 'shared/ui/Stack';
import {Text} from 'shared/ui/Text';
import cls from './Header.module.scss';
import {memo} from 'react';
import Logo from 'shared/assets/logo.svg'
import { Icon } from 'shared/ui/Icon';

interface HeaderProps {
    className?: string;
}

export const Header = memo((props: HeaderProps) => {
    const {
        className
    } = props;

    return (
        <HStack
            max
            align="center"
            justify="between"
            className={classNames(cls.Header, {}, [className])}
        >
            <Icon Svg={Logo} width={39} height={39}/>
            <Text title={'WhatsApp'} className={cls.title} />
        </HStack>
    );
});