import {App} from 'app/App';
import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';

const root = createRoot(
    document.getElementById('root') as HTMLElement,
);

if (!root) {
    throw new Error('Контейнер "root" найден, не удалось вмонтировать приложение');
}

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);