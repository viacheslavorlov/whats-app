import { memo, ReactNode, useCallback } from 'react';
import { classNames} from 'shared/lib/classNames/classNames';
import { CardVariant } from 'shared/ui/Card';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    // eslint-disable-next-line no-unused-vars
    onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className, tabs, onTabClick, value,
    } = props;

    const onClickHandle = useCallback((tab: TabItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    onClick={onClickHandle(tab)}
                    variant={tab.value === value ? CardVariant.NORMAL : CardVariant.OUTLINED}
                    key={tab.value}
                    className={cls.tab}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
