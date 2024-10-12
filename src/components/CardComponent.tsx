import { View, Text, StyleProp, ViewStyle, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles';

interface Props {
    onPress?: () => void;
    children: React.ReactNode;
    styles?: StyleProp<ViewStyle>;
    isShadow?: boolean;
    bgColor?: string;
};

const CardComponent = (props: Props) => {
    const { onPress, children, styles ,isShadow ,bgColor} = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                globalStyles.card,
                isShadow ? globalStyles.shadow : undefined,
                {
                    backgroundColor: bgColor ?? 'white',
                },
                styles
            ]}
        >
            {children}
        </TouchableOpacity>
    )
}

export default CardComponent