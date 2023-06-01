import {ChangeEvent, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from 'shared/lib/classNames/classNames';
import {LoadingSpinner} from 'shared/ui/LoadingSpinner';
import {VStack} from 'shared/ui/Stack';
import {Text} from 'shared/ui/Text';
import {getApiTokenInstance, getAuthorized, getIdInstance} from '../model/selectors/authSelectors';
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
    const authorized = useSelector(getAuthorized);

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
    const message = data?.stateInstance === 'authorized' ?
        <Text content={'Вы авторизованы в системе'}/>
        : (<>
            <Text className={cls.textNotAuthorized} title={'Вы НЕ авторизованы в системе:'}/>
            <Text
                className={cls.textNotAuthorized}
                content={'Перейдите в свой аккаунт https://green-api.com и авторизуйтесь с помощью QR-кода и телефона'}
            />
        </>);

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

            <button
                className={cls.button}
                onClick={onEnter}
            >
                Войти
            </button>
            {isLoading && <LoadingSpinner/>}
            <div>{message}</div>
        </VStack>
    );
});
