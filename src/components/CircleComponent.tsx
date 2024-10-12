import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { appColors } from '../constants/appColors';


interface Props {
    size?: number;
    color?: string;
    children: ReactNode;
    onPress?: () => void;
    styles?: StyleProp<ViewStyle>;
}


const CircleComponent = (props: Props) => {
    const { size, color, children, onPress, styles } = props;

    const localStyles: any = {
        width: size ?? 40,
        height: size ?? 40,
        borderRadius: 100,
        backgroundColor: color ?? appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',

    };

    return onPress ? (
        <TouchableOpacity
            onPress={onPress}
            style={[localStyles, styles]}
        >
            {children}
        </TouchableOpacity>
    ) : (
        <View style={[localStyles, styles]}>
            {children}
        </View>
    )
}

export default CircleComponent