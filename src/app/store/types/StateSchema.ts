import {AccountSettingsSchema} from 'entities/AccountSettings';
import {MessageSliceShema} from 'entities/Message/model/type/MessageShema';
import {NotificationsSchema} from 'entities/Notifications/model/type/NotificationsShema';

export interface StateSchema {
    message: MessageSliceShema
    notifications: NotificationsSchema;
    accountSettings: AccountSettingsSchema;
}