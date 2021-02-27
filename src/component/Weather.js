import React from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Weather() {

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