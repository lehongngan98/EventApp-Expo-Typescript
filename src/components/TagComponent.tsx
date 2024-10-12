import { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';

interface Props {
    onPress: () => void,
    text?: string | undefined,
    textColor?: string,
    bgColor?: string,
    icon?: ReactNode,
    styles?: StyleProp<ViewStyle>,
    textSizes?: number,
    textFont?: string,
    textStyles?: StyleProp<ViewStyle>
};


const TagComponent = (props: Props) => {
    const { onPress, text, textColor, bgColor, icon, styles, textFont, textStyles, textSizes } = props;
    const safeText: string = text ?? '';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                globalStyles.row,
                {
                    backgroundColor: bgColor ?? appColors.white,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',       
                    minWidth:82,
                                 
                },
                styles
            ]}
        >
            {icon && icon}
            <SpaceComponent width={5} />
            <TextComponent
                text={safeText}
                color={textColor ?? appColors.white}
                size={textSizes ?? 14}
                font={textFont ?? fontFamilies.regular}
                styles={textStyles}
            />
        </TouchableOpacity>
    )
}

export default TagComponent