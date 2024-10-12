import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';

interface Props {
    justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
    styles?: StyleProp<ViewStyle>;
    children: ReactNode;
    onPress?: () => void;
}


const RowComponent = (props: Props) => {
    const { justify, styles, children, onPress } = props;

    const localStyles =
        [globalStyles.row, {
            justifyContent: justify,
        }, styles]


    return onPress ? (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}
        >
            <View style={localStyles}>
                {children}
            </View>
        </TouchableOpacity>
    ) : (
        <View style={localStyles}>
            {children}
        </View>
    )
}

export default RowComponent