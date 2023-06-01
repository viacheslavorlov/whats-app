import {rtkApi} from 'shared/api/rtkApi';

export const deleteNotification = rtkApi.injectEndpoints({
    endpoints: build => ({
        deleteNotification: build.mutation<{ result: boolean } | string, { receiptId: number, idInstance: string, apiTokenInstance: string }>({
            query: ({receiptId, apiTokenInstance, idInstance}) => ({
                url: `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                method: 'DELETE'
            })
        })
    })
});

export const {useDeleteNotificationMutation} = deleteNotification;