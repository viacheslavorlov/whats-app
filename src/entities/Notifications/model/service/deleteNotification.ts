import {apiTokenInstance, idInstance} from 'entities/AccountSettings';
import {rtkApi} from 'shared/api/rtkApi';

export const deleteNotification = rtkApi.injectEndpoints({
    endpoints: build => ({
        deleteNotification: build.mutation<{result: boolean} | string, number>({
            query: (receiptId) => ({
                url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                method: 'DELETE'
            })
        })
    })
});

export const {useDeleteNotificationMutation} = deleteNotification;