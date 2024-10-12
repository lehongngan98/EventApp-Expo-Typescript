import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark2, Calendar, Logout, Message2, MessageQuestion, Setting2, Sms, User } from 'iconsax-react-native';
import React from 'react';
import { FlatList, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { authSelector, removeAuth } from '../redux/reducers/authReducer';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager } from 'react-native-fbsdk-next';

const DrawerCustom = ({ navigation }: any) => {
    const user = useSelector(authSelector);

    const dispatch = useDispatch()

    const auth = useSelector(authSelector);

    const size = 20;
    const color = appColors.gray2;

    const profileMenu = [
        {
            key: 'MyProfile',
            title: 'My Profile',
            icon: <User size={size} color={color} />
        },
        {
            key: 'Message',
            title: 'Message',
            icon: <Message2 size={size} color={color} />
        }, {
            key: 'Calendar',
            title: 'Calendar',
            icon: <Calendar size={size} color={color} />
        }, {
            key: 'Bookmark',
            title: 'Bookmark',
            icon: <Bookmark2 size={size} color={color} />
        }, {
            key: 'ContactUs',
            title: 'Contact Us',
            icon: <Sms size={size} color={color} />
        }, {
            key: 'Settings',
            title: 'Settings',
            icon: <Setting2 size={size} color={color} />
        }, {
            key: 'HelpAndFAQs',
            title: 'Help And FAQs',
            icon: <MessageQuestion size={size} color={color} />
        }, {
            key: 'SignOut',
            title: 'Sign Out',
            icon: <Logout size={size} color={color} />
        }
    ]

    const handleSignOut = async () => {
        await AsyncStorage.removeItem('auth'); // Sửa lại ở đây
        // await GoogleSignin.signOut();
        // LoginManager.logOut(); // logout facebook
        dispatch(removeAuth());
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('Profile')
                }}
            >
                {user.photo 
                ? <Image source={{ uri: user.photo }} style={styles.avatar} /> 
                : <Image source={require('../assets/images/user-profile.png')} style={styles.avatar} />}
                <TextComponent text={user.name ?? user.fullname} title />
            </TouchableOpacity>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={profileMenu}
                style={{
                    flex: 1,
                    marginHorizontal: 20,
                    marginTop: 20
                }}
                renderItem={({ item, index }) => (
                    <RowComponent
                        styles={styles.listItemRow}
                        onPress={item.key === 'SignOut'
                            ? () => handleSignOut()
                            : () => console.log(item.key)

                        }
                    >
                        {item.icon}
                        <TextComponent text={item.title} styles={styles.listItemText} />
                    </RowComponent>
                )}
            />

            <RowComponent justify='flex-start' 
                styles={{
                    position: 'absolute',
                    bottom: 30,
                    left: 20,
                    width: '100%'
                }}
            >
                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        {
                            backgroundColor: '#00F8FF33',
                            height: 'auto',
                        }
                    ]}
                >
                    <MaterialCommunityIcons name='crown' size={22} color={'#00F8FF'} />
                    <SpaceComponent width={8} />
                    <Text style={{
                        fontSize: 18,
                        fontFamily: fontFamilies.semiBold,
                        color: '#00F8FF',
                    }}>
                        Upgrade Pro
                    </Text>
                </TouchableOpacity>
            </RowComponent >
        </View >
    )
}

export default DrawerCustom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 100,
        marginBottom: 12,
        resizeMode: 'contain',
    },
    listItemRow: {
        marginVertical: 10,
    },
    listItemText: {
        paddingLeft: 12,
    }
})