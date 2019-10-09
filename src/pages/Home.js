import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import logo from '../assets/Logo.png';

export default function Home({ navigation }){
    function handleSubmit() {
        navigation.navigate('Signup');
    }
    return <View style={styles.container}>
       <Image source={logo}/>
       <View style={styles.form}>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttom}>
                <Text style={styles.buttomText}>Cadastre-se</Text>
            </TouchableOpacity>
       </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 100,
    },
    buttom: {
        height: 60,
        backgroundColor: '#0000ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttomText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 26,
    },
});