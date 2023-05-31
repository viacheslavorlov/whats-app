import {AccountSettingsSchema} from 'entities/AccountSettings';
import {ContactsSchema} from 'entities/Contacts/model/type/ContactsShema';
import {MessageSliceShema} from 'entities/Message';
import {NotificationSliceShema} from 'entities/Notifications/model/type/NotificationsShema';
import {AuthorisationSchema} from 'features/Authorisation/model/type/AuthorisationShema';

import {rtkApi} from 'shared/api/rtkApi';

export interface StateSchema {
    message: MessageSliceShema;
    authorisation: AuthorisationSchema;
    notifications: NotificationSliceShema;
    contacts: ContactsSchema;
    accountSettings: AccountSettingsSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}