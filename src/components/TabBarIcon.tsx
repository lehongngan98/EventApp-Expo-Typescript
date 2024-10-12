import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleProp, ViewProps } from 'react-native';

interface Props {
    name: React.ComponentProps<typeof Ionicons>['name'];
    size: number;
    color: string;
    style?: StyleProp<ViewProps>;
}

const TabBarIcon = ({ name, size, color ,style}: Props) => {
    return <Ionicons name={name} size={size} color={color} style={style}/>;
};

export default TabBarIcon;