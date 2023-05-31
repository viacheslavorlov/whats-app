import {ChangeEvent, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {Button, ButtonTheme} from 'shared/ui/Button';
import {LoadingSpinner} from 'shared/ui/LoadingSpinner';
import {VStack} from 'shared/ui/Stack';
import {getApiTokenInstance, getIdInstance} from '../model/selectors/authSelectors';
import {useGetAccountStateQuery} from '../model/service/fetchAccountState';
import {authActions} from '../model/slice/AuthorisationSlice';
import cls from './Authorisation.module.scss';

interface AuthorisationProps {
    className?: string;
    onClose: () => void;
}

export const Authorisation = memo((props: AuthorisationProps) => {
    const {
        className, onClose
    } = props;

    const dispatch = useDispatch();
    const idInstance = useSelector(getIdInstance);
    const apiTokenInstance = useSelector(getApiTokenInstance);

    const onIdInstanceChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setIdInstance(e.target.value));
        localStorage.setItem('setIdInstance', e.target.value);
    };

    const onApiTokenInstanceChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(authActions.setApiTokenInstance(e.target.value));
        localStorage.setItem('setApiTokenInstance', e.target.value);
    };

    const {data, isLoading} = useGetAccountStateQuery({idInstance, apiTokenInstance}, {});

    const onEnter = () => {
        if (idInstance && apiTokenInstance && data?.stateInstance === 'authorized') {
            dispatch(authActions.setAuthorized(data.stateInstance));
            onClose();
        }
    };

    return (
        <VStack max gap={'16'} align={'center'}
                className={classNames(cls.Authorisation, {}, [className])}>
            <h1>Авторизация</h1>
            <label className={cls.label} htmlFor="idInstance">Введите idInstance:
                <input
                    className={cls.input}
                    id="idInstance"
                    type="text"
                    value={idInstance}
                    onChange={onIdInstanceChange}
                /></label>

            <label className={cls.label} htmlFor="apiTokenInstance">Введите apiTokenInstance:
                <input
                    className={cls.input}
                    id="apiTokenInstance"
                    type="text"
                    value={apiTokenInstance}
                    onChange={onApiTokenInstanceChange}
                /></label>

            <Button

                theme={ButtonTheme.ROUNDED}
                className={cls.button}
                onClick={onEnter}>


                Войти
            </Button>
            {isLoading && <LoadingSpinner/>}
        </VStack>
    );
});
