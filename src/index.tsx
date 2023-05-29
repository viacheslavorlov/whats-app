import {App} from 'app/App';
import {store} from 'app/store/store';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

const root = createRoot(
    document.getElementById('root') as HTMLElement,
);

if (!root) {
    throw new Error('Контейнер "root" не найден, не удалось вмонтировать приложение');
}

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);