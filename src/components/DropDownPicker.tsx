import { ArrowDown2, SearchNormal } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Touchable, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { SelectModel } from '../models/SelectModel';
import { globalStyles } from '../styles/globalStyles';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';
import { appColors } from '../constants/appColors';
import Ionicons from '@expo/vector-icons/Ionicons';
import SectionComponent from './SectionComponent';

interface Props {
    label?: string;
    value: SelectModel[];
    selected?: string | string[];
    onSelect: (value: string | string[]) => void;
    multible?: boolean;
}
const DropDownPicker = (props: Props) => {
    const { label, value, selected, onSelect, multible } = props;
    const [searchKey, setSearchKey] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [selectItems, setSelectItems] = useState<string[]>([]);

    const modalizeRef = useRef<Modalize>()



    useEffect(() => {
        if (isVisible) {
            modalizeRef.current?.open();
        } else {
            modalizeRef.current?.close();
        }

    }, [isVisible])

    const handleSelectItems = (id: string) => {
        if (selectItems.includes(id)) { // remove item from selected
            const items = selectItems.filter(item => item !== id);
            setSelectItems(items);
        } else {
            setSelectItems([...selectItems, id]);
        }
    };

    const renderSelectItem = (item: SelectModel) => {
        if (item.label.toLowerCase().includes(searchKey.toLowerCase())) {
            return (
                <RowComponent
                    key={item.value}
                    styles={[{ marginBottom: 8 }]}
                    onPress={
                        multible
                            ? () => handleSelectItems(item.value)
                            : () => onSelect(item.value)}
                >
                    <RowComponent
                        styles={{
                            flex: 1,
                            backgroundColor: selectItems.includes(item.value) ? `${appColors.primary}2D` : 'white',
                            padding: 10,
                            borderRadius: 12,

                        }}
                        justify='center'
                    >
                        <TextComponent
                            text={item.label}
                            color={selectItems.includes(item.value) ? appColors.primary : 'black'}
                            font={selectItems.includes(item.value) ? fontFamilies.bold : fontFamilies.regular}
                            size={18}
                            flex={1}
                        />
                        {
                            selectItems.includes(item.value) && <Ionicons name="checkmark-done-sharp" size={24} color={appColors.primary} />
                        }
                    </RowComponent>
                </RowComponent>
            )
        }
    }

    const renderSelectedItem = (id: string) => {
        const item = value.find(element => element.value === id);

        return (
            <RowComponent
                key={id}
                styles={{
                    padding: 10,
                    backgroundColor: `${appColors.primary}2D`,
                    marginBottom: 8,
                    borderRadius: 12,
                    width: '80%',
                    justifyContent: 'space-between'
                }}
            >
                <TextComponent text={item.label} />
                <SpaceComponent width={8} />
                <TouchableOpacity onPress={() => handleSelectItems(id)}>
                    <Ionicons name="close" size={24} color='red' />
                </TouchableOpacity>
            </RowComponent>
        )
    }

    return (
        <View style={{}}>
            {
                label && <TextComponent text={label} styles={{ marginBottom: 8 }} color='gray' />
            }
            <RowComponent
                styles={[globalStyles.inputContainer]}
                onPress={() => setIsVisible(true)}
            >
                <RowComponent styles={{ flex: 1, flexWrap: 'wrap' }} justify='center'>
                    {
                        selectItems.length > 0 ? (
                            selectItems.map(item =>
                                renderSelectedItem(item)
                            )
                        ) : (
                            <TextComponent text='Select' color='gray' size={18} />
                        )
                    }
                </RowComponent>
                {
                    selectItems.length == 0 && <ArrowDown2 size={20} color='gray' />
                }
            </RowComponent>

            <Portal>
                <Modalize
                    ref={modalizeRef}
                    onClose={() => setIsVisible(false)}
                    handlePosition='inside'
                    scrollViewProps={{
                        showsVerticalScrollIndicator: false
                    }}
                    HeaderComponent={
                        <RowComponent styles={{ marginVertical: 14, paddingHorizontal: 10 }}>
                            <View style={{ flex: 1 }}>
                                <InputComponent
                                    value={searchKey}
                                    onChange={(val) => setSearchKey(val)}
                                    placeholder='Search...'
                                    allowClear
                                    affix={
                                        <SearchNormal size={20} color='gray' />
                                    }
                                />
                            </View>
                            <SpaceComponent width={8} />
                            <ButtonComponent
                                type='text'
                                text='Cancel'
                                onPress={() => setIsVisible(false)}
                            />
                        </RowComponent>
                    }
                    FooterComponent={
                        <View style={{
                            paddingBottom: 20,
                            alignItems: 'center',
                        }}>
                            <ButtonComponent
                                text='Agree'
                                onPress={() => {
                                    onSelect(selectItems);
                                    setIsVisible(false);
                                }}
                                type='primary'
                            />
                        </View>
                    }
                >
                    <View
                        style={{
                            paddingVertical: 20,
                            paddingHorizontal: 16
                        }}
                    >
                        {
                            value && value.map(value => renderSelectItem(value))
                        }
                    </View>
                </Modalize>
            </Portal>
        </View>
    )
}

export default DropDownPicker

const styles = StyleSheet.create({

})