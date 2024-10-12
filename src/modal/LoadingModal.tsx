import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { TextComponent } from '../components'
import { globalStyles } from '../styles/globalStyles'

interface Props {
    visible: boolean,
    mess?: string,

}


const LoadingModal = (props: Props) => {

    const { visible, mess } = props

    return (
        <Modal style={[globalStyles.container, { flex: 1 }]} transparent statusBarTranslucent visible={visible}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={'white'} />
                <TextComponent text='loading' flex={0} color='white'/>
            </View>
        </Modal>
    )
}

export default LoadingModal