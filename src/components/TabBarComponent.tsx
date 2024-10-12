import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { appColors } from '../constants/appColors';
import { ArrowRight2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    title: string;
    onPress: () => void;
};

const TabBarComponent = (props: Props) => {
    const { title, onPress } = props;

    return (
        <RowComponent styles={{paddingHorizontal:16}}>
            <TextComponent text={title} title flex={1} size={18}/>
            <RowComponent onPress={onPress}>
                <TextComponent text='See all' color={appColors.gray2}/>
                <ArrowRight2 size={12} color={appColors.gray2}/>
            </RowComponent>
        </RowComponent>
    )
}

export default TabBarComponent