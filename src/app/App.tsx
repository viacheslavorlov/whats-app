import {Message} from 'entities/Message';
import {Notifications} from 'entities/Notifications';
import {SideBar} from 'shared/ui/SideBar';
import {HStack} from 'shared/ui/Stack';
import {Header} from 'wigets/Header';
import './style.module.scss'

export const App = () => {
    return (
        <HStack>
            <SideBar>
                <Header/>
                <Notifications />
            </SideBar>
            <div>
                <Message />
            </div>

        </HStack>
    );
};


