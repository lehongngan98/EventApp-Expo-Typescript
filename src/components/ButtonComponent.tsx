import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyle?: StyleProp<TextStyle>;
    textFont?: string;
    textSize?: number;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?: boolean;
}
const ButtonComponent = (props: Props) => {
    const { icon, text, type, color, styles, textColor, textStyle, onPress, iconFlex, textFont, textSize, disable } = props;


    return (
        type === 'primary' ? ( // primary button
            <TouchableOpacity disabled={disable}
                style={[
                    globalStyles.button,
                    globalStyles.shadow,
                    {
                        backgroundColor: color ? color : disable ? appColors.gray4 : appColors.primary,
                        width: '80%',
                        marginBottom: 20,
                    },
                    styles
                ]}
                onPress={onPress}
            >
                {icon && iconFlex === 'left' && icon}
                <TextComponent
                    text={text}
                    color={textColor ?? appColors.white}
                    size={textSize}
                    styles={[
                        textStyle,
                        {
                            marginLeft: icon ? 12 : 0,
                            fontSize: textSize,
                            textAlign: 'center',
                        }
                    ]}
                    font={textFont ?? fontFamilies.bold}
                    flex={icon && iconFlex === 'right' ? 1 : 0}



                />
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
        ) : (   // text button
            <TouchableOpacity
                onPress={onPress}
            >
                <TextComponent
                    text={text}
                    color={type === 'link' ? appColors.primary : appColors.text}
                    size={textSize}
                    font={textFont}
                />
            </TouchableOpacity>
        )
    )
}

export default ButtonComponent

const styles = StyleSheet.create({})