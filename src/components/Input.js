import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';


class Input extends PureComponent {
    state = {};
    render() {
        return(
            <View style={styles.root}>
                <Text>Teste input</Text>
                <TextInput />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        width: '90%',
        alignSelf: 'center',
    },
})

export default Input;