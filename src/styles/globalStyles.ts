import { Platform, StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamilies } from "../constants/fontFamilies";


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,

    },

    text: {
        fontFamily: fontFamilies.regular,
        fontSize: 14,
        color: appColors.text,
    },
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 56,
        flexDirection: 'row',
        marginHorizontal: 50,
    },
    section: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    shadow: {
        shadowColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.4)', // Softer shadow color
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,  // Increase opacity for a slightly stronger shadow
        shadowRadius: 10,    // More blur to create a softer shadow
        elevation: 8,        // Slightly higher elevation for Android
    },


    iconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColors.icon,
        borderRadius: 100,
    },
    card: {
        borderRadius: 12,
        backgroundColor: appColors.white,
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 12,
        marginBottom: 16,

    },
    noSpaceCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        width: 45,
        height: 45,
        marginHorizontal:0,
        marginVertical:0,
        marginBottom:0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: appColors.gray1,
        borderRadius: 12,
        minHeight: 54,
        maxHeight: 54,
        width: '100%',
        padding: 15,
        backgroundColor: appColors.white,
        
    },
    input: {
        flex: 1,
        margin: 0,
        padding: 0,
        color: appColors.text,
    },
})