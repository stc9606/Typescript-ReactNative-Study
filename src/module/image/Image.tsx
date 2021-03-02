import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet} from 'react-native';

export default function Image({ imagePath }: {imagePath : string}) {
    console.log(imagePath);

    const imageConfig = (imagePath: string) => {
        switch(imagePath) {
            case "broken clouds":                 
                return <Icon name="partly-sunny-outline" size={66} color={'#192f6a'}/>
            case "clear sky":                                
                return <Icon name="sunny-outline" size={66} color={'#192f6a'}/>
            case "clearsky_night":                
                return <Icon name="cloudy-night-outline" size={66} color={'#192f6a'}/>            
            case "few clouds":                
                return <Icon name="partly-sunny-outline" size={66} color={'#192f6a'}/>
            case "few clouds_night":                
                return <Icon name="cloudy-night-outline" size={66} color={'#192f6a'}/>     
            case "mist":                
                return <Icon name="cloud-outline" size={66} color={'#192f6a'}/>
            case "overcast clouds":                
                return <Icon name="cloud-outline" size={66} color={'#192f6a'}/>            
            case "light rain":                
                return <Icon name="rainy-outline" size={66} color={'#192f6a'}/>
            case "scattered clouds":                
                return <Icon name="cloud-outline" size={66} color={'#192f6a'}/> 
            case "shower rain":                
                return <Icon name="snow-outline" size={66} color={'#192f6a'}/>
            case "light snow":                
                return <Icon name="snow-outline" size={66} color={'#192f6a'}/>
            case "thunderstorm":                
                return <Icon name="thunderstorm-outline" size={66} color={'#192f6a'}/>
            default :                
                return <Icon name="cloud-outline" size={66} color={'#192f6a'}/>
        }
    }
    
    return (
        <>
            {imageConfig(imagePath)}
        </>
    )
}
