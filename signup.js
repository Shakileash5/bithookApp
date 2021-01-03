import React,{Component,useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage'
import Loading from "./loading"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function SignUp({ navigation }){

    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [constructorHasRun,setConstructorHasRun] = useState(false);
    
    const storeData = async ()=>{
        try{
            console.log("its now pressed",username,email,password);
            //await AsyncStorage.setItem("userName",username  );
            navigation.push('bitHook')
        }
        catch(error){
            console.log(error);
        }
    }

    const retrieveData = async ()=>{
        try{

            //let userName_  = await AsyncStorage.getItem("userName");
            //console.log(userName_," name")

        }
        catch(error){
            console.log(error)
        }
    }

    const constructor = ()=>{
        if(constructorHasRun){
            return;
        }
        console.log("act like constructor");
        //retrieveData();
        setConstructorHasRun(true);
    }
    constructor();

    


    return(

        <View style={Styles.container}>
            <View style={{alignItems:'center',padding:0,width:"85%"}}>
                <Text style={Styles.logo}>ToDO App</Text>    
                <TextInput style={Styles.inputView} placeholder="Username" onChangeText={(text)=>{setUserName(text)}}></TextInput>
                <TextInput style={Styles.inputView} placeholder="Email Id" onChangeText={(text)=>{setEmail(text)}}></TextInput>
                <TextInput style={Styles.inputView} placeholder="Password" onChangeText={(text)=>{setPassword(text)}}></TextInput>
                <TouchableOpacity style={Styles.signupBtn} onPress={()=>storeData()}>
                    <Text style={{color:"white",fontWeight:"bold"}}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}


const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#16192E',
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
        borderRadius:20,
        height:60,
        marginBottom:15,
        color:"white",
        justifyContent:"center",
        padding:20,
        elevation:15,
      },
      signupBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:10,
        elevation:20,
      },
})


export default SignUp;