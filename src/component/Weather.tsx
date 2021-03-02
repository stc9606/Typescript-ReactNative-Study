import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import ImageModule from '../module/image/Image';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';


const OPEN_WEATHER_API_KEY = "8033adc521a7ac5cec854d10f38a4234";

export default function Weather() {
    const [weather, setWeather] = useState([]);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        getLocation();
    }, [])
    
    const getLocation = async () => {
        await Geolocation.getCurrentPosition((position : any)=> {            
            getWeather(position.coords);

        }, (error : any) => {
            console.log('?', error);
        }, { enableHighAccuracy: true });
    }

    const getWeather = async (coords : any) => {
        
        await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        ).then((res) => {            
            setLoading(true);
            setWeather(res.data.daily);
        }).catch((err) => {
            console.log(err);
        });
        
    }

    return (        
        <>
        {!isLoading ?
            <View>
                <Text>
                    로딩 중
                </Text>
            </View>
            :
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <View style={styles.inputBox}>
                <TextInput 
                    style={styles.inputText} 
                    placeholder={"지역 입력"}                    
                />
            </View>             
            <FlatList 
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={weather}
                // keyExtractor={(index: number) => index.toString()}
                renderItem={({item, index} : {item : any, index : number}) => {
                    const week = ['일', '월', '화', '수', '목', '금', '토'];                
                    return (
                        <View style={{flex: 1}} key={index}>
                            <View style={styles.weatherBox}>
                                <View style={{flexDirection: 'row', padding: 10}}>
                                    <View style={{width: '50%', justifyContent: 'center'}}>
                                        <Text style={{fontSize: 25, color: '#fff'}}>
                                            {week[new Date(item.dt * 1000).getDay()]}
                                        </Text>
                                        
                                    </View>
                                    <View style={{width:'50%', alignItems:'flex-end'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{fontSize: 20, color: '#fff'}}>
                                                {Math.round(item.temp.day)}°
                                            </Text>
                                            <View style={{marginLeft: 10, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                                <Text style={{color: '#ddd'}}>
                                                    H : {Math.round(item.temp.max)}°
                                                </Text>
                                                <Text style={{color: '#ddd'}}>
                                                    L : {Math.round(item.temp.min)}°
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.weatherBox2}>
                                <View style={styles.weatherDetail}>
                                    <ImageModule imagePath={item.weather[0].description} />                                                       
                                    <Text style={{marginLeft: 10, fontSize: 50, color: '#192f6a'}}>
                                        {Math.round(item.temp.day)}°
                                    </Text>
                                </View>                          
                                <View style={{marginTop: 15, padding: 20}}>
                                    <View style={styles.weatherDetail2}>
                                        <View style={{flexDirection:'row', marginRight: 30, alignItems: 'center'}}>
                                            <Icon name="umbrella-outline" size={25} />
                                            <Text style={{marginLeft: 10}}>
                                                {item.pop}%
                                            </Text>
                                        </View>
                                        <View style={{marginRight: 30,flexDirection:'row',alignItems: 'center'}}>
                                            <Icon2 name="wind" size={25}/>
                                            <Text style={{marginLeft: 10}}>
                                                {item.wind_speed}m/s
                                            </Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems: 'center'}}>
                                            <Icon name="water" size={25} />
                                            <Text style={{marginLeft: 5}}>
                                                {item.humidity}%
                                            </Text>
                                        </View>
                                    </View>
                                </View>      
                            </View>
                        </View>
                    )
                }}
            />                    
        </LinearGradient>
        }
        
        </>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,        
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    inputBox: {
        height: 30,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        // alignSelf: 'center',
        justifyContent: 'center',        
        marginTop: 70
    },
    inputText: {
        marginLeft: 30
    },
    weatherBox: {
        flex: 1,
        height: 55,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        // alignSelf: 'center',
        justifyContent: 'center',        
        marginTop: 30
    },
    weatherBox2: {
        flex: 1,
        height: 200,
        width: '100%',
        backgroundColor: '#fff',        
        alignSelf: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        // justifyContent: 'center',
    },
    weatherDetail: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20
    },
    weatherDetail2: {
        flexDirection: 'row',
        height: 50,        
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
})