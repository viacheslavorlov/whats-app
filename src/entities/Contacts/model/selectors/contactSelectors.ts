import {StateSchema} from 'app/store/types/StateSchema';

export const getCurrentContact = (state: StateSchema) => state.contacts.currentContact || undefined;
export const getContacts = (state: StateSchema) => state.contacts.contacts || [];