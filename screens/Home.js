import React from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>Welcome To Nord</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('Signup')} style={styles.button}>
            <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 120
    },
    textTitle: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'purple',
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 20
    },
    signupText: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: 'white',
        textAlign: 'center',
    },
    button: {
        // width: 40,
        borderColor: 'gray',
        borderRadius: 20,
        borderWidth: 1,
        // backgroundColor: 'red',
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        width: '70%'
    }
})

export default Home