import {Contacts} from 'entities/Contacts';
import {Message} from 'entities/Message';
import {Notifications} from 'entities/Notifications';
import {getAuthorized} from 'features/Authorisation/model/selectors/authSelectors';
import {AuthWrapper} from 'features/Authorisation/ui/AuthWrapper';
import {useSelector} from 'react-redux';
import {SideBar} from 'shared/ui/SideBar';
import {HStack, VStack} from 'shared/ui/Stack';
import {Header} from 'wigets/Header';
import './style.module.scss'


export const App = () => {

    const authorized = useSelector(getAuthorized);

    return (
        <VStack max>
            <>
            <Header/>
            <AuthWrapper/>
            {
                authorized && (
                    <HStack max>
                        <SideBar>
                            <Contacts/>
                        </SideBar>
                        <div>
                            <Notifications/>
                            <Message/>
                        </div>
                    </HStack>
                )
            }
            </>
        </VStack>
    );
};


