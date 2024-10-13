import { KeyboardType, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { ReactNode, useRef, useState } from 'react';
import { EyeSlash, Eye } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    value: string;
    onChange: (val: string) => void;
    affix?: ReactNode;
    placeholder?: string;
    suffix?: ReactNode;
    isPassword?: boolean;
    allowClear?: boolean;
    type?: KeyboardType;
    onEnd?: () => void;
}

const InputComponent = (props: Props) => {
    const { value, onChange, affix, placeholder, suffix, isPassword, allowClear ,type ,onEnd} = props;

    const [isShowPass, setIsShowPass] = useState(false);

    const inputRef = useRef<TextInput>(null); // Create a ref for the TextInput

    const handleClear = () => {
        onChange('');
        inputRef.current?.focus(); // Manually focus the TextInput after clearing
    };

    return (
        <View style={[styles.container,{}]}>
            {affix ?? null}
            <TextInput
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isPassword && !isShowPass}
                value={value}
                style={[globalStyles.text,styles.input,{paddingLeft: affix || suffix ? 14 : 0}]}
                placeholderTextColor={appColors.gray2}
                keyboardType={type ?? 'default'}
                autoCapitalize='none'
                onEndEditing={onEnd}
                ref={inputRef} // Attach the ref to the TextInput
            />

            {isPassword && (
                <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                    {isShowPass ? (
                        <Eye size={22} color={appColors.gray3} />
                    ) : (
                        <EyeSlash size={22} color={appColors.gray3} />
                    )}
                </TouchableOpacity>
            )}

            {allowClear && value.length > 0 && !isPassword && (
                <TouchableOpacity onPress={handleClear}>
                    <AntDesign name='close' size={22} color={appColors.gray3} />
                </TouchableOpacity>
            )}

            {suffix ?? null}
        </View>
    );
}

export default InputComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: appColors.gray1,
        borderRadius: 12,
        minHeight:54,
        
        width:'100%',
        padding:15,
        backgroundColor:appColors.white,
        marginBottom:19,
    },
    input: {
        flex: 1,    
        margin:0,
        padding:0,
        color:appColors.text,    
    },
});
