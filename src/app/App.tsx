import {LoadingSpinner} from 'shared/ui/LoadingSpinner';
import {Header} from 'wigets/Header';
import './style.module.scss'

export const App = () => {
    return (
        <div>
            <Header/>
            WhatsApp
            <LoadingSpinner/>
        </div>
    );
};


