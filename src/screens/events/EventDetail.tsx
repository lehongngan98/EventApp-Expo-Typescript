import { View, Text, SafeAreaView, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { CardComponent, ContainerComponent, RowComponent, SpaceComponent, TextComponent } from '../../components'
import { appInfo } from '../../constants/appInfos'
import { Arrow, ArrowLeft } from 'iconsax-react-native'
import { globalStyles } from '../../styles/globalStyles'
import { fontFamilies } from '../../constants/fontFamilies'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'

const EventDetail = ({ route }: any) => {
    const navigation = useNavigation();

    return (
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/images/image_event.png')}
                style={{
                    flex: 1,
                    height: 244,
                }}
                imageStyle={{
                    resizeMode: 'cover',
                    height: 244,
                    width: appInfo.size.width
                }}
            >
                <RowComponent
                    justify='space-between'
                    styles={{
                        marginTop: 50,
                        paddingHorizontal: 16,

                    }}>
                    <RowComponent>
                        <ArrowLeft size={30} color='white' onPress={() => navigation.goBack()} />
                        <SpaceComponent width={10} />
                        <TextComponent text='Event Detail' title color='white' font='FontAwesome6_Solid'/>
                    </RowComponent>

                    <CardComponent
                        bgColor='rgba(255,255,255,0.5)'
                        onPress={() => { }}
                        styles={[
                            globalStyles.noSpaceCard,
                            {
                                marginHorizontal: 10,
                                marginVertical: 10,
                                width: 35,
                                height: 35,


                            }
                        ]}
                    >
                        <FontAwesome name='bookmark' size={20} color='white' />
                    </CardComponent>
                </RowComponent>
            </ImageBackground>
        </ScrollView>
    )
}

export default EventDetail
