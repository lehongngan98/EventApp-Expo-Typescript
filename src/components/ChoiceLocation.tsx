import { ArrowRight2, Location } from 'iconsax-react-native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'
import { LocationModal } from '../modal'
import { globalStyles } from '../styles/globalStyles'
import RowComponent from './RowComponent'
import SpaceComponent from './SpaceComponent'
import TextComponent from './TextComponent'



const ChoiceLocation = () => {
    const [isVisibleModalLocation, setIsVisibleModalLocation] = useState(false);
    const [addressSelected, setAddressSelected] = useState<{
        address: string;
        position: {
            latitude: number;
            longitude: number;
        }
    }>();


    return (
        <>
            <RowComponent
                justify='space-between'
                styles={[
                    globalStyles.inputContainer,
                    {}
                ]}
                onPress={() => setIsVisibleModalLocation(!isVisibleModalLocation)}
            >
                <RowComponent>
                    <View style={styles.card}>
                        <View style={[
                            { ...styles.card },
                            { width: 30, height: 30, backgroundColor: 'white' }
                        ]}>
                            <Location size={20} color={appColors.primary} variant='Bold' />
                        </View>
                    </View>
                    <SpaceComponent width={12} />
                    <TextComponent
                        text= {addressSelected?.address ?? 'Choose location'}
                        font={fontFamilies.regular}
                        color='gray'
                        size={14}
                    />
                </RowComponent>
                <ArrowRight2 size={20} color={appColors.primary} variant='Linear' />
            </RowComponent>

            <LocationModal
                visible={isVisibleModalLocation}
                onClose={() => setIsVisibleModalLocation(false)}
                onSelected={(val) => setAddressSelected(val)}
            />
        </>
    )
}

export default ChoiceLocation

const styles = StyleSheet.create({
    card: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: `${appColors.primary}3D`,
        justifyContent: 'center',
        alignItems: 'center',
    }
})