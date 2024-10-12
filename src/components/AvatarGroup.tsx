import { View, Text, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { fontFamilies } from '../constants/fontFamilies'

interface Props {
    style?: StyleProp<ViewStyle>;
}

const AvatarGroup = (props: Props) => {
    const { style } = props;
    const url = 'https://th.bing.com/th/id/OIP.JADOFqAzLIoWgD-k6qAZGwAAAA?rs=1&pid=ImgDetMain';

    return (
        <RowComponent
            styles={[
                {},
                style
            ]}
        >
            {
                Array.from({ length: 3 }).map((item, index) => (
                    <Image
                        key={index}
                        source={{ uri: url }}
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: '#fff',
                            marginLeft: index > 0 ? -8 : 0,
                        }}
                    />
                ))
            }            
            <TextComponent 
                text='+20 going'
                color='#3F38DD'
                font={fontFamilies.semiBold}
            />
        </RowComponent>
    )
}

export default AvatarGroup