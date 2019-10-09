import React from 'react';
import { 
    StyleSheet, 
    TextInput, 
    Text,
    View, 
    SafeAreaView, 
    ActivityIndicator, 
    Button,
    Picker,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

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
    .required(),
    rg: yup
    .number()
    .label('RG')
    .required(),
})

export default () => (
    <SafeAreaView style={styles.safe}>
        <Formik
            initialValues={{ name: '', email: '', password: '', cpg: '', rg: '' }}
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
                    <View>
                        <Picker  >
                            <Picker.Item label= "Masculino" value= "masculino"/>
                            <Picker.Item label= "Feminino" value= "feminino"/>
                        </Picker>
                    </View>
                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (

                    <Button title="Submit" onPress={formikProps.handleSubmit} />
                    )}
                </React.Fragment>
            )}
        </Formik>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    safe: {
        marginTop: 90,
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 3,
    },
    erro: {
        color: 'red',
    },
    view: {
        marginHorizontal: 20,
        marginVertical: 5,
    },
})