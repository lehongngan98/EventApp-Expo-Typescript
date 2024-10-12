import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props{
    styles?: StyleProp<ViewStyle>;
    children?: ReactNode ;
}

const SectionComponent = (props: Props) => {
    const {styles , children } = props;
    return (
        <View style={[globalStyles.section,{},styles]}>
            {children}
        </View>
    )
}

export default SectionComponent