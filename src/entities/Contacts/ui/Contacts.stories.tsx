import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Theme} from 'app/providers/TemeProvider';
import {ThemeDecorator} from 'shared/config/themeDecorator/themeDecorator';
import {Contacts} from './Contacts';

export default {
    title: 'shared/Contacts',
    component: Contacts,
    argTypes: {
        background: {control: 'background'},
    },
} as ComponentMeta<typeof Contacts>;

const Template: ComponentStory<typeof Contacts> = (args) => <Contacts {...args} />;

export const LightContacts = Template.bind({});
LightContacts.args = {};

export const DarkContacts = Template.bind({});
DarkContacts.args = {};
DarkContacts.decorators = [ThemeDecorator(Theme.DARK)];
