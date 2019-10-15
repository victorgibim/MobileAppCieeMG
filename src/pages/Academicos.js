import React, { Component } from 'react';
import { 
    StyleSheet, 
    TextInput, 
    Text,
    ScrollView,
    View, 
    SafeAreaView, 
    ActivityIndicator, 
    Button,
    Picker,
    Image,
    TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import logo from '../assets/Logo.png';

const validationSchema = yup.object().shape({
    cep: yup
    .string()
    .required()
    .label('CEP')
    .test(
        'test-name', 'Nome não Pode conter Número',
        function(value) {
            const nameRegex = /^([0-9_\.\-])+(([0-9\-])+\.)+([0-9]{3,6})+$/;
            let isValidName = nameRegex.test(value);
            if(!isValidName) {
                return false;
            }
            return true;
        }
    ),
    email: yup
    .string()
    .label('E-mail')
    .email()
    .required()
    .test('test-name', 'Enter Valid Email',
    function(value) {
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let isValidEmail = emailRegex.test(value);
        if (!isValidEmail) {
            return false;
        }
        return true;
    }
    ),
    password: yup
    .string()
    .label('Senha')
    .required()
    .min(6, 'A senha tem que ter mais de 6 Caracteres')
    .max(12, 'A senha deve ter até 12 caracteres'),
    terms: yup
    .boolean()
    .oneOf([true], 'Teste'),
    logradouro: yup
    .string()
    .label('Logradouro')
    .required(),
    numero: yup
    .number()
    .label('Numero')
    .required(),
    telefone1: yup
    .number()
    .label('Telefone 1')
    .required(),
    telefone2: yup
    .number()
    .label('Telefone 2')
    .required(),
    complemento: yup
    .string()
    .label('Complemento')
    .required(),
    uf: yup
    .string()
    .label('UF')
    .test(
        'test-name', 'UF não Pode conter Número',
        function(value) {
            const nameRegex = /^([a-z A-Z])+$/;
            let isValidName = nameRegex.test(value);
            if(!isValidName) {
                return false;
            }
            return true;
        }),
    bairro: yup
    .string()
    .required()
    .label('Bairro')
    .test(
        'test-name', 'Bairro não Pode conter Número',
        function(value) {
            const nameRegex = /^([a-z A-Z])+$/;
            let isValidName = nameRegex.test(value);
            if(!isValidName) {
                return false;
            }
            return true;
        }
    ),
    cidade: yup
    .string()
    .required()
    .label('Cidade')
    .test(
        'test-name', 'Cidade não Pode conter Número',
        function(value) {
            const nameRegex = /^([a-z A-Z])+$/;
            let isValidName = nameRegex.test(value);
            if(!isValidName) {
                return false;
            }
            return true;
        }
    ),
})

export default class Endereco extends Component { 

    render(){
        return <ScrollView style={{backgroundColor: '#c4def6'}}>
        <SafeAreaView style={styles.safe}>
        <Image style={styles.logo} source={logo}/>
        <Formik
            initialValues={{ name: '', email: '', password: '', cpg: '', rg: '', sexo: '', orgao: '', ctps: '', pai: '', mae: '', civil: '', deficiencia: '' }}
            onSubmit={(values, actions) =>{
                alert(JSON.stringify(values));
                setTimeout(() => {
                    actions.setSubmitting(false);
                }, 1000);
            }}
            validationSchema = {validationSchema}
        >
            {formikProps => (
                <React.Fragment>
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Escola onde estuda ou estudou</Text>
                    <TextInput style={styles.input} placeholder="Escola onde estuda ou estudou"
                    onChangeText={formikProps.handleChange("cep")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cep}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Curso</Text>
                    <TextInput style={styles.input} placeholder="Curso"
                    onChangeText={formikProps.handleChange("logradouro")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.logradouro}</Text>                        
                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Ano de formatura</Text>
                    <TextInput style={styles.input} placeholder="Ano de formatura"
                    onChangeText={formikProps.handleChange("numero")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.numero}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Semestre de formatura</Text>
                    <TextInput style={styles.input} placeholder="Semestre de formatura"
                    onChangeText={formikProps.handleChange("complemento")}
                    />

                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Mês da formatura</Text>
                    <TextInput style={styles.input} placeholder="Mês da formatura"
                    onChangeText={formikProps.handleChange("uf")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.uf}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Periodo/Ano/Ciclo/Módulo</Text>
                    <TextInput style={styles.input} placeholder="Periodo/Ano/Ciclo/Módulo"
                    onChangeText={formikProps.handleChange("bairro")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.bairro}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Horário de Estudo</Text>
                    <TextInput style={styles.input} placeholder="Horário de Estudo"
                    onChangeText={formikProps.handleChange("cidade")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cidade}</Text>                        
                    </View>


                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (

                    <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.buttom}>
                        <Text style={styles.buttomText}>Cadastrar</Text>
                    </TouchableOpacity>
                    )}
                </React.Fragment>
            )}
        </Formik>
    </SafeAreaView>
    </ScrollView>
}}

const styles = StyleSheet.create({
    safe: {
        marginTop: 90,
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
    dropText: {
        textAlign: 'center',
        color: 'black',
        
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