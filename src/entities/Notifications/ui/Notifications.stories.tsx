import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Theme} from 'app/providers/TemeProvider';
import {ThemeDecorator} from 'shared/config/themeDecorator/themeDecorator';
import {Notifications} from './Notifications';

export default {
    title: 'shared/Notifications',
    component: Notifications,
    argTypes: {
        background: {control: 'background'},
    },
} as ComponentMeta<typeof Notifications>;

const Template: ComponentStory<typeof Notifications> = (args) => <Notifications {...args} />;

export const LightNotifications = Template.bind({});
LightNotifications.args = {};

export const DarkNotifications = Template.bind({});
DarkNotifications.args = {};
DarkNotifications.decorators = [ThemeDecorator(Theme.DARK)];
