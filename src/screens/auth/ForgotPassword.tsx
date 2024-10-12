import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { fontFamilies } from '../../constants/fontFamilies'
import { ArrowRight, Sms } from 'iconsax-react-native'
import { appColors } from '../../constants/appColors'
import { Validate } from '../../utils/validate'
import { LoadingModal } from '../../modal'
import authentication from '../../apis/authApi'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoadding, setIsLoadding] = useState(false);

    const handleCheckEmail = () =>{
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    }

    const handleForgotPassword = async () => {
        const api ='/forgotPassword';
        setIsLoadding(true);
        try {
            const res = await authentication.HandleAuthentication(api,{email},'post');

            console.log(res);
            setIsLoadding(false);
            Alert.alert("Success","Password reset email sent successfully.");
        } catch (error) {           
            console.log(`Can not Forgot Password ${error}`);
            Alert.alert("Error", "Failed to send password reset email. Please try again.");
        }finally{
            setIsLoadding(false);
        }
    };

    return (
        <ContainerComponent back isScroll isImageBackground>
            <SectionComponent >
                <TextComponent text='Reset Password' size={22} font={fontFamilies.medium} />
                <SpaceComponent height={6} />
                <TextComponent text='Please enter your email address to request a password reset' size={16} />

                <SpaceComponent height={26} />

                <InputComponent
                    placeholder='abc@gmail.com'
                    value={email}
                    onChange={val => setEmail(val)}
                    affix={<Sms size={20} color={appColors.gray3} />}
                    onEnd={handleCheckEmail}
                    allowClear
                />
            </SectionComponent>

            <SectionComponent>
                <ButtonComponent
                    disable={isDisable}
                    text='Send'
                    type='primary'
                    icon={<ArrowRight size={20} color={appColors.white} />}
                    iconFlex='right'
                    textSize={20}
                    onPress={handleForgotPassword}
                />
            </SectionComponent>
            <LoadingModal visible={isLoadding}/>
        </ContainerComponent>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({})