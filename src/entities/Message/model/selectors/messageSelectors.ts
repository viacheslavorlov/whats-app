import {StateSchema} from 'app/store/types/StateSchema';

export const getMessageSelector = (state: StateSchema) => state.message.message;
export const getMessageLoading  = (state: StateSchema) => state.message.isLoading;
export const getMessageError  = (state: StateSchema) => state.message.error;