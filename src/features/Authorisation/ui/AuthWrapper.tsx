import {fetchAccountSettings} from 'entities/AccountSettings';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from 'shared/ui/Modal';
import {getApiTokenInstance, getIdInstance} from '../model/selectors/authSelectors';
import {Authorisation} from './Authorisation';
import cls from './Authorisation.module.scss';

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
    }, [dispatch, idInstance, apiTokenInstance]);


    return (
        <>
            <Modal className={cls.modal} isOpen={isOpen} onClose={onCloseModal}>
                <Authorisation onClose={onCloseModal}/>
            </Modal>
        </>
    );
};


