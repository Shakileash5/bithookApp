import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator,StyleSheet, Text, View,TextInput,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton,Searchbar,Appbar   } from 'react-native-paper';
import Constants from "expo-constants";
import { Icon } from 'react-native-elements';
import Loading from "./loading";
import firebase from './firebase';
import "firebase/auth"
import "firebase/database"

export default function HookHistory(params,{navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [streamStarted,setStreamStarted] = useState(false);
  const [data,setData] = useState([]);
  const [noData,setNoData] = useState(false);

  
  const alternateKey = "c36717396ec409c55b99f59637c4fb5b"
  const key = "9924d3911cf21a14cac79595f1a1b33e"
  const url = "https://api.nomics.com/v1/currencies/ticker?key="+key+"&interval=1h,1d&convert=INR&per-page=100&page=1"
  var iconUrl = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@66d20453c8add12a8555d3822fa6983383cb9562/32/color/"
  
  useEffect(()=>{
      setLoading(true);
      try{
          firebase.database().ref("User/"+params.userId+"/hookHistory").once("value",function(history){
            console.log(history.val(),history);
            if (history.val() != null){
                setData(history.val());
            }
            else{
                setNoData(true);
            }
            setLoading(false);
          }).catch((error)=>{
            console.error(error);
            setLoading(false);
          });
      }
      catch(exception){
        console.log(exception);
      }
  },[]);  

  return (
    <View style={styles.container}>
        {isLoading?<Loading />:null}
        <View elevation={25} style={styles.header}> 
            <Text style={{alignSelf:"flex-start",color:"#E6EFF9",fontWeight:"bold",fontSize:18,}}>HookHistory</Text>
      </View>
      <Text style={noData?{alignSelf:"center",color:"#E6EFF9",fontWeight:"bold",fontSize:18,}:{display:"none"}}> There are no history to reveal!  </Text>
      <ScrollView style={styles.cardView} > 
      {
          
      //var urlL = coin.logo_url.split(".");
        <View key={1} style={{flexDirection:"row",backgroundColor:"#343C5F",padding:10,width:'100%',borderRadius:0,height:100,marginTop:10,borderBottomColor:"grey",borderBottomWidth:0.5}}>
            <Image source={{ uri:"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@66d20453c8add12a8555d3822fa6983383cb9562/128/color/"+"BTC".toLowerCase() + ".png"}} style={styles.profileImg} />
                    
            <View style={{flexDirection:"column",width:"100%"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flexDirection:"column",justifyContent:"center",marginLeft:15,margin:10}}>
                      <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:13}}>{"coin.name".slice(0,10)}</Text>
                      <Text style={{alignSelf:"flex-start",color:"grey",fontSize:11,}} >{"coin.id"}</Text>
                    </View>
                    <Text style={{alignSelf:"flex-start",color:"white",fontSize:10,fontWeight:"200",marginLeft:15,marginTop:14}}>Hook Price </Text>
                    <Text style={{alignSelf:"flex-start",color:"white",fontSize:15,fontWeight:"bold",marginLeft:5,marginTop:10,flex:1}}>{parseFloat("1234.76").toFixed(2)} :: RS</Text>
                    <Text style={{alignSelf:"flex-start",color:"white",fontSize:15,fontWeight:"bold",marginLeft:5,marginTop:10,flex:1}}>{"Hooked"}</Text>
                   
                </View>
              <View
                  style={{
                    width:"100%"
                  }}
                 />
                   <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",alignSelf:"flex-start",marginLeft:15}}>

                                <Text style={{color:"white",fontSize:15,marginTop:1}}> {"04.01.2021 4.45 Pm"} </Text>
                        
                   </View>
                </View>
             </View>
            

        
      }
      </ScrollView>
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
  header:{
    flexDirection:"row",
    width:"100%",
    padding:10,
    height:25,
    backgroundColor:"#16193E",
    height:50,
    borderBottomColor: '#12183A',
    borderBottomWidth: 0.7,
  },
  profileImg: {
    height: 35,
    width: 35,
    borderRadius: 40,
    marginTop:25
    
  },
  cardView: {
    padding:0,
    width:'100%',
    height:'100%',
    flexDirection:"column",
    borderColor:"grey",
    marginBottom:5,
  },
  negative:{
    alignSelf:"flex-start",
    color:"#ED4337",
    fontSize:13,
    fontWeight:"bold"
  },
  positive:{
    alignSelf:"flex-start",
    color:"#63F763",
    fontSize:13,
    fontWeight:"bold"
  }
});
