import {AccountSettingsSchema} from 'entities/AccountSettings';
import {MessageSliceShema} from 'entities/Message';
import {NotificationSliceShema} from 'entities/Notifications/model/type/NotificationsShema';
import {AuthorisationSchema} from 'features/Authorisation/model/type/AuthorisationShema';

import {rtkApi} from 'shared/api/rtkApi';

export interface StateSchema {
    message: MessageSliceShema
    authorisation: AuthorisationSchema,
    notifications: NotificationSliceShema
    accountSettings: AccountSettingsSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}