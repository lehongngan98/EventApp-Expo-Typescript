import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { ArrowDown2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

interface Props {
    label?: string;
    value: SelectionMode[];
    selected?: string | string[];
    onSelect: (value: string) => void;
}
const DropDownPicker = (props: Props) => {
    const { label, value, selected, onSelect } = props;

    const [isVisible, setIsVisible] = useState(false);

    const modalizeRef = useRef<Modalize>()

    useEffect(() => {
        if (isVisible) {
            modalizeRef.current?.open();
        } else {
            modalizeRef.current?.close();
        }

    }, [isVisible])

    return (
        <View style={{}}>
            {
                label && <TextComponent text={label} styles={{ marginBottom: 8 }} color='gray' />
            }
            <RowComponent
                styles={[globalStyles.inputContainer]}
                onPress={() => setIsVisible(true)}
            >
                <RowComponent styles={{ flex: 1 }} justify='center'>
                    <TextComponent text='Select' color='gray' />
                </RowComponent>
                <ArrowDown2 size={20} color='gray' />
            </RowComponent>

            <Portal>
                <Modalize ref={modalizeRef} onClose={() => setIsVisible(false)}>
                    <View>
                        <Text>Content</Text>
                    </View>
                </Modalize>
            </Portal>
        </View>
    )
}

export default DropDownPicker