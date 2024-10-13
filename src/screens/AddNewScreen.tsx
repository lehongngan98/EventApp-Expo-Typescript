import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ContainerComponent, InputComponent, SectionComponent, TextComponent } from '../components';
import { fontFamilies } from '../constants/fontFamilies';

const initValues = {
    title: "",
    description: "",
    location: {
        title: "",
        address: "",
    },
    imgUrl: '',
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
}

const AddNewScreen = () => {
    const [eventData, setEventData] = useState(initValues);

    const handleChangeValue = (key: string, value: any) => {
        console.log(key, value);        
    };
    
    const handleAddEvent = async() => {
        console.log(eventData);
        
    };


    return (
        <ContainerComponent isScroll>
            <SectionComponent styles={{alignItems:'center'}}>
                <TextComponent
                    text="Add new event"
                    font={fontFamilies.bold}
                    size={22}                   
                />
            </SectionComponent>
            <SectionComponent>
                <InputComponent
                    value={eventData.title}
                    onChange={(val) => handleChangeValue('title',val)}
                    
                    allowClear
                    suffix
                    placeholder='Title'
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default AddNewScreen