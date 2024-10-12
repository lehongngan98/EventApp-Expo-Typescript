import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import CardComponent from './CardComponent';
import { appInfo } from '../constants/appInfos';
import TextComponent from './TextComponent';
import { EventModel } from '../models/EventModel';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import { Location } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import SpaceComponent from './SpaceComponent';
import { fontFamilies } from '../constants/fontFamilies';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

interface Props {
    item?: EventModel;
    type?: 'card' | 'list';
};

const EventItem = (props: Props) => {
    const { item, type } = props;

    const navigation: any = useNavigation();

    console.log(item);

    return (
        <CardComponent
            onPress={() => navigation.navigate('EventDetail', { item })}
            styles={{ width: appInfo.size.width * 0.7 }}
            isShadow
        >
            <ImageBackground
                source={require('../assets/images/Event.png')}
                resizeMode='cover'
                style={{
                    height: 150,
                    width: '100%',
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            >
                <RowComponent justify='space-between'>
                    <CardComponent
                        bgColor='rgba(255,255,255,0.5)'
                        onPress={() => { }}
                        styles={[
                            globalStyles.noSpaceCard,
                            {
                                marginHorizontal: 10,
                                marginVertical: 10
                            }
                        ]}
                    >
                        <TextComponent text='10' color='tomato' font={fontFamilies.bold} size={16} />
                        <TextComponent text='JUNE' color='tomato' font={fontFamilies.bold} size={10} />
                    </CardComponent>

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
                                marginTop: -3,
                            }
                        ]}
                    >
                        <FontAwesome name='bookmark' size={20} color='tomato' />
                    </CardComponent>
                </RowComponent>
            </ImageBackground>
            <TextComponent text={item?.title || 'No Title Available'} title size={18} numberOfLine={1} styles={{ marginVertical: 6 }} />
            <AvatarGroup  />
            <RowComponent styles={{ marginTop: 6 }}>
                <Location size={18} color={appColors.text2} variant='Bold' />
                <SpaceComponent width={5} />
                <TextComponent
                    flex={1}
                    numberOfLine={1}
                    text={item?.location.address || 'No Location Available'}
                    color={appColors.text2}
                />
            </RowComponent>
        </CardComponent>

    )
}

export default EventItem

const styles = StyleSheet.create({

})