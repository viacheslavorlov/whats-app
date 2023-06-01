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

## Интернационализация

Для работы с переводами в проекте использована библиотека i18next.
Файлы с переводами хранятся в папке public/locales.

Для удобства можно использовать плагин i18next для вашего редактора:
[webstorm](https://plugins.jetbrains.com/plugin/16316-easy-i18n),
[vscode](https://github.com/lokalise/i18n-ally)

Документация по библиотеке: https://www.i18next.com/

----

## Тестирование

В проекте используется 3 вида тестов:

1. Unit - тесты - `npm run unit`
2. Тесты для React-компонентов с [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
    - `npm run unit`
3. Скриншотное тестирование loki + storybook - `npm run loki:test`

--------

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
