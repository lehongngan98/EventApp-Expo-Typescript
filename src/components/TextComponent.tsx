import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    text: string;
    size?: number;
    color?: string;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>;
    title?: boolean;
    numberOfLine?: number;
}

const TextComponent = (prop: Props) => {

    const { text, size, color, flex, font, styles, title, numberOfLine } = prop;

    return (
        <Text
            numberOfLines={numberOfLine}
            style={[

                globalStyles.text,
                {
                    fontSize: title ? 24 : size ?? 14,
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                    fontFamily: title ? fontFamilies.bold : font ?? fontFamilies.regular,

                },
                styles,
            ]


            }
        >
            {text}
        </Text>
    )
}

export default TextComponent

const styles = StyleSheet.create({})