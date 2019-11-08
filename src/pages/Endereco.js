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
    .label('CEP'),
    // .test(
    //     // 'test-name', 'Nome não Pode conter Número',
    //     // function(value) {
    //     //     const nameRegex = /^([0-9_\.\-])+(([0-9\-])+\.)+([0-9]{3,6})+$/;
    //     //     let isValidName = nameRegex.test(value);
    //     //     if(!isValidName) {
    //     //         return false;
    //     //     }
    //     //     return true;
    //     // }
    // ),
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
                    <Text style={{ marginBottom: 3 }}>CEP</Text>
                    <TextInput style={styles.input} placeholder="CEP"
                    onChangeText={formikProps.handleChange("cep")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cep}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Logradouro</Text>
                    <TextInput style={styles.input} placeholder="Logradouro"
                    onChangeText={formikProps.handleChange("logradouro")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.logradouro}</Text>                        
                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Numero</Text>
                    <TextInput style={styles.input} placeholder="Numero"
                    onChangeText={formikProps.handleChange("numero")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.numero}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Complemento</Text>
                    <TextInput style={styles.input} placeholder="Complemento"
                    onChangeText={formikProps.handleChange("complemento")}
                    />

                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>UF</Text>
                    <TextInput style={styles.input} placeholder="UF"
                    onChangeText={formikProps.handleChange("uf")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.uf}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Bairro</Text>
                    <TextInput style={styles.input} placeholder="Bairro"
                    onChangeText={formikProps.handleChange("bairro")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.bairro}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Cidade</Text>
                    <TextInput style={styles.input} placeholder="Cidade"
                    onChangeText={formikProps.handleChange("cidade")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cidade}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Telefone 1</Text>
                    <TextInput style={styles.input} placeholder="Telefone 1"
                    onChangeText={formikProps.handleChange("telefone1")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.telefone1}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Telefone 2</Text>
                    <TextInput style={styles.input} placeholder="Telefone 2"
                    onChangeText={formikProps.handleChange("telefone2")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.telefone2}</Text>                        
                    </View>
                        

                    
                    <View style={styles.view}>
                        <Text style={{marginBottom: 3}}>E-mail</Text>
                        <TextInput placeholder="example@example.com" style={styles.input}
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        />
                        <Text style={styles.erro}>
                        {formikProps.touched.email && formikProps.errors.email}
                        </Text>
                    </View>

                    <View style={styles.view}>
                        <Text style={{marginBottom: 3}}>Senha</Text>
                        <TextInput  placeholder="Senha" style={styles.input}
                        onChangeText={formikProps.handleChange('password')}
                        onBlur={formikProps.handleBlur('password')}
                        secureTextEntry
                        />
                        <Text style={styles.erro}>
                        {formikProps.touched.password && formikProps.errors.password}
                        </Text>
                    </View>

                    <View style={styles.view}>
                        <Text style={{marginBottom: 3}}>Confirmar Senha</Text>
                        <TextInput  placeholder="Confirmar Senha" style={styles.input}
                        onChangeText={formikProps.handleChange('password')}
                        onBlur={formikProps.handleBlur('password')}
                        secureTextEntry
                        />
                        <Text style={styles.erro}>
                        {formikProps.touched.password && formikProps.errors.password}
                        </Text>
                    </View>

                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (

                    <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.buttom}>
                        <Text style={styles.buttomText}>Avançar</Text>
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