import { Lock1, Sms, User } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Switch, View } from 'react-native'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
// import SocialLogin from './components/SocialLogin'
import { LoadingModal } from '../../modal'
import axiosClient from '../../apis/axiosClient'
import authentication from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface ErrorMessages {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}


const initValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};



const SignUpScreen = ({ navigation }: any) => {


    const [values, setValues] = useState(initValues);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>({});

    const [isDisable, setIsDisable] = useState(true);

    const dispatch = useDispatch();

   

    useEffect(() => {
        const hasErrors = Object.values(errorMessage).some(msg => msg !== '');
        const allFieldsFilled = Object.values(values).every(value => value !== '');
        setIsDisable(hasErrors || !allFieldsFilled);
    }, [errorMessage, values]);

    const handleChangeValue = (key: string, value: string) => {
        setValues(prevValues => ({ ...prevValues, [key]: value }));
    };



    const handleRegister = async () => {
        const api = '/verification';
        setLoading(true);
        try {
            const res = await authentication.HandleAuthentication(api,{email: values.email},'post');
            
            console.log(res);
            setLoading(false);
            if(res.status === 200){
                navigation.navigate('Verification',{code: res.data.code, ...values});
            }
            
        } catch (error) {
            console.log(error);     
            setLoading(false);       
        }

    };

    const formValidator = (key: string) => {
        const data: any = { ...errorMessage };
        let message = '';

        switch (key) {
            case 'username':
                if (!values.username) {
                    message = 'Full name is required!';
                } else {
                    message = '';
                }
                break;

            case 'email':
                if (!values.email) {
                    message = 'Email is required!';
                } else if (!Validate.email(values.email)) {
                    message = 'Invalid email address!';
                }
                else {
                    message = '';
                }
                break;

            case 'password':
                if (!values.password) {
                    message = 'Password is required!';
                } else if (!Validate.Password(values.password)) {
                    message = 'Password must be at least 6 characters long!';
                } else {
                    message = '';
                }
                break;

            case 'confirmPassword':
                if (!values.confirmPassword) {
                    message = 'Confirm password is required!';
                } else if (!Validate.Password(values.confirmPassword)) {
                    message = 'Confirm Password must be at least 6 characters long!';
                } else if (values.password !== values.confirmPassword) {
                    message = 'Password and confirm password do not match!';
                } else {
                    message = '';
                }
                break;

        }

        data[`${key}`] = message;
        setErrorMessage(data);
    };

    return (
        <>
            <ContainerComponent isImageBackground isScroll back >

                <SectionComponent
                    styles={{}}
                >
                    <TextComponent text='Sign Up' size={24} font={fontFamilies.medium} />

                    <SpaceComponent height={21} />

                    <InputComponent
                        value={values.username}
                        onChange={val => handleChangeValue('username', val)}
                        placeholder='Full name'
                        allowClear
                        affix={<User size={22} color={appColors.gray3} />}
                        type='default'
                        onEnd={() => formValidator('username')}
                    />

                    <InputComponent
                        value={values.email}
                        onChange={val => handleChangeValue('email', val)}
                        placeholder='Email'
                        allowClear
                        affix={<Sms size={22} color={appColors.gray3} />}
                        type='default'
                        onEnd={() => formValidator('email')}
                    />

                    <InputComponent
                        value={values.password}
                        onChange={val => handleChangeValue('password', val)}
                        placeholder='Password'                        
                        isPassword
                        allowClear
                        affix={<Lock1 size={22} color={appColors.gray3} />}
                        type='email-address'
                        onEnd={() => formValidator('password')}
                    />

                    <InputComponent
                        value={values.confirmPassword}
                        onChange={val => handleChangeValue('confirmPassword', val)}
                        placeholder='Confirm password'
                        isPassword
                        allowClear
                        affix={<Lock1 size={22} color={appColors.gray3} />}
                        type='default'
                        onEnd={() => formValidator('confirmPassword')}
                    />


                </SectionComponent>

                {errorMessage &&
                    (errorMessage.email || errorMessage.password || errorMessage.username || errorMessage.confirmPassword) &&
                    (<SectionComponent>
                        {Object.keys(errorMessage).map(
                            (error, index) =>
                                errorMessage[`${error}`] && (
                                    <TextComponent
                                        text={errorMessage[`${error}`]}
                                        key={`error${index}`}
                                        color={appColors.danger}
                                    />
                                ),
                        )}
                    </SectionComponent>
                    )}

                <SpaceComponent height={16} />

                <SectionComponent>
                    <RowComponent justify='center' >
                        <ButtonComponent
                            text='Sign Up'
                            onPress={handleRegister}
                            type='primary'
                            disable={isDisable}
                        />
                    </RowComponent>
                </SectionComponent>

                {/* <SocialLogin /> */}

                <SectionComponent>
                    <RowComponent justify='center'>
                        <TextComponent text='Don’t have an account? ' />
                        <ButtonComponent
                            text='Sign In'
                            onPress={() => navigation.navigate('LoginScreen')}
                            type='link'
                        />
                    </RowComponent>
                </SectionComponent>
            </ContainerComponent>

            <LoadingModal visible={loading} />
        </>

    )
}

export default SignUpScreen


const styles = StyleSheet.create({
    content: {
        padding: 20,
        width: '100%', // Ensures the content takes full width within the SafeAreaView
        backgroundColor: appColors.white,
    },
})