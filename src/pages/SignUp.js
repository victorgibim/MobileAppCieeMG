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
    name: yup
    .string()
    .required()
    .label('Nome')
    .test(
        'test-name', 'Nome não Pode conter Número',
        function(value) {
            const nameRegex = /^([a-z A-Z])+$/;
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
    cpf: yup
    .number()
    .label('CPF')
    ,
    rg: yup
    .number()
    .label('RG')
    ,
    ctps: yup
    .number()
    .label('CTPS')
    ,
    pai: yup
    .string()
    .label('Pai')
    .test(
        'test-name', 'Nome não Pode conter Número',
        function(value) {
            const nameRegex = /^([a-z A-Z])+$/;
            let isValidName = nameRegex.test(value);
            if(!isValidName) {
                return false;
            }
            return true;
        }),
    mae: yup
    .string()
    .required()
    .label('Nome da Mãe')
    .test(
        'test-name', 'Nome não Pode conter Número',
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

export default class SignUp extends Component { 
    state = {
        sexo: 'masculino',
        orgao: 'ssp',
        civil: 'solteiro',
        deficiencia: 'nao',
    }
    render(){
        const sexo = this.state.sexo;
        const orgao = this.state.orgao;
        const civil = this.state.civil;
        const deficiencia = this.state.deficiencia;
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
                    <Text style={{ marginBottom: 3 }}>Nome</Text>
                    <TextInput style={styles.input} placeholder="Nome"
                    onChangeText={formikProps.handleChange("name")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.name}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>CPF</Text>
                    <TextInput style={styles.input} placeholder="CPF"
                    onChangeText={formikProps.handleChange("cpf")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cpf}</Text>                        
                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>RG</Text>
                    <TextInput style={styles.input} placeholder="RG"
                    onChangeText={formikProps.handleChange("RG")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.rg}</Text>                        
                    </View>

                    <Text style={{marginBottom: 3, marginVertical: 5, marginHorizontal: 20}}>Orgão Expedidor</Text>    
                    <View style={styles.drop}>
                        <Picker  style={styles.input} selectedValue={this.state.orgao}
                        onValueChange={(itemValue, itemIndex) =>{
                            this.setState({orgao: itemValue})
                        }}>
                            <Picker.Item style={styles.dropText} label= "SSP" value= "ssp"/>
                            <Picker.Item style={styles.dropText} label= "Policia Civil" value= "pc"/>
                        </Picker>
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Carteira de Trabalho</Text>
                    <TextInput style={styles.input} placeholder="Carteira de Trabalho"
                    onChangeText={formikProps.handleChange("CTPS")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.ctps}</Text>                        
                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Nome do Pai</Text>
                    <TextInput style={styles.input} placeholder="Nome do Pai"
                    onChangeText={formikProps.handleChange("pai")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.pai}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Nome da Mãe</Text>
                    <TextInput style={styles.input} placeholder="Nome da Mãe"
                    onChangeText={formikProps.handleChange("mae")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.mae}</Text>                        
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

                    <Text style={{marginBottom: 3, marginVertical: 5, marginHorizontal: 20}}>Sexo</Text>    
                    <View style={styles.drop}>
                        <Picker  selectedValue={this.state.sexo} 
                            onValueChange={(itemValue, itemIndex) => {
                            this.setState({sexo: itemValue})
                        }}>
                            <Picker.Item style={styles.dropText} label= "Masculino" value= "masculino"/>
                            <Picker.Item style={styles.dropText} label= "Feminino" value= "feminino"/>
                        </Picker>
                    </View>

                    <Text style={{marginBottom: 3, marginVertical: 5, marginHorizontal: 20}}>Estado Civil</Text>    
                    <View style={styles.drop}>
                        <Picker  selectedValue={this.state.civil} 
                            onValueChange={(itemValue, itemIndex) => {
                            this.setState({civil: itemValue})
                        }}>
                            <Picker.Item style={styles.dropText} label= "Solteiro(a)" value= "solteiro"/>
                            <Picker.Item style={styles.dropText} label= "Casado(a)" value= "casado"/>
                            <Picker.Item style={styles.dropText} label= "Amaziado(a)" value= "amaziado"/>
                            <Picker.Item style={styles.dropText} label= "Divorciado(a)" value= "divorciado"/>
                            <Picker.Item style={styles.dropText} label= "Víuvo(a)" value= "viuvo"/>
                        </Picker>
                    </View>

                    <Text style={{marginBottom: 3, marginVertical: 5, marginHorizontal: 20}}>Possui alguma deficiência?</Text>    
                    <View style={styles.drop}>
                        <Picker  style={styles.input} selectedValue={this.state.deficiencia} 
                            onValueChange={(itemValue, itemIndex) => {
                            this.setState({deficiencia: itemValue})
                        }}>
                            <Picker.Item style={styles.dropText} label= "Não" value= "nao"/>
                            <Picker.Item style={styles.dropText} label= "Física" value= "fisica"/>
                            <Picker.Item style={styles.dropText} label= "Auditiva" value= "auditiva"/>
                            <Picker.Item style={styles.dropText} label= "Visual" value= "visual"/>
                            <Picker.Item style={styles.dropText} label= "Mental" value= "mental"/>
                            <Picker.Item style={styles.dropText} label= "Mútipla" value= "mutipla"/>
                        </Picker>
                    </View>

                    <Text style={styles.text}>Endereço</Text>
                    <View style={styles.view}>
                    <Text style={{marginBottom: 3, marginVertical: 5, marginHorizontal: 20}}>CEP</Text>    

                    <TextInput style={styles.input} placeholder='CEP'/>    

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