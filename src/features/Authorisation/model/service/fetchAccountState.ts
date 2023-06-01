import {rtkApi} from 'shared/api/rtkApi';

const fetchAccountState = rtkApi.injectEndpoints({
    endpoints: build => ({
        getAccountState: build.query<{ stateInstance: string }, {idInstance: string, apiTokenInstance: string}>({
            query: (
                {idInstance, apiTokenInstance}
            ) =>`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`})
    })
})

export const {useGetAccountStateQuery} = fetchAccountState;