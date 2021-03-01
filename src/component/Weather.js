import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const OPEN_WEATHER_API_KEY = "8033adc521a7ac5cec854d10f38a4234";

export default function Weather() {
    const [weather, setWeather] = useState();
    
    useEffect(() => {
        getLocation();
    }, [])

    /* 현재 위치 정보 가져오기 */
    const getLocation = async () => {
        await Geolocation.getCurrentPosition(position => {            
            getWeather(position.coords);

        }, error => {
            console.log('?', error);
        }, { enableHighAccuracy: true });
    }

    /* 날씨 정보 가져오기 */
    const getWeather = async (coords) => {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=daliy&appid=${OPEN_WEATHER_API_KEY}`
        ).then((res) => {
            console.log('날씨 정보 ##', res)
            setWeather(data);
        }         
        ).catch((err) => {
            console.log('에러 ##', err);
        })
    }

    return (
        
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <View style={styles.inputBox}>
                <TextInput 
                    style={styles.inputText} 
                    placeholder={"지역 입력"}                    
                />
            </View>
            <View style={styles.weatherBox}>
                <View style={{flexDirection: 'row', padding: 10}}>
                    <View style={{width: '50%'}}>
                        <Text style={{fontSize: 20, color: '#fff'}}>
                            MON
                        </Text>
                    </View>
                    <View> 
                        <Text style={{fontSize: 20, color: '#fff'}}>
                            날씨
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.weatherBox2}>

            </View>
        </LinearGradient>
        
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
        height: 300,
        width: '100%',
        backgroundColor: '#fff',        
        // alignSelf: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        justifyContent: 'center',
    },
    weatherInput: {

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