import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator,StyleSheet, Text, View,TextInput,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton,Searchbar,Appbar   } from 'react-native-paper';
import Constants from "expo-constants";
import { Icon } from 'react-native-elements';
import Loading from "./loading";
import firebase from './firebase';
import "firebase/auth";

export default function Profile(params,{navigation}) {
    const [isLoading, setLoading] = useState(true);
    const userId = params.userId;
    console.log("userIs",userId);
    const logOut = ()=>{
      console.log("Logged out");
      try{
        firebase.auth().signOut();
        params.navigateTo.navigate("Login");
      }
      catch(err){
        console.log("Error",err)
      }
    }

    return (
        <View style={styles.container}>
          <View style={{alignItems:"center",paddingTop:30,margin:30,flex:1}}>
            <View style={[styles.profileImgContainer, { borderColor: '#6200EE', borderWidth:0.5,alignSelf:"center" }]}>
                <Image source={require("./bit.png")}
                    style={styles.profileImg} />
            </View>
            <Text style={{alignSelf:"center",color:"white",fontWeight:"bold",fontSize:16 }}> Shakileash C </Text>
          </View> 
          <View style={{flex:1,backgroundColor:'#343C6F',width:"100%",height:"100%",borderTopLeftRadius:30,overflow: 'hidden',borderTopRightRadius:30}} elevation={25}> 
              <View style={{flexDirection:"row",width:"100%",height:"100%",flex:1,justifyContent:"center",alignItems:"center",borderBottomWidth:0.5,borderBottomColor:"grey"}}>
                < Icon name={"accessibility"} color={"#2BC06A"} type="material" style={{alignSelf:"flex-start",paddingLeft:20,paddingRight:20}}/>
                <View style={{flex:1,flexDirection:"column"}}>  
                  <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:14 }}>
                    UserName
                  </Text>
                  <Text style={{alignSelf:"flex-start",color:"grey",paddingTop:5,fontSize:12 }}>
                    Change the track period, track period determines how long the will the tracker sleep until next request.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:"100%",flex:1,justifyContent:"center",alignItems:"center",borderBottomWidth:0.5,borderBottomColor:"grey"}}>
                < Icon name={"eye"} color={"#E89511"} type="feather" style={{alignSelf:"flex-start",paddingLeft:20,paddingRight:20}}/>
                <View style={{flex:1,flexDirection:"column"}}>  
                  <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:14 }}>
                    Track Period
                  </Text>
                  <Text style={{alignSelf:"flex-start",color:"grey",paddingTop:5,fontSize:12 }}>
                    Change the track period, track period determines how long the will the tracker sleep until next request.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:"100%",flex:1,justifyContent:"center",alignItems:"center",borderBottomWidth:0.5,borderBottomColor:"grey"}}>
                < Icon name={"analytics-outline"} color={"#8842A6"} type="ionicon" style={{alignSelf:"flex-start",paddingLeft:20,paddingRight:20}}/>
                <View style={{flex:1,flexDirection:"column"}}>  
                  <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:14 }}>
                    Curve Length
                  </Text>
                  <Text style={{alignSelf:"flex-start",color:"grey",paddingTop:5,fontSize:12 }}>
                    Change the curve length, curve length determines the size of average used to calculate peakFall.
                  </Text>
                </View>
              </View>
              <View style={{flexDirection:"row",width:"100%",height:"100%",flex:1,justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{logOut()}} style={{flexDirection:"row",width:"100%",height:"100%",flex:1,justifyContent:"center",alignItems:"center"}}>
                  < Icon name={"power-off"} color={"#ED4337"} type="font-awesome" style={{alignSelf:"flex-start",paddingRight:30}}/>
                  <Text style={{alignSelf:"center",color:"white",fontWeight:"bold",fontSize:14 }}>
                    LogOut
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141A3E',
    paddingTop:Constants.statusBarHeight,
    flexDirection:"column",
    zIndex:0,
  },
  profileImgContainer: {
    
    height: 160,
    width: 160,
    borderRadius: 160/2,
    overflow: 'hidden',
    backgroundColor:"white",
    margin:30,
  },
  profileImg: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    borderWidth: 3,
    borderColor: "#6200EE"
  },
});