import { Dimensions } from "react-native";

export const appInfo ={
    size:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    
    BASE_URL : 'http://localhost:3000',
    // BASE_URL : 'http://192.168.20.114:3000',


}