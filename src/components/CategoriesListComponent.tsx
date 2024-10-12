import { View, Text, FlatList, Image } from 'react-native'
import React, { ReactNode } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { appColors } from '../constants/appColors';
import TagComponent from './TagComponent';
import { Art, Food } from '../assets/svg';
import { fontFamilies } from '../constants/fontFamilies';



interface Props {
    isFilter?: boolean;
};

interface Category {
    icon: ReactNode;
    label: string;
    color: string;
    key: string;
};

const CategoriesListComponent = (props: Props) => {
    const { isFilter } = props;

    const categories: Category[] = [
        {
            key: 'Sports',
            label: 'Sports',
            icon: <FontAwesome5 name='basketball-ball' size={20} color={isFilter ? appColors.white : '#F0635A'} />,
            color: '#F0635A',
        }, {
            key: 'Music',
            label: 'Music',
            icon: <FontAwesome name='music' size={20} color={isFilter ? appColors.white : '#F59762'} />,
            color: '#F59762',
        }
        , {
            key: 'Food',
            label: 'Food',            
            // icon: <FontAwesome name='music' size={20} color={isFilter ? appColors.white : '#F59762'} />,
            icon: <Image  source={require('../assets/images/food.png')}/>,
            color: '#29D697',
        }, {
            key: 'Art',
            label: 'Art',
            // icon: <FontAwesome name='music' size={20} color={isFilter ? appColors.white : '#F59762'} />,
            icon: <Image  source={require('../assets/images/art.png')}/>,
            color: '#46CDFB',
        }
    ];

    return (
        <FlatList
            style={{ paddingHorizontal: 16 }}
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item ,index}) =>
                <TagComponent
                    onPress={() => { }}
                    icon={item.icon}
                    text={item.label}
                    bgColor={isFilter ? item.color : appColors.white}
                    styles={{ marginRight: index === categories.length -1 ? 25 : 10, width: 90, height: 40, }}
                    textFont={fontFamilies.bold}
                    textSizes={16}
                />
            }

        />
    )
}

export default CategoriesListComponent