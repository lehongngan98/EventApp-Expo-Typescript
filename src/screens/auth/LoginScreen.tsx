import { Lock1, Sms } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Switch, View } from 'react-native'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
// import SocialLogin from './components/SocialLogin'
import authentication from '../../apis/authApi'
import { Validate } from '../../utils/validate'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'




const LoginScreen = ({ navigation }: any) => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [isRemember, setIsRemember] = useState(true);

    const [isDisable, setIsDisable] = useState(true);



    const dispatch = useDispatch();



    useEffect(() => {
        const emailValidate = Validate.email(email);
        if (!email || !password || !emailValidate) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [email, password]);



    const handleLogin = async () => {

        const emailValidate = Validate.email(email);

        if (!emailValidate) {
            Alert.alert('Error', 'Invalid email address!')
            return;
        }

        try {
            const res = await authentication.HandleAuthentication('/login', { email, password }, 'post');

            dispatch(addAuth(res.data));

            await AsyncStorage.setItem(
                'auth',
                isRemember ? JSON.stringify(res.data) : email,
            );



        } catch (error) {
            console.log(error);

        }
    }



    return (
        <ContainerComponent isImageBackground isScroll>

            <SectionComponent
                styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 45,
                    marginBottom: 10,
                }}
            >
                <Image
                    source={require('../../assets/images/text-logo.png')}
                    style={{ width: 162, height: 114, resizeMode: 'contain' }}

                />
            </SectionComponent>


            <SectionComponent
                styles={{}}
            >
                <TextComponent text='Sign In' size={24} font={fontFamilies.medium} />

                <SpaceComponent height={21} />

                <InputComponent
                    value={email}
                    onChange={val => setEmail(val)}
                    placeholder='Email'
                    allowClear
                    affix={<Sms size={22} color={appColors.gray3} />}
                    type='default'
                    
                />

                <InputComponent
                    value={password}
                    onChange={val => setPassword(val)}
                    placeholder='Password'
                    isPassword
                    affix={<Lock1 size={22} color={appColors.gray3} />}
                    type='default'
                />

                <RowComponent justify='space-between'>
                    <RowComponent
                        onPress={() => setIsRemember(!isRemember)}
                    >
                        <Switch
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)}
                            trackColor={{ true: appColors.primary }}
                            thumbColor={appColors.white}
                        />
                        <SpaceComponent width={4} />
                        <TextComponent text='Remember me' />
                    </RowComponent>
                    <ButtonComponent
                        text='Forgot Password?'
                        onPress={() => navigation.navigate('ForgotPassword')}
                        type='text'

                    />
                </RowComponent>
            </SectionComponent>

            <SpaceComponent height={16} />

            <SectionComponent>
                <RowComponent justify='center' >
                    <ButtonComponent
                        disable={isDisable}
                        text='Sign In'
                        type='primary'
                        onPress={handleLogin}
                    />
                </RowComponent>
            </SectionComponent>

            

            {/* <SocialLogin /> */}

            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text='Don’t have an account? ' />
                    <ButtonComponent
                        text='Sign Up'
                        onPress={() => navigation.navigate('SignUpScreen')}
                        type='link'
                    />
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    content: {
        padding: 20,
        width: '100%', // Ensures the content takes full width within the SafeAreaView
    },
})