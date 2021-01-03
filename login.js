import React,{Component,useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Button,ScrollView,SafeAreaView } from 'react-native';

function Login(){

    return(

        <View style={Styles.container}>
            <View style={{alignItems:'center',padding:20,width:"100%"}}>
                <Text style={Styles.logo}>ToDO App</Text>
                <TextInput style={Styles.inputView} placeholder="Email Id"></TextInput>
                <TextInput style={Styles.inputView} placeholder="Password"></TextInput>
                <TouchableOpacity>
                     <Text style={Styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.loginBtn}>
                    <Text style={{color:"white",fontWeight:"bold"}}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={{color:"white",fontWeight:"bold"}}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}


const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1E1E',
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        color:"white",
        fontSize:40,
        fontWeight:"bold",
        marginBottom:30,
    },
    inputView:{
        width:"100%",
        backgroundColor:"#3E3E3E",
        borderRadius:25,
        height:60,
        marginBottom:20,
        color:"white",
        justifyContent:"center",
        padding:20,
        elevation:20,
      },
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10,
        elevation:20,
      },
})


export default Login;