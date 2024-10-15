import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../apis/userApi';
import { ButtonComponent, ChoiceLocation, ContainerComponent, DropDownPicker, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components';
import { fontFamilies } from '../constants/fontFamilies';
import { SelectModel } from '../models/SelectModel';
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
    const [userSelected, setUserSelected] = useState<SelectModel[]>([]);
    const user = useSelector(authSelector);
    const [eventData, setEventData] = useState<any>({
        ...initValues,
        authorId: user.id
    });

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    const handleChangeValue = (key: string, value: any) => {
        const item = { ...eventData };
        item[key] = value;
        setEventData(item);        
    };

    const handleGetAllUsers = async () => {
        const api = '/get-all';
        try {
            const res = await userApi.HandleUser(api);
            if(res && res.data){
                const items: SelectModel[] = [];
                res.data.forEach((item: any) => {
                    items.push({
                        label: item.fullname ? item.fullname : item.email,
                        value: item.id,
                    });
                });
                setUserSelected(items);
            }
           
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const handleAddEvent = async () => {        
        console.log(eventData);
        
        
    };


    return (
        <ContainerComponent isScroll >
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

                {/* // Date and Time */}
                <RowComponent>
                    <TextComponent
                        text="Date"
                        font={fontFamilies.regular}
                        size={16}
                        color='gray'
                    />
                    <RNDateTimePicker
                        display="default"
                        value={new Date(eventData.date)}
                        themeVariant="light"
                        mode={'date'}
                        onChange={(event, date) => {
                            if (event.type === 'set' && date) {
                                handleChangeValue('date', date);  // Cập nhật ngày
                            }
                        }}
                    />
                    <SpaceComponent width={16} />

                    {/* StartAt and EndAt */}
                    <SectionComponent>
                        <RowComponent>
                            <TextComponent
                                text="Start at"
                                font={fontFamilies.regular}
                                color='gray'
                                size={16}
                                styles={{ width: 60 }}
                            />
                            <SpaceComponent width={6} />
                            <RNDateTimePicker
                                display="default"
                                value={new Date(eventData.startAt)}
                                
                                themeVariant="light"
                                mode={'time'}
                                onChange={(event, date) => {
                                    if (event.type === 'set' && date) {
                                        handleChangeValue('startAt', date);  // Cập nhật thời gian bắt đầu
                                    }
                                }}
                            />
                        </RowComponent>
                        <SpaceComponent height={10} />
                        <RowComponent>
                            <TextComponent
                                text="End at"
                                font={fontFamilies.regular}
                                color='gray'
                                size={16}
                                styles={{ width: 60 }}
                            />
                            <SpaceComponent width={6} />
                            <RNDateTimePicker
                                display="default"
                                value={new Date(eventData.endAt)}
                                themeVariant="light"
                                mode={'time'}
                                onChange={(event, date) => {
                                    if (event.type === 'set' && date) {
                                        handleChangeValue('endAt', date);  // Cập nhật thời gian bắt đầu
                                    }
                                }}
                            />
                        </RowComponent>

                    </SectionComponent>
                </RowComponent>

                <SpaceComponent height={16} />

                <DropDownPicker
                    value={userSelected}
                    onSelect={(val : string | string[]) => handleChangeValue('users', val)}
                    label='Invited users'
                    selected={[]}
                    multible
                />

                <SpaceComponent height={16} />

                <InputComponent
                    value={eventData.location.title}
                    onChange={val => handleChangeValue('location', { ...eventData.Location, title: val })}
                    placeholder='Title address'
                    allowClear
                    multiline
                />
                <SpaceComponent height={16} />
                <ChoiceLocation />
            </SectionComponent>

            <SectionComponent styles={{marginTop:25,alignItems:'center'}}>
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