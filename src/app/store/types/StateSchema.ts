import {AccountSettingsSchema} from 'entities/AccountSettings';
import {MessageSliceShema} from 'entities/Message';
import {NotificationSliceShema} from 'entities/Notifications/model/type/NotificationsShema';
import {rtkApi} from 'shared/api/rtkApi';

export interface StateSchema {
    message: MessageSliceShema
    notifications: NotificationSliceShema
    accountSettings: AccountSettingsSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}