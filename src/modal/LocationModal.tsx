import axios from 'axios';
import { Maker, SearchNormal } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import SpaceComponent from '../components/SpaceComponent';
import TextComponent from '../components/TextComponent';
import * as Location from 'expo-location';
import { appColors } from '../constants/appColors';
import { LocationModel } from '../models/LocationModel';
import MapView from 'react-native-maps';
import { appInfo } from '../constants/appInfos';
import GeoCoding from 'react-native-geocoding';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelected?: (val: {        
        address: string;
        position: {
            latitude: number;
            longitude: number;
        }
    }) => void;
}

GeoCoding.init(process.env.MAP_API_KEY as string);

const LocationModal = (props: Props) => {
    const { visible, onClose, onSelected } = props;
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locationSearch, setLocationSearch] = useState<LocationModel[]>([]);
    const [addressSelected, setAddressSelected] = useState('');
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
    const [currentAddress, setCurrentAddress] = useState<Location.LocationGeocodedAddress | null>(null);
    const [mapRegion, setMapRegion] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number } | null>(null);



    useEffect(() => {
        getLocation();  // Get current location    

    }, []);

    // useEffect(() => {
    //     if (addressSelected) {
    //         handleSelectedAddress(addressSelected);
    //     }
    // }, [addressSelected])



    useEffect(() => { // update 
        if (currentLocation) {
            setMapRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
            });
        }
    }, [currentLocation]);



    useEffect(() => {
        if (!searchKey) { // Reset search result
            setLocationSearch([]);
        }
    }, [searchKey]);


    // Close modal location
    const handleClose = () => {
        setSearchKey('');
        onClose();
    };

    // Get current location
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        // console.log("currentLocation", currentLocation);
        revertLocation(location.coords.latitude, location.coords.longitude);
    };

    // Revert location to address
    const revertLocation = async (lat: number, long: number) => {
        const revertGeocodeAddress = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
        setCurrentAddress(revertGeocodeAddress[0]);
    };

    // handle search location by key word
    const handleSearchLocation = async () => {
        const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&apiKey=EoGZAqvCk9NFBvK6Trb_9iudji1DWPy1QfnsJN0GRlo`;

        try {
            setIsLoading(true);
            const res = await axios.get(api);

            if (res && res.data && res.status === 200) {
                setLocationSearch(res.data.items);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // handle selected address
    const handleSelectedAddress = async (address: string) => {
        const api = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=EoGZAqvCk9NFBvK6Trb_9iudji1DWPy1QfnsJN0GRlo`;
        try {
            const res = await axios.get(api);
            if (res && res.data && res.data.items.length > 0) {
                const location = res.data.items[0].position;

                setCurrentLocation({
                    coords: {
                        latitude: location.lat,
                        longitude: location.lng,
                        accuracy: 0,
                        altitude: 0,
                        altitudeAccuracy: 0,
                        heading: 0,
                        speed: 0
                    },
                    timestamp: 0
                });
            } else {
                console.log('Address not found');
            }
        } catch (error) {
            console.error('Error fetching geocode:', error);
        }
    };



    return (
        <Modal
            animationType='slide'
            visible={visible}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingTop: 42,
                }}
            >
                <RowComponent justify='space-between' styles={{ alignItems: 'center' }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <InputComponent
                            value={searchKey}
                            onChange={(val) => setSearchKey(val)}
                            placeholder='Search...'
                            allowClear
                            affix={
                                <SearchNormal size={20} color={appColors.gray2} />
                            }
                            onEnd={handleSearchLocation}
                        />
                    </View>
                    <SpaceComponent width={12} />
                    <ButtonComponent
                        onPress={handleClose}
                        text='Close'
                    />
                </RowComponent>
            </View>

            <SectionComponent styles={{ backgroundColor: 'white', zIndex: 1 }}>
                {
                    isLoading
                        ? (<ActivityIndicator />)
                        : locationSearch.length > 0
                            ? (<FlatList
                                data={locationSearch}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            marginBottom: 12
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAddressSelected(item.address.label);
                                                setSearchKey('');
                                                handleSelectedAddress(item.address.label);                                                
                                            }}
                                        >
                                            <Text>{item.address.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />)
                            : (
                                <View>
                                    <TextComponent text={searchKey ? 'Location not found!' : 'Search'} />
                                </View>
                            )
                }
            </SectionComponent>
            {
                mapRegion && (
                    <MapView
                        style={{ height: 500, width: appInfo.size.width }}
                        showsMyLocationButton
                        showsUserLocation
                        initialRegion={mapRegion}
                        region={mapRegion}
                        mapType='standard'                                                
                    >
                        {/* <Maker
                            coordinate={{
                                latitude: currentLocation?.coords.latitude ?? 0,
                                longitude: currentLocation?.coords.longitude ?? 0
                            }}
                        /> */}
                    </MapView>
                )
            }


            <View
                style={{
                    alignItems: 'center',
                    marginVertical: 20
                }}>
                <ButtonComponent
                    text='Select'
                    textSize={16}
                    type='primary'

                    onPress={() => {
                        onSelected({
                            address: addressSelected ?? '',
                            position: {
                                latitude: currentLocation?.coords.latitude ?? 0,
                                longitude: currentLocation?.coords.longitude ?? 0
                            }
                        });
                        onClose();
                    }}
                />
            </View>

        </Modal>
    );
};

export default LocationModal;