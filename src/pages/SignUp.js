import React, { Component } from 'react';
import { 
    StyleSheet,
    Keyboard, 
    TextInput, 
    Text,
    ScrollView,
    View, 
    SafeAreaView, 
    ActivityIndicator, 
    Button,
    Picker,
    Image,
    SubmitButton,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AsyncStorage } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import logo from '../assets/Logo.png';
import api from '../assets/services/api';

let parseFormats = ['MM-DD-YYYY'];
let invalidDate = new Date('');

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
    cep: yup
    .string()
    .required()
    .label('CEP')
    .test(
        'test-name', 'Nome não Pode conter Número',
        function(value) {
            const nameRegex = /^([0-9])$/;
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
    confirmPassword: yup
    .string()
    .required()
    .label('Confirmar Senha')
    .test('passwords-match', 'Passwords must match ya fool', function(value){
        return this.parent.password === value;
    }),
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
    .max(2)
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
    escola: yup
    .string()
    .required()
    .label('Escola onde estuda ou estudou'),
    curso: yup
    .string()
    .required()
    .label('Curso'),
    ano: yup
    .date()
    .required()
    .label('Ano de formatura')
    .transform(function(value, originalValue){
        if(this.isType(value)) return value;
        value = Moment(originalValue, parseFormats);
        return value.isValid() ? value.toDate() : invalidDate;
    }),
    semestre: yup
    .number()
    .required()
    .label('Semestre de Formatura'),
    mes: yup
    .number()
    .required()
    .label('Mês de Formatura'),
    periodo: yup
    .number()
    .required()
    .label('Periodo/Ano/Ciclo/Módulo'),
    horario: yup
    .number()
    .required()
    .label('Horário de Estudo'),
})

export default class SignUp extends Component { 
    state = {
        sexo: 'masculino',
        orgao: 'ssp',
        civil: 'solteiro',
        deficiencia: 'nao',
        cep: '',
        dados: {
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
        }
    };
    buscarCep = async () => {
     fetch(`http://api.cieemg.org.br:9001/cep/${this.state.cep}`).then(res => res.json()).then(data =>{
         this.setState({
             dados: data
         })
         console.log(data)
     }).catch(err => {
         console.log(err)
     });

    }

    
    render(){
        const cep = this.state.cep;
        const sexo = this.state.sexo;
        const orgao = this.state.orgao;
        const civil = this.state.civil;
        const deficiencia = this.state.deficiencia;
        return <ScrollView style={{backgroundColor: '#c4def6'}}>
        <SafeAreaView style={styles.safe}>
        <Image style={styles.logo} source={logo}/>
        <Formik
            initialValues={{ name: '', email: '', password: '', cpg: '', rg: '', 
                sexo: '', orgao: '', ctps: '', pai: '', mae: '', civil: '', 
                deficiencia: '', cep: '', logradouro:'', numero:'', complemento:'',
                uf:'', bairro:'', cidade:'', telefone1:'', telefone2:'', escola:'',
                curso:'', ano:'', semestre:'', mes:'', periodo:'', horario:'',
            }}
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
                    autoCapitalize='words'
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
                    autoCapitalize='words'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.pai}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Nome da Mãe</Text>
                    <TextInput style={styles.input} placeholder="Nome da Mãe"
                    onChangeText={formikProps.handleChange("mae")}
                    autoCapitalize='words'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.mae}</Text>                        
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

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>CEP</Text>
                    <TextInput value={this.state.cep} style={styles.input} placeholder="CEP" keyboardType='numeric'
                    onChangeText={cep => {this.setState({ cep })}}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cep}</Text>  
                    <TouchableOpacity style={styles.searchButton} onPress={this.buscarCep}>
                        <Icon name="search" size={20} color="#FFF"/>
                    </TouchableOpacity>
                    </View>

                    {/* <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Logradouro</Text>
                    <TextInput style={styles.input} placeholder="Logradouro" 
                    onChangeText={formikProps.handleChange("logradouro")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.logradouro}</Text>                        
                    </View> */}

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Logradouro</Text>
                    <TextInput style={styles.textCep} placeholder={this.state.dados.logradouro} 
                    placeholderTextColor={'black'} editable={false}
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
                    
                    {/* <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>UF</Text>
                    <TextInput style={styles.input} placeholder="UF"
                    onChangeText={formikProps.handleChange("uf")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.uf}</Text>                        
                    </View> */}


                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>UF</Text>
                    <TextInput style={styles.textCep} placeholder={this.state.dados.uf} 
                    placeholderTextColor={'black'} editable={false}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.uf}</Text>                        
                    </View>



                    {/* <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Bairro</Text>
                    <TextInput style={styles.input} placeholder="Bairro"
                    onChangeText={formikProps.handleChange("bairro")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.bairro}</Text>                        
                    </View> */}


                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Bairro</Text>
                    <TextInput style={styles.textCep} placeholder={this.state.dados.bairro} 
                    placeholderTextColor={'black'} editable={false}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.bairro}</Text>                        
                    </View>


                    {/* <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Cidade</Text>
                    <TextInput style={styles.input} placeholder="Cidade"
                    onChangeText={formikProps.handleChange("cidade")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.cidade}</Text>                        
                    </View> */}


                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Cidade</Text>
                    <TextInput style={styles.textCep} placeholder={this.state.dados.cidade} 
                    placeholderTextColor={'black'} editable={false}
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
                        onChangeText={formikProps.handleChange('confirmPassword')}
                        onBlur={formikProps.handleBlur('confirmPassword')}
                        secureTextEntry
                        />
                        <Text style={styles.erro}>
                        {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword}
                        </Text>
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Escola onde estuda ou estudou</Text>
                    <TextInput style={styles.input} placeholder="Escola onde estuda ou estudou"
                    onChangeText={formikProps.handleChange("escola")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.escola}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Curso</Text>
                    <TextInput style={styles.input} placeholder="Curso"
                    onChangeText={formikProps.handleChange("curso")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.curso}</Text>                        
                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Ano de formatura</Text>
                    <TextInput style={styles.input} placeholder="Ano de formatura"
                    onChangeText={formikProps.handleChange("ano")}
                    keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.ano}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Semestre de formatura</Text>
                    <TextInput style={styles.input} placeholder="Semestre de formatura"
                    onChangeText={formikProps.handleChange("semestre")}
                    />

                    </View>
                    
                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Mês da formatura</Text>
                    <TextInput style={styles.input} placeholder="Mês da formatura"
                    onChangeText={formikProps.handleChange("mes")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.mes}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Periodo/Ano/Ciclo/Módulo</Text>
                    <TextInput style={styles.input} placeholder="Periodo/Ano/Ciclo/Módulo"
                    onChangeText={formikProps.handleChange("periodo")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.periodo}</Text>                        
                    </View>

                    <View style={styles.view}>
                    <Text style={{ marginBottom: 3 }}>Horário de Estudo</Text>
                    <TextInput style={styles.input} placeholder="Horário de Estudo"
                    onChangeText={formikProps.handleChange("horario")}
                    />
                    <Text style={{ color: 'red' }}>{formikProps.errors.horario}</Text>                        
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
}};

// const SubmitButton = styled(RectButton)`
// justify-content: center;
// align-itens: center;
// background: #fff;
// `;

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
        
    },
    searchButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 4,
        marginLeft: 10,
        padding: 12,
    },
    textCep: {
        color: 'black',
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 3,
        backgroundColor: 'white',
    }
})