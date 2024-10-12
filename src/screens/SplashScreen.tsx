import React from 'react';
import { ActivityIndicator, Image, ImageBackground, StyleSheet } from 'react-native';
import { appInfo } from '../constants/appInfos';
import { SpaceComponent } from '../components';
import { appColors } from '../constants/appColors';


const SplashScreen = () => {

    return (
        <ImageBackground
            style={styles.container}
            source={require('../assets/images/splash-image.png')}
            imageStyle={{flex:1}}
        >
            <Image 
                source={require('../assets/images/logo.png')}
                style={{
                    width: appInfo.size.width * 0.5,
                    resizeMode:'contain'
                }}
            />

            {/* space component */}
            <SpaceComponent height={16}/>

            {/* ActivitiInditicator */}
            <ActivityIndicator color={appColors.gray3} size={22}/>
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})