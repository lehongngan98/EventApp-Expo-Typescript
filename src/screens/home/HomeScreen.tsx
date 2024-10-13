import { HambergerMenu, Notification, SearchNormal, Sort } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ButtonComponent, CardComponent, CategoriesListComponent, CircleComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { fontFamilies } from '../../constants/fontFamilies'
import { globalStyles } from '../../styles/globalStyles'
import * as Location from 'expo-location';
import { RevertAddress } from '../../models/RevertAddress';



const HomeScreen = ({ navigation }: any) => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);    

    useEffect(() => {
        getLocation();                                
    }, []);



    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        // console.log('location:', location);
        revertLocation(location.coords.latitude, location.coords.longitude);
    };

    const revertLocation = async (lat: number, long: number) => {
        const revertGeocodeAddress = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
        console.log('revertGeocodeAddress:', revertGeocodeAddress);
        setAddress(revertGeocodeAddress);                        
    };

    const eventItems = {
        title: 'International Band Music Concert',
        description: 'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
        location: {
            title: 'Gala Convention Center',
            address: '36 Guild Street London, UK ',
        },
        imgUrl: '',
        users: [''],
        authorId: '',
        startAt: Date.now(),
        endAt: Date.now(),
        date: Date.now(),
    }

    return (
        <View style={[globalStyles.container]}>

            <StatusBar barStyle={'light-content'} backgroundColor={appColors.primary} />

            <View style={{
                height: 169,
                backgroundColor: appColors.primary,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                paddingTop: Platform.OS === 'ios' ? 45 : StatusBar.currentHeight,
                paddingHorizontal: 16,
            }}>
                <RowComponent >
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <HambergerMenu color={appColors.white} size={24} />
                    </TouchableOpacity>

                    <View style={[{ flex: 1, alignItems: 'center' }]}>
                        <RowComponent>
                            <TextComponent text='Current Location' color={appColors.white2} size={12} />
                            <MaterialIcons name='arrow-drop-down' size={18} color={appColors.white} />
                        </RowComponent>
                        <TextComponent text={`${address[0].district}, ${address[0].country}`} styles={{ color: appColors.white, fontSize: 13 }} font={fontFamilies.medium} />
                    </View>

                    <CircleComponent styles={{ backgroundColor: '#524CE0' }} size={36}>
                        <View>
                            <Notification size={18} color={appColors.white} />
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: 8,
                                    height: 8,
                                    borderRadius: 2,
                                    backgroundColor: '#02E9FE',
                                    borderColor: '#524CE0',
                                }}
                            >

                            </View>
                        </View>
                    </CircleComponent>
                </RowComponent>

                <SpaceComponent height={20} />

                <RowComponent
                    justify='space-between'
                    onPress={() => navigation.navigate('SearchEvents', {
                        isFilter: false
                    })}
                >
                    <RowComponent>
                        <SearchNormal
                            color={appColors.white}
                            size={18}
                            variant='TwoTone' // TwoTone, Filled, Outlined
                        />
                        <View
                            style={{
                                backgroundColor: appColors.gray1,
                                height: 18,
                                width: 1,
                                marginHorizontal: 10,

                            }}
                        />
                        <TextComponent text='Search...' color={appColors.gray1} size={18} />
                    </RowComponent>

                    <TagComponent
                        onPress={() => navigation.navigate('SearchEvents', {
                            isFilter: true
                        })}
                        text='Filters'
                        textColor={appColors.white}
                        icon={
                            <CircleComponent size={18} styles={{ backgroundColor: '#B1AEFA' }}>
                                <Sort size={18} color='#524CE0' />
                            </CircleComponent>
                        }
                        bgColor='#524CE0'

                    />
                </RowComponent>

                <SpaceComponent height={20} />


            </View>

            <View style={{ flex: 1 }}>
                <View style={{ marginTop: -20 }}>
                    <CategoriesListComponent isFilter />
                </View>

                <ScrollView showsHorizontalScrollIndicator={false}>
                    <SectionComponent styles={{ paddingHorizontal: 0, paddingVertical: 20 }}>
                        <TabBarComponent title='Popular Events' onPress={() => { }} />
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={Array.from({ length: 5 })}
                            renderItem={({ item, index }) =>
                                <EventItem item={eventItems} key={`event${index}`} type='card' />
                            }
                        />
                        <SpaceComponent height={10} />



                        <CardComponent>
                            <ImageBackground
                                source={require('../../assets/images/invite-image.png')}
                                style={styles.imagebackground}
                            >
                                <SectionComponent styles={{
                                    paddingTop: 10,

                                }}>
                                    <TextComponent text='Invite your friends' title
                                        styles={{
                                            fontSize: 20,

                                        }}
                                    />
                                    <TextComponent
                                        text='Get $20 for ticket'
                                        styles={{
                                            fontSize: 14,

                                        }}
                                    />
                                    <ButtonComponent
                                        text='Invite Now'
                                        onPress={() => { }}
                                        styles={{
                                            backgroundColor: '#00F8FF',
                                            width: 120,
                                            height: 25,
                                            borderRadius: 10,
                                            marginTop: 10,
                                            marginLeft: 0,
                                        }}
                                        type='primary'
                                        textSize={16}
                                    />
                                </SectionComponent>
                            </ImageBackground>
                        </CardComponent>





                        <SpaceComponent height={10} />

                        <TabBarComponent title='Near Buy' onPress={() => { }} />
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={Array.from({ length: 5 })}
                            renderItem={({ item, index }) =>
                                <EventItem item={eventItems} key={`event${index}`} type='card' />
                            }
                        />
                    </SectionComponent>




                </ScrollView>
            </View>




        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    imagebackground: {
        height: 150,
        width: '100%',
        borderRadius: 12,
        resizeMode: 'cover',
        backgroundColor: '#dff',

    }
})