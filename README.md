[![Netlify Status](https://api.netlify.com/api/v1/badges/fac5ff46-31a4-47b8-9aa8-55a10833e24c/deploy-status)](https://app.netlify.com/sites/whats-app-green-api/deploys)

## Настройка и запуск проекта

```
    npm install - установка зависимостей
    npm run start:dev или  npm run vite:dev - запуск проекта и локального сервера с фейковым бекендом
```

----              -----

## Скрипты

- `"start"`: "webpack --env port=3000",
- `"build:production"`: "webpack --env mode=production",  продакшн сборка на webpack
- `"build:development"`: "webpack --env mode=development", сборка на webpack в режиме разработки
- `"lint:ts"`: "eslint \"**/*.{ts,tsx}\"", - проверка линтером
- `"lint:ts:fix"`: "eslint \"**/*.{ts,tsx}\" --fix", - проверка линтером с фиксом ошибок
- `"stylelint"`: "stylelint \"**/*.scss\"", запуск stylelint
- `"stylelint:fix"`: "stylelint \"**/*.scss\" --fix", запуск stylelint c фиксом ошибок

---

## Архитектура проекта

Написание проекта проходило в соответствии с методологией Feature sliced design

Ссылка на полную документацию: [FSD](https://feature-sliced.design/ru/docs/get-started/overview)

----         ------------

## Линтер

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Для контроля за соблюдением FSD архитектуры используется самодельный
eslint-plugin-[fsd-architecture-checker](https://github.com/viacheslavorlov/eslint-plugin-fsd-architecture-checker)

- import-path-checker: запрет абсолютных путей в рамках одного модуля


#### Запуск линтера:

- `"lint:ts"`: "eslint \"**/*.{ts,tsx}\"", - проверка линтером
- `"lint:ts:fix"`: "eslint \"**/*.{ts,tsx}\" --fix", - проверка линтером с фиксом ошибок
- `"stylelint"`: "stylelint \"**/*.scss\"", запуск stylelint
- `"stylelint:fix"`: "stylelint \"**/*.scss\" --fix", запуск stylelint c фиксом ошибок


## React-hooks

### useModal:
Этот хук использует другие встроенные хуки, такие как  `useState` ,  `useCallback` , и  `useEffect` , чтобы управлять состоянием модального окна, отслеживать открытие и закрытие модального окна, а также управлять его анимацией.
Для использования этого хука необходимо импортировать его из пакета  `react` . Хук принимает объект параметров  `UseModalProps` , в который можно передать функцию обратного вызова  `onClose`  для закрытия модального окна, флаг  `isOpen`  для управления состоянием открытия модального окна и задержку анимации  `animationDelay` .
Внутри хука создается состояние  `isClosing` , которое используется для определения закрытия модального окна. Создается также состояние  `isMounted` , которое определяет открытие и закрытие модального окна и используется для запуска анимации закрытия. Создается ссылка  `timerRef` , которая используется для задания задержки анимации закрытия.
Функция  `close`  обратного вызова вызывается при закрытии модального окна. Она проверяет наличие функции  `onClose` , устанавливает состояние  `isClosing`  в  `true` , и задает задержку анимации закрытия. Когда задержка заканчивается, вызывается функция  `onClose` , устанавливается состояние  `isClosing`  в  `false` .
Функция  `onKeyDown`  обратного вызова используется для закрытия модального окна клавишей Esc. Она вызывается при нажатии клавиши клавиатуры и вызывает функцию  `close` , если код нажатой клавиши равен  `'Escape'` .
Хук  `useModal`  подписывается на изменение состояния  `isOpen`  и отслеживает нажатие клавиши Esc. Он устанавливает слушатель событий клавиатуры, который отслеживает нажатие на клавишу Esc, и удаляет его, когда модальное окно закрыто. Если значение  `isOpen`  равно  `true` , устанавливается состояние  `isMounted`  в  `true` .
Хук возвращает объект, содержащий функцию  `close` , флаг  `isClosing` , который определяет закрыто ли модальное окно, и флаг  `isMounted` , который определяет открыто ли модальное окно.

```typescript
import {
    useCallback, useEffect, useRef, useState,
} from 'react';

export interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

export function useModal({
    animationDelay, isOpen, onClose,
}: UseModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return { close, isClosing, isMounted };
}

```
## Сложные компоненты

### Message.tsx
Данный компонент представляет собой форму для отправки сообщений в мессенджере WhatsApp. Он содержит следующие импорты из различных модулей:

-  getCurrentContact  из модуля  contactSelectors  в  entities/Contacts/model/selectors ;
-  useGetNotificationQuery  из модуля  fetchNotification  в  entities/Notifications/model/service ;
-  notificationActions  из модуля  notificationSlice  в  entities/Notifications/model/slice ;
-  MessageShema  из модуля  NotificationsShema  в  entities/Notifications/model/type ;
-  getApiTokenInstance  и  getIdInstance  из модуля  authSelectors  в  features/Authorisation/model/selectors ;
-  memo ,  useCallback ,  useEffect ,  useDispatch  и  useSelector  из модуля  react ;
-  classNames  из модуля  classNames  в  shared/lib/classNames ;
-  HStack  из модуля  Stack  в  shared/ui/Stack ;
-  getMessageSelector ,  messageActions ,  sendMessage  и  cls  из модуля  MessageSlice  в  ../model/slice/MessageSlice ;
-  Send  и  Icon  из модуля  assets  и  ui  в  ../assets/send.svg  и  shared/ui/Icon  соответственно.

Компонент содержит интерфейс  MessageProps , который имеет свойство  className . Компонент экспортируется как  Message.

Внутри компонента определены следующие переменные:

-  number , содержащая текущий контакт;
-  dispatch , используемая для отправки действий в Redux-хранилище;
-  messageData , содержащая данные о сообщении;
-  idInstance  и  apiTokenInstance , содержащие идентификатор и токен для авторизации;
-  refetch , используемая для повторного запроса данных;
-  disabled , содержащая значение, указывающее, отключена ли кнопка отправки сообщения.

Также в компоненте определены следующие функции:

-  onHandleText , используемая для обновления текста сообщения;
-  onSendMessage , используемая для отправки сообщения с помощью функции  sendMessage ;

Компонент также содержит эффект  useEffect , который используется для обработки нажатия клавиши Enter при отправке сообщения.

Возвращаемое значение компонента - форма, содержащая текстовое поле для ввода сообщения и кнопку отправки сообщения.


```typescript jsx
import {getCurrentContact} from 'entities/Contacts/model/selectors/contactSelectors'; 
// import {useSendMessageMutation} from 'entities/Message/model/service/sendMessage'; 
import {useGetNotificationQuery} from 'entities/Notifications/model/service/fetchNotification'; 
import {notificationActions} from 'entities/Notifications/model/slice/notificationSlice'; 
import {MessageShema} from 'entities/Notifications/model/type/NotificationsShema'; 
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors'; 
import {ChangeEvent, memo, useCallback, useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux'; 
import {classNames} from 'shared/lib/classNames/classNames'; 
import {HStack} from 'shared/ui/Stack'; 
import {getMessageSelector,} from '../model/selectors/messageSelectors'; 
import {messageActions} from '../model/slice/MessageSlice'; 
import cls from './Message.module.scss'; 
import Send from '../assets/send.svg'; 
import { Icon } from 'shared/ui/Icon'; 
import { sendMessage } from '../model/service/sendMessage'; 
 
interface MessageProps { 
    className?: string; 
} 
 
export const Message = memo((props: MessageProps) => { 
    const { 
        className 
    } = props; 
    const number = useSelector(getCurrentContact) 
    const dispatch = useDispatch(); 
 
    const messageData = useSelector(getMessageSelector); 
    const onHandleText = (e: ChangeEvent<HTMLTextAreaElement>) => { 
        dispatch(messageActions.setMessage(e.target.value)); 
    }; 
 
    const idInstance = useSelector(getIdInstance) 
    const apiTokenInstance = useSelector(getApiTokenInstance) 
    const {refetch} = useGetNotificationQuery({idInstance, apiTokenInstance}, {}) 
 
 
    const disabled = !number; 
 
    // const [sendMessage] = useSendMessageMutation() 
 
    const onSendMessage = useCallback(() => { 
        const localMessage: MessageShema = { 
            message: messageData.message, 
            timestamp: Math.round(Date.now() / 1000), 
            typeWebhook: 'outgoingMessageSent', 
            chatId: `${number}@c.us`, 
            receiptId: Date.now() 
        } 
        if (messageData.message.trim()) { 
            dispatch(sendMessage({ 
                message: messageData.message, chatId: `${number}@c.us` 
            })); 
            dispatch(notificationActions.addNotification(localMessage)); 
            dispatch(messageActions.clearMessageText()); 
            refetch() 
        } 
    },[messageData, dispatch, number, refetch]); 
    useEffect(() => { 
        function handleKeyPress(event: { key: string; }) { 
            if (event.key === 'Enter') { 
                onSendMessage() 
            } 
        } 
        window.addEventListener('keydown', handleKeyPress); 
        return () => { 
            window.removeEventListener('keydown', handleKeyPress); 
        }; 
    }, [onSendMessage]); 
 
    return ( 
        <HStack max justify={'center'} align={'center'} className={classNames(cls.Message, {}, [className])}> 
            <textarea 
                placeholder={'Введите сообщение'} 
                value={messageData.message} 
                onChange={onHandleText} 
                disabled={disabled} 
                className={cls.textarea}/>
            <button
                className={cls.btn} 
                onClick={onSendMessage}> 
                <Icon Svg={Send} height={30} width={30} fill={'#7c8b95'}/> 
            </button> 
        </HStack> 
    ); 
});
```

### Notifications.tsx

Компонент Notifications отвечает за отображение уведомлений, связанных с учетной записью WhatsApp пользователя. Он использует несколько импортированных компонентов и селекторов для получения и отображения уведомлений.
Props:
- className (необязательно): строка, представляющая имя класса, которое будет применено к компоненту.
  Импорты:
- getCurrentContact: селектор, который извлекает текущий контакт WhatsApp.
- NotificationCard: компонент, который отображает одно уведомление.
- getApiTokenInstance, getIdInstance: селекторы, которые извлекают токен API и идентификатор экземпляра для учетной записи WhatsApp пользователя.
- memo, useEffect, useDispatch, useSelector: хуки React, используемые для управления состоянием и обновления компонента.
- classNames: утилита, используемая для генерации имен классов для компонента.
- VStack: компонент, который отображает своих детей в вертикальном стеке.
- Text: компонент, который отображает текст.
- PlaceholderImage: изображение, которое будет отображаться, когда нет уведомлений для отображения.
- getNotifications: селектор, который извлекает список уведомлений, которые будут отображаться.
- useDeleteNotificationMutation: хук, который удаляет уведомление из списка.
- useGetNotificationQuery: хук, который извлекает уведомления с сервера.
- notificationActions: срез, содержащий состояние и действия, связанные с уведомлениями.
- cls: объект, содержащий имена CSS-классов для стилизации компонента.
  Состояние:
- messages: массив уведомлений, которые будут отображаться.
- currentNumber: текущий контакт WhatsApp.
- idInstance, apiTokenInstance: идентификатор экземпляра и токен API для учетной записи WhatsApp пользователя.
- data: данные, полученные с сервера.
- refetch: функция, используемая для обновления данных с сервера.
  Функции:
- deleteNotification: функция, которая удаляет уведомление из списка.
  Эффекты:
- useEffect: используется для управления изменениями состояния и обновления компонента при необходимости.
  Рендер:
- Если есть текущий контакт WhatsApp, компонент отображает вертикальный стек компонентов NotificationCard, каждый из которых представляет одно уведомление.
- Если текущего контакта WhatsApp нет, компонент отображает PlaceholderImage и компонент Text с сообщением, объясняющим, как использовать компонент.

```typescript jsx

import {getCurrentContact} from 'entities/Contacts/model/selectors/contactSelectors';
import {NotificationCard} from './NotificationCard/NotificationCard';
import {getApiTokenInstance, getIdInstance} from 'features/Authorisation/model/selectors/authSelectors';
import {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {VStack} from 'shared/ui/Stack';
import {Text} from 'shared/ui/Text';
import PlaceholderImage from '../../../shared/assets/background.svg';
import {getNotifications} from '../model/selectors/notificationSelector';
import {useDeleteNotificationMutation} from '../model/service/deleteNotification';
import {useGetNotificationQuery} from '../model/service/fetchNotification';
import {notificationActions} from '../model/slice/notificationSlice';
import cls from './Notifications.module.scss';

interface NotificationsProps {
    className?: string;
}

export const Notifications = memo((props: NotificationsProps) => {
    const {
        className
    } = props;

    const dispatch = useDispatch();
    const messages = useSelector(getNotifications);
    const currentNumber = useSelector(getCurrentContact);
    const idInstance = useSelector(getIdInstance);
    const apiTokenInstance = useSelector(getApiTokenInstance);
    const {data, refetch} = useGetNotificationQuery({idInstance, apiTokenInstance}, {
        pollingInterval: 3000
    });

    const messageContent = messages.filter(message => {
        if (message.senderData?.sender === `${currentNumber}@c.us` || message.typeWebhook === 'outgoingMessageSent') {
            return true;
        } else {
            return false;
        }
    }).map((msg) => <NotificationCard key={msg.timestamp} notification={msg}/>);

    const [deleteNotification] = useDeleteNotificationMutation();

    useEffect(() => {
        if (data && data.typeWebhook !== 'incomingMessageReceived') {
            deleteNotification({receiptId: data.receiptId, idInstance, apiTokenInstance});
        } else if (data && data.message !== '') {
            dispatch(notificationActions.addNotification(data));
            deleteNotification({receiptId: data.receiptId, idInstance, apiTokenInstance});
        }
    }, [data, deleteNotification, dispatch, refetch, idInstance, apiTokenInstance]);

    const styles = {
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    };

    return (
        currentNumber ? (
            <VStack
                max
                style={styles}
                justify={'end'}
                className={classNames(cls.Notifications, {}, [className])}>
                {messageContent}
            </VStack>
        ) : (
            <VStack
                max
                justify={'center'}
                align={'center'}
                className={classNames(cls.Notifications, {}, [className])}>
                <PlaceholderImage/>
                <Text
                    className={cls.text}
                    content={'Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым.'}
                />
            </VStack>
        )
    );
});
```