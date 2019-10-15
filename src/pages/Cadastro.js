import React, { Component } from 'react';
import { 
    SafeAreaView, 
    Image, 
    StyleSheet, 
    Text,
    TouchableOpacity, 
    TextInput, 
    View
} from 'react-native';

import logo from '../assets/Logo.png';

 class Cadastro extends Component {
     
     constructor() {
        function handleSubmit() {
            navigation.navigate('Endereco');
        }
         super();
         this.state = {
             name: '',
             nameValidate: true,
             email: '',
             emailValidate: true,
             password: '',
             passwordValidate: true,
             confirmPassword: '',
         }
     }
     validate(text, type)
     {
         alph= /^[a-z A-Z]+$/
         mail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         pass= /^[a-zA-Z0-9]+$/
         if(type == 'username')
         {
            if(alph.test(text))
            {
                this.setState({
                    nameValidate: true,
                })
            }
            else
            {
                this.setState({
                    nameValidate: false,
                })
            }
         }
         else  if(type == 'email')
         {
            if(mail.test(text))
            {
                this.setState({
                    emailValidate: true,
                })
            }
            else
            {
                this.setState({
                    emailValidate: false,
                })
            }
         }
         else  if(type == 'password')
         {
            if(pass.test(text))
            {
                this.setState({
                    passwordValidate: true,
                })
            }
            else
            {
                this.setState({
                    passwordValidate: false,
                })
            }
         }
     }
     
    render(){
        return <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo}/>
        <View style={styles.list}>
            <TextInput placeholder='Nome' style={[styles.input, 
            !this.state.nameValidate? styles.error:null]}
                autoFocus={false} 
                onChangeText={(text) => this.validate(text, 'username')} />
                
            <TextInput placeholder='Email' style={[styles.input, 
            !this.state.emailValidate? styles.error:null]}
                keyboardType='email-address' 
                onChangeText={(text) => this.validate(text, 'email')} />

            <TextInput placeholder='Senha' style={[styles.input, 
            !this.state.passwordValidate? styles.error:null]}
                secureTextEntry={true} 
                onChangeText={(text) => this.validate(text, 'password')} />

            <TextInput placeholder='Confirmar Senha' style={styles.input}
                secureTextEntry={true} value={this.state.confirmPassword}
                onChangeText={confirmPassword => this.setState({ confirmPassword })} />  

            <TouchableOpacity onPress={handleSubmit} style={styles.buttom}>
                <Text style={styles.buttomText}>Avançar</Text>
            </TouchableOpacity>

        </View>
        </SafeAreaView>

    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    list: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    logo:{
        height: 50,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 30,
    },
    buttom: {
        height: 50,
        marginTop: 30,
        padding: 10,
        backgroundColor: '#0000ff',
    },
    buttomText:{
        fontSize: 20,
        color: '#FFF',
    },
    input:{
        marginTop: 20,
        width: '90%',
        backgroundColor: '#FFF',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15,
    },
    error:{
        borderWidth: 3,
        borderColor: 'red',
    }
})

export default Cadastro;