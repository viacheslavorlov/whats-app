export interface MessageSchema {
    chatId:	string; // Идентификатор чата
    message: string;	//	Текст сообщения. Поддерживаются символы emoji 😃 Максимальная длина текстового сообщения составляет 10000 символов
    quotedMessageId?: string; //	Идентификатор цитируемого сообщения,если указан то сообщение отправится с цитированием указанного сообщения чата
    archiveChat?: boolean; // Помещает в архив чат, в который отправлено сообщение. Принимает значения: true
    linkPreview?: boolean; // Параметр включает отображение превью и описание ссылки. По умолчанию включен. Принимает значения: true/false
}

export interface ResponseSchema {
    idMessage: string;
}

export interface MessageSliceShema {
    isLoading: boolean;
    error: undefined | string;
    message: MessageSchema;
    response: ResponseSchema | undefined;
}