import { View, Text } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { ArrowDown2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    label?: string;
    value: SelectionMode[];
    selected?: string | string[];
    onSelect: (value: string) => void;
}
const DropDownPicker = (props: Props) => {
    const { label, value, selected, onSelect } = props;

    return (
        <View style={{}}>
            {
                label && <TextComponent text={label} styles={{marginBottom:8}} color='gray'/>
            }
            <RowComponent styles={[globalStyles.inputContainer]}>
                <RowComponent styles={{flex:1}} justify='center'>
                    <TextComponent text='Select' color='gray'/>                    
                </RowComponent>
                <ArrowDown2 size={20} color='gray'/>
            </RowComponent>
        </View>
    )
}

export default DropDownPicker