import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { ImageBackground, Keyboard, SafeAreaView, ScrollView, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
    title?: string;
    children: ReactNode;
    isImageBackground?: boolean;
    isScroll?: boolean;
    back?: boolean;
}

const ContainerComponent = (props: Props) => {

    const { title, children, isImageBackground, isScroll, back } = props;

    const navigation: any = useNavigation();


    const returnComponent = isScroll ? (
        <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    );

    const headerComponent = () => {
        return (
            <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    {
                        (title || back) && (
                            <RowComponent
                                styles={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    minHeight: 48, // quy dinh cua google
                                    minWidth: 48, // quy dinh cua google
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={{ flexDirection: 'row', justifyContent: 'center', gap: 5, alignItems: 'center' }}
                                >
                                    <ArrowLeft size={24} color={appColors.text} />
                                    {title && <TextComponent text={title} font={fontFamilies.semiBold} size={16} />}
                                </TouchableOpacity>
                            </RowComponent>
                        )
                    }

                    {returnComponent}
                </View>
            </TouchableNativeFeedback>
        )
    }

    return (
        isImageBackground ? (
            // container co background
            <ImageBackground
                source={require('../assets/images/splash-image.png')}
                style={{ flex: 1 }}
                imageStyle={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    {headerComponent()}
                </SafeAreaView>
            </ImageBackground>
        ) : (   // container ko co background
            <SafeAreaView style={[globalStyles.container]}>
                {headerComponent()}
            </SafeAreaView>
        )
    );
};

export default ContainerComponent
