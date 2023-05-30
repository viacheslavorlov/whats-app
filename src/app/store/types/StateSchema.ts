import {AccountSettingsSchema} from 'entities/AccountSettings';
import {MessageSliceShema} from 'entities/Message';
import {rtkApi} from 'shared/api/rtkApi';

export interface StateSchema {
    message: MessageSliceShema
    accountSettings: AccountSettingsSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}