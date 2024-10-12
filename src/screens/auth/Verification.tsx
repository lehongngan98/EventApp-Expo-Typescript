import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowRight } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import authentication from '../../apis/authApi';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import { LoadingModal } from '../../modal';
import { addAuth } from '../../redux/reducers/authReducer';
import { globalStyles } from '../../styles/globalStyles';




const Verification = ({ navigation, route }: any) => {
    const { code, email, password, username } = route.params;

    const [currentCode, setCurrentCode] = useState<string>(String(code));
    const [newCode, setNewCode] = useState('');
    const [codeValues, setCodeValues] = useState<string[]>([]);
    const [isVisable, setIsVisable] = useState(false);
    const [limit, setLimit] = useState(60);


    const ref1 = useRef<any>();
    const ref2 = useRef<any>();
    const ref3 = useRef<any>();
    const ref4 = useRef<any>();

    const dispatch = useDispatch();


    useEffect(() => {
        ref1.current.focus();
    }, []);

    // nhận code mới khi user nhập
    useEffect(() => {
        setNewCode(codeValues.join(''));
    }, [codeValues]);

    // count down limit
    useEffect(() => {
        if (limit > 0) {
            const interval = setInterval(() => {
                setLimit(limit - 1);
            }, 1000);
            return () => clearInterval(interval);
        }

        return;
    }, [limit]);

    // end nhận code mới
    const handleChangeCode = (val: string, idnex: number) => {
        const newCode = [...codeValues];
        newCode[idnex] = val;
        setCodeValues(newCode);

    }

    const handleResendVarification = async () => {
        setCodeValues([]);
        setNewCode('');

        const api = '/verification';
        setIsVisable(true);
        try {
            const res = await authentication.HandleAuthentication(api, { email }, 'post');

            setLimit(60);
            setCurrentCode(String(res.data.code)); // Convert currentCode is a string
            console.log("currentcode: ", res.data.code);

            console.log(res);
            setIsVisable(false);
        } catch (error) {
            setIsVisable(false);
            console.log(`can not resent verification ${error}`);
            Alert.alert('Error', 'Error Resend Verification!');
        }
    };


    const handleVerification = async () => {
        console.log("currentCode: ", currentCode);
        console.log("newCode :", newCode);


        if (limit <= 0) {
            Alert.alert('Error', 'Please Resend Verification Code!');
            return;
        }
        if (newCode.trim() !== currentCode.trim()) {
            Alert.alert('Error', 'Verification Code is incorrect!');
            return;
        }

        // call api
        const api = '/register';
        const data = {fullname: username, email, password };
        setIsVisable(true);

        try {
            const res = await authentication.HandleAuthentication(api, data, 'post');
            console.log(res);
            setIsVisable(false);
            Alert.alert('Success', 'Registration Success!');

            // dispatch action
            dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify(res.data));

            
            
        } catch (error: any) {
            setIsVisable(false);
            console.log(`Email already exists!`);                        
            Alert.alert('Error', 'Email already exists!');
            
        }
    };


    return (
        <ContainerComponent back isScroll isImageBackground>
            <SectionComponent >
                <TextComponent text='Verification' size={22} font={fontFamilies.medium} />
                <SpaceComponent height={12} />
                <TextComponent
                    text={`We’ve send you the verification code on ${email.replace(
                        /.{1,7}/, (m: any) => '*'.repeat(m.length))}`
                    }
                    size={16}
                />
                <SpaceComponent height={26} />

                <RowComponent justify='space-around'>
                    <TextInput
                        ref={ref1}
                        keyboardType='number-pad'
                        value={codeValues[0]}
                        placeholder='-'
                        style={styles.input}
                        maxLength={1}
                        onChangeText={val => {
                            val.length > 0 && ref2.current.focus();
                            handleChangeCode(val, 0);
                        }}
                    />

                    <TextInput
                        keyboardType='number-pad'
                        ref={ref2}
                        value={codeValues[1]}
                        placeholder='-'
                        style={styles.input}
                        maxLength={1}
                        onChangeText={val => {
                            val.length > 0 && ref3.current.focus();
                            handleChangeCode(val, 1);
                        }}
                    />

                    <TextInput
                        keyboardType='number-pad'
                        ref={ref3}
                        value={codeValues[2]}
                        placeholder='-'
                        style={styles.input}
                        maxLength={1}
                        onChangeText={val => {
                            val.length > 0 && ref4.current.focus();
                            handleChangeCode(val, 2);
                        }}
                    />

                    <TextInput
                        keyboardType='number-pad'
                        ref={ref4}
                        value={codeValues[3]}
                        placeholder='-'
                        style={styles.input}
                        maxLength={1}
                        onChangeText={val => {
                            handleChangeCode(val, 3);
                        }}
                    />

                </RowComponent>
            </SectionComponent>

            <SectionComponent styles={{ alignItems: 'center' }}>
                <SpaceComponent height={40} />
                <ButtonComponent
                    disable={newCode.length !== 4} // nhập đủ 4 số mới enable
                    type='primary'
                    text='Continue'
                    onPress={handleVerification}
                    iconFlex='right'
                    icon={
                        <View
                            style={[
                                globalStyles.iconContainer,
                                { backgroundColor: newCode.length !== 4 ? appColors.gray3 : appColors.icon }
                            ]}
                        >
                            <ArrowRight size={18} color={appColors.white} />
                        </View>
                    }
                    textSize={18}
                />
            </SectionComponent>

            <SectionComponent>
                {
                    limit === 0 ? (
                        <RowComponent justify='center'>
                            <ButtonComponent

                                type='link'
                                text='Resend code'
                                onPress={handleResendVarification}
                                textColor='#5669FF'
                                textSize={18}
                                textFont={fontFamilies.medium}
                            />
                        </RowComponent>
                    ) : (
                        <RowComponent justify='center'>
                            <TextComponent text='Resend code in' size={16} />
                            <TextComponent text={` ${limit} seconds`} size={16} color={appColors.primary} font={fontFamilies.medium} />
                        </RowComponent>
                    )
                }

            </SectionComponent>
            <LoadingModal visible={isVisable} />
        </ContainerComponent>
    )
}

export default Verification

const styles = StyleSheet.create({
    input: {
        width: 55,
        height: 55,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: appColors.gray4,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: fontFamilies.semiBold,
    }
})