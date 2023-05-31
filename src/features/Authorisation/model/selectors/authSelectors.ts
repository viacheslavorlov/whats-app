import {StateSchema} from 'app/store/types/StateSchema';

export const getIdInstance = (state: StateSchema) => state.authorisation.idInstance;
export const getApiTokenInstance = (state: StateSchema) => state.authorisation.apiTokenInstance;
export const getAuthorized = (state: StateSchema) => state.authorisation.authorized || '';