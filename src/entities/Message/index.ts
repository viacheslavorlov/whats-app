export {Message} from './ui/Message';
export {messageReducer, messageActions} from './model/slice/MessageSlice';
export {
    getMessageError, getMessageLoading, getMessageSelector
} from './model/selectors/messageSelectors';
export {sendMessage} from './model/service/sendMessage'
export type {
    MessageSliceShema, MessageSchema, ResponseSchema, DeleteResponse
} from './model/type/MessageShema'

