import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, View } from 'react-native';
import { CircleComponent, TabBarIcon } from '../components';
import { AddNewScreen } from '../screens';
import EventNavigator from './EventNavigator';
import ExploreNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';
import { AddSquare } from 'iconsax-react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 90,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;
                    let iconSize = size;
                    let iconStyle = {};
                    let iconComponent = null;

                    if (route.name === 'Explore') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Events') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Add') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                        iconSize = 33;
                        iconStyle = { marginBottom: 20 };
                        iconComponent = (
                            <CircleComponent
                                size={52}
                                styles={[
                                    globalStyles.shadow,
                                    { marginTop: Platform.OS === 'ios' ? -50 : -60 },
                                ]}>
                                <AddSquare size={24} color={appColors.white} variant="Bold" />
                            </CircleComponent>
                        );
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // Return the TabBarIcon component or the custom iconComponent for "Add"
                    return iconComponent || (
                        <TabBarIcon
                            name={iconName}
                            size={size}
                            color={color}
                            style={iconStyle}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Explore" component={ExploreNavigator} />
            <Tab.Screen name="Events" component={EventNavigator} />
            <Tab.Screen name="Add"
                component={AddNewScreen}
                options={{
                    tabBarLabel: focus => null,
                }}
            />
            <Tab.Screen name="Map" component={MapNavigator} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    );
};

export default TabNavigator;