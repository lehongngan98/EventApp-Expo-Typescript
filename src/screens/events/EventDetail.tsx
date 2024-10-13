import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight, Calendar, Location } from 'iconsax-react-native';
import React from 'react';
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AvatarGroup, ButtonComponent, CardComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import { EventModel } from '../../models/EventModel';
import { globalStyles } from '../../styles/globalStyles';


const EventDetail = ({ route }: any) => {
    const navigation = useNavigation();
    const { item }: { item: EventModel } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* ImageBackground Section */}
            <ImageBackground
                source={require('../../assets/images/image_event.png')}
                style={{
                    height: 244,
                    position: 'relative', // Important to position children correctly                
                }}
                imageStyle={{
                    resizeMode: 'cover',
                }}
            >
                <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
                    <RowComponent
                        styles={{
                            padding: 16,
                            alignItems: 'flex-end',
                            paddingTop: 42,

                        }}
                    >
                        <RowComponent styles={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <ArrowLeft color='white' size={24} />
                            </TouchableOpacity>
                            <SpaceComponent width={5} />
                            <TextComponent text='Event Detail' title color='white' font='FontAwesome6_Solid' />
                        </RowComponent>

                        <CardComponent
                            bgColor='rgba(255,255,255,0.5)'
                            onPress={() => { }}
                            styles={[
                                globalStyles.noSpaceCard,
                                {
                                    width: 35,
                                    height: 35,
                                },
                            ]}
                        >
                            <FontAwesome name='bookmark' size={20} color='white' />
                        </CardComponent>
                    </RowComponent>
                </LinearGradient>
            </ImageBackground>

            {/* ScrollView Section */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    paddingTop: 20,
                    marginTop: -30,

                }}
                contentContainerStyle={{
                    paddingBottom: 20, // Ensure there's enough space at the bottom
                }}
            >
                <View style={{ marginTop: -4 }}>
                    <SectionComponent>
                        <View
                            style={[
                                globalStyles.shadow,
                                {
                                    backgroundColor: 'white',
                                    borderRadius: 100,
                                    paddingHorizontal: 20,
                                    paddingVertical: 6,
                                    marginHorizontal: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    marginBottom: 20,
                                }]}

                        >
                            <AvatarGroup size={36} />
                            <TouchableOpacity style={{
                                backgroundColor: appColors.primary,
                                borderRadius: 10,
                                paddingHorizontal: 20,
                                paddingVertical: 6,
                                marginHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}>
                                <TextComponent text='Invite' color={appColors.white} size={18} font={fontFamilies.bold} />
                            </TouchableOpacity>
                        </View>

                        <TextComponent text={item.title} size={34} font={fontFamilies.medium} />
                    </SectionComponent>

                    {/* Date & Time */}
                    <SectionComponent
                        styles={{
                            marginBottom: 10,
                        }}
                    >
                        <RowComponent>
                            <CardComponent
                                bgColor={`${appColors.primary}2D`}
                                onPress={() => { }}
                                styles={[
                                    globalStyles.noSpaceCard,
                                    {
                                        width: 48,
                                        height: 48,
                                    },
                                ]}
                            >
                                <Calendar variant='Bold' size={30} color={appColors.primary} />
                            </CardComponent>
                            <View style={{ marginLeft: 14, justifyContent: 'space-around' }}>
                                <TextComponent text='14 December, 2021' size={18} color='black' />
                                <TextComponent text={'Tuesday, 4:00PM - 9:00PM'} size={14} color='gray' />
                            </View>
                        </RowComponent>
                    </SectionComponent>

                    {/* Location */}
                    <SectionComponent>
                        <RowComponent>
                            <CardComponent
                                bgColor={`${appColors.primary}2D`}
                                onPress={() => { }}
                                styles={[
                                    globalStyles.noSpaceCard,
                                    {
                                        width: 48,
                                        height: 48,
                                    },
                                ]}
                            >
                                <Location variant='Bold' size={30} color={appColors.primary} />
                            </CardComponent>
                            <View style={{ marginLeft: 14, justifyContent: 'space-around' }}>
                                <TextComponent text={item.location.title} size={18} color='black' />
                                <TextComponent text={item.location.address} size={14} color='gray' />
                            </View>
                        </RowComponent>
                    </SectionComponent>

                    {/* Follow author */}
                    <SectionComponent styles={{ marginTop: 12, marginBottom: 12 }}>
                        <RowComponent justify='space-between'>
                            <RowComponent>
                                <Image
                                    source={{ uri: 'https://th.bing.com/th/id/OIP.JADOFqAzLIoWgD-k6qAZGwAAAA?rs=1&pid=ImgDetMain' }}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 12,
                                        resizeMode: 'cover',
                                    }}
                                />
                                <View style={{ marginLeft: 12, justifyContent: 'space-around' }}>
                                    <TextComponent text='John Doe' size={16} color='black' />
                                    <TextComponent text='Organizer' size={14} color='gray' />
                                </View>
                            </RowComponent>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: `${appColors.primary}3D`,
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                    paddingVertical: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row'
                                }}
                            >
                                <TextComponent text='Follow' font={fontFamilies.regular} size={16} color={appColors.primary} />
                            </TouchableOpacity>
                        </RowComponent>
                    </SectionComponent>


                    {/* About event */}
                    <TabBarComponent title='About Event' />
                    <SectionComponent styles={{ marginTop: 10 }}>
                        <TextComponent text={item.description} size={16} />
                    </SectionComponent>

                </View>
            </ScrollView>

            {/* button buy tickket */}
            <LinearGradient
                colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)']}
                start={{ x: 0, y: 0.25 }}
                end={{ x: 0, y: 1 }}
                style={{
                    bottom: 0,
                    right: 0,
                    left: 0,
                    position: 'absolute',
                    padding: 12
                }}
            >
                <ButtonComponent
                    text='Buy Ticket $120'
                    onPress={() => { }}
                    styles={{
                        backgroundColor: appColors.primary,
                        paddingVertical: 16,
                        borderRadius: 10,
                    }}
                    textFont={fontFamilies.bold}
                    textSize={18}
                    type='primary'
                    iconFlex='right'
                    icon={
                        <View
                            style={[
                                globalStyles.iconContainer,
                                {
                                    backgroundColor: '#3D56F0'
                                }
                            ]}
                        >
                            <ArrowRight color='white' size={18} />
                        </View>
                    }
                />
            </LinearGradient>
        </View>
    );
}

export default EventDetail;