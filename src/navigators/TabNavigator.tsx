// import { View, Text, Platform } from 'react-native'
// import React, { ReactNode } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { appColors } from '../constants/appColors';
// import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
// import { AddSquare, Calendar, Location, User } from 'iconsax-react-native';
// import { CircleComponent, TextComponent } from '../components';
// import { globalStyles } from '../styles/globalStyles';
// import { AddNewScreen } from '../screens';
// import ExploreNavigator from './ExploreNavigator';
// import EventNavigator from './EventNavigator';
// import MapNavigator from './MapNavigator';
// import ProfileNavigator from './ProfileNavigator';

// const TabNavigator = () => {
//     const Tab = createBottomTabNavigator();

//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarStyle: {
//                     height: Platform.OS === 'ios' ? 90 : 65,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     backgroundColor: appColors.white,
//                 },
//                 tabBarIcon: (({ focused, color, size }) => {
//                     let icon: ReactNode;
//                     color = focused ? appColors.primary : appColors.gray5;

//                     switch (route.name) {
//                         case 'Explore':
//                             icon = <MaterialIcons name="explore" size={24} color={color} />
//                             break;
//                         case 'Events':
//                             icon = <Calendar size={24} color={color} />
//                             break;
//                         case 'Map':
//                             icon = <Location size={24} color={color} />
//                             break;
//                         case 'Profile':
//                             icon = <User size={24} color={color} />
//                             break;

//                         case 'Add':
//                             icon =
//                                 <CircleComponent
//                                     size={52}
//                                     color={appColors.primary}
//                                     styles={[
//                                         {
//                                             marginTop: Platform.OS === 'ios' ? -55 : -60,
//                                         },
//                                         globalStyles.shadow
//                                     ]}
//                                 >
//                                     <AddSquare size={24} color={appColors.white} variant='Bold' />
//                                 </CircleComponent>
//                             break;
//                     }
//                     return icon
//                 }),
//                 tabBarLabel: ({ focused }) => {
//                     return route.name === 'Add' ? null :
//                         <TextComponent
//                             text={route.name}
//                             size={12}
//                             color={focused ? appColors.primary : appColors.gray4}
//                             styles={{
//                                 marginBottom: 8,
//                             }}
//                         />
//                 },
//                 tabBarIconStyle: {
//                     marginTop: 4
//                 }


//             })}>
//             <Tab.Screen name="Explore" component={ExploreNavigator} />
//             <Tab.Screen name="Events" component={EventNavigator} />
//             <Tab.Screen name="Add" component={AddNewScreen} />
//             <Tab.Screen name="Map" component={MapNavigator} />
//             <Tab.Screen name="Profile" component={ProfileNavigator} />

//         </Tab.Navigator>
//     )
// }

// export default TabNavigator



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TabBarIcon } from '../components';
import { AddNewScreen } from '../screens';
import EventNavigator from './EventNavigator';
import ExploreNavigator from './ExploreNavigator';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    // marginTop: -20,
                    height: 90,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconSize = size;
                    let iconStyle = {};

                    if (route.name === 'Explore') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Events') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Add') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                        iconSize = 33;
                        iconStyle = { marginBottom: 20, };
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // Return the TabBarIcon component
                    return <TabBarIcon
                        name={iconName}
                        size={route.name === 'Add' ? iconSize : size}
                        color={color}
                        style={route.name === 'Add' ? iconStyle : {}}
                    />;
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