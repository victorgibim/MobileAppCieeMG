import React from 'react';
import { 
    StyleSheet, 
    ScrollView,
    SafeAreaView, 
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import logo from '../assets/Logo.png';

export default function Aviso({ navigation }) { 
    function handleSubmit(){
      navigation.navigate('Home')
    } 
    return <ScrollView style={{backgroundColor: '#c4def6'}}>
          <SafeAreaView style={styles.safe}>
            <Image style={styles.logo} source={logo}/>
            <View style={styles.viewText} >
              <Text style={styles.texto}>
                Esse Aplicativo se encontra em fase de desenvolvimento atualmente
                com apenas a funcionalidade de cadastro disponível, após o cadastro
                é possivel acompanhar as vagas disponíveis através do portal www.cieemg.org.br.
                Em breve estará disponibilizada as demais funcionalidades do Aplicativo.
                Para continuar o cadastro clique abaixo.
              </Text>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttom}>
                <Text style={styles.buttomText}>Cadastrar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
}

const styles = StyleSheet.create({
    safe: {
        marginTop: 90,
    },
    viewText: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100
    },  
    texto: {
      marginHorizontal: 20,
      justifyContent: 'center',
      fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 3,
        backgroundColor: 'white',
    },
    erro: {
        color: 'red',
    },
    view: {
        marginHorizontal: 20,
        marginVertical: 5,
    },
    logo:{
        height: 50,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 3,
    },
    buttom: {
        height: 50,
        marginTop: 30,
        padding: 10,
        backgroundColor: '#0000ff',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    buttomText:{
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    drop: {
        borderWidth: 1,
        marginBottom: 20,
        marginHorizontal: 20,
        marginVertical:5,
        backgroundColor: 'white',
    },
    text:{
        borderWidth:1,
        marginBottom: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        height: 30,
        textAlign: "center",
        backgroundColor: 'red',
        
    }
})