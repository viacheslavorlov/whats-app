import cls from 'app/style.module.scss';
import {fetchAccountSettings} from 'entities/AccountSettings';
import {Authorisation} from 'features/Authorisation';
import {getApiTokenInstance, getIdInstance} from '../model/selectors/authSelectors';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from 'shared/ui/Modal';

export const AuthWrapper = () => {
    const dispatch = useDispatch();
    const idInstance = useSelector(getIdInstance);
    const apiTokenInstance = useSelector(getApiTokenInstance);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const onCloseModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        dispatch(fetchAccountSettings({idInstance, apiTokenInstance}));
    }, [idInstance, apiTokenInstance]);


    return (
        <>
            <Modal className={cls.modal} isOpen={isOpen} onClose={onCloseModal}>
                <Authorisation onClose={onCloseModal}/>
            </Modal>
        </>
    );
};


