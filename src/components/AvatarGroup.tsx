import { View, Text, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import RowComponent from './RowComponent'
import TextComponent from './TextComponent'
import { fontFamilies } from '../constants/fontFamilies'
import SpaceComponent from './SpaceComponent'

interface Props {
    size?: number;
    style?: StyleProp<ViewStyle>;
}

const AvatarGroup = (props: Props) => {
    const { style ,size} = props;
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
                            width: size ?? 24,
                            height: size ?? 24,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: '#fff',
                            marginLeft: index > 0 ? -8 : 0,
                        }}
                    />
                ))
            }    
            <SpaceComponent width={5} />        
            <TextComponent 
                text='+20 going'
                color='#3F38DD'
                font={fontFamilies.semiBold}
            />
        </RowComponent>
    )
}

export default AvatarGroup