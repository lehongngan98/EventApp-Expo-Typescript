import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import { SplashScreen } from '../screens';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { NavigationContainer } from '@react-navigation/native';

const AppRouters = () => {

    const [isShowSplash, setisShowSplash] = useState(true);

    const { getItem } = useAsyncStorage('auth');

    const auth = useSelector(authSelector);

    const dispatch = useDispatch();


    useEffect(() => {
        checkLogin();

        const timeout = setTimeout(() => {
            setisShowSplash(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [])


    const checkLogin = async () => {
        const res = await getItem();
        if (res) {
            dispatch(addAuth(JSON.parse(res)));
            console.log("res :", res);
        } else {
            // Xử lý trường hợp không tìm thấy thông tin đăng nhập

        }

    }


    return (
        <>
            {
                isShowSplash ? (<SplashScreen />) : (auth.accesstoken ? <MainNavigator /> : <AuthNavigator />)
            }
        </>
    )
}

export default AppRouters