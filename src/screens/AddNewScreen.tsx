import React, { useState } from 'react';
import { ButtonComponent, ChoiceLocation, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { useSelector } from 'react-redux';
import { fontFamilies } from '../constants/fontFamilies';
import { authSelector } from '../redux/reducers/authReducer';

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
    const user = useSelector(authSelector);

    const [eventData, setEventData] = useState<any>({
        ...initValues,
        authorId: user.id
    });

    const handleChangeValue = (key: string, value: any) => {
        const item = { ...eventData };
        item[key] = value;
        setEventData(item);
    };

    const handleAddEvent = async () => {
        console.log(eventData);

    };


    return (
        <ContainerComponent isScroll>
            <SectionComponent styles={{ alignItems: 'center' }}>
                <TextComponent
                    text="Add new event"
                    font={fontFamilies.bold}
                    size={22}
                />
            </SectionComponent>

            <SectionComponent>
                <InputComponent
                    value={eventData.title}
                    onChange={(val) => handleChangeValue('title', val)}
                    allowClear
                    placeholder='Title'
                />
                <SpaceComponent height={16} />
                <InputComponent
                    value={eventData.description}
                    onChange={(val) => handleChangeValue('description', val)}
                    placeholder='Description'
                    allowClear
                    multiline
                />
                <SpaceComponent height={16} />
                <InputComponent
                    value={eventData.location.title}
                    onChange={val => handleChangeValue('location',{...eventData.Location, title: val})}
                    placeholder='Title address'
                    allowClear
                    multiline
                />
                <SpaceComponent height={16} />
                <ChoiceLocation />
            </SectionComponent>
            
            <SectionComponent>
                <ButtonComponent
                    text='Add event'
                    onPress={handleAddEvent}
                    type='primary'
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default AddNewScreen