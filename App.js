import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator,StyleSheet, Text, View,TextInput,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton,Searchbar,Appbar   } from 'react-native-paper';
import Constants from "expo-constants";
import { Icon } from 'react-native-elements';
import Loading from "./loading"
import firebase from './firebase';
import "firebase/auth"
import "firebase/database"
//import RNEventSource from 'rn-eventsource-reborn';
//import RNEventSource from './RNNEventSource';
//import EventSource from "@gpsgate/react-native-eventsource";
//import { LinearGradient } from 'expo-linear-gradient';

export default function App(params,{navigation}) {

  const [isLoading, setLoading] = useState(true);
  const [streamStarted,setStreamStarted] = useState(false);
  const [data,setData] = useState([]);
  const [propData,setPropData] = useState([]);

  const key = "9924d3911cf21a14cac79595f1a1b33e"
  const url = "https://api.nomics.com/v1/currencies/ticker?key="+key+"&interval=1h,1d&convert=INR&per-page=100&page=1"
  var iconUrl = "https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/128x128/"
  iconUrl = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@66d20453c8add12a8555d3822fa6983383cb9562/32/color/"

  //console.log(params,"id\n\n");

  const getCoinData = ()=>{
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        //console.log(data);  
        setLoading(false);
      }).catch((error) => {console.error(error);setLoading(false);})
      .finally(() => {setLoading(false);});

  }

  useEffect(() => {
    setLoading(true);
    getCoinData();
    console.log("CoinData/"+params.userId);
  }, []);

  useEffect(()=> {
    var items = [];
        data.map((coin,id)=>{
        items.push({"uid":id,"id":coin.id,"hooked":false})
    });
    firebase.database().ref("CoinData/"+params.userId).once("value",function(coinData){
          console.log(coinData.val(),coinData,"firebase data");
          var snapData = coinData.val();
          //var items = [...propData];
          if(snapData){
            snapData.map((snapCoin,i)=>{
                data.map((coin,id)=>{
                if(coin.id == snapCoin.id){
                    items[i]["hooked"]=true;
                    console.log("hooked pa",items[i])
                  }
                });
            });
          }
          //setPropData(items);
        }).then(()=>{
          console.log("added data")
        }).finally(()=>{
          console.log("finally",items);
          setPropData(items);
        })
    //setPropData(items);
  },[data]);
/*
  useEffect(()=>{
    //console.log("yfuyf",propData)
  },[propData]);
*/
  const setHook = (id,track,items)=>{
    try{
      fetch('http://127.0.0.1:5000/trackCoins', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coinId: id,
          track: track,
          userId:params.userId
        })
      }).then((response)=>{
          console.log("response",response);
          //startStream();
      });
    }
    catch(exception){
      console.log(exception);
      setPropData(items);
    }
  }

  const hookCoin = (i,id)=>{
    var items = [...propData];
    var backup = [...propData]
    if(items[i]["hooked"]==false){
      items[i]["hooked"]=true;
    }
    else{
      items[i]["hooked"]=false;
    }
    setPropData(items);
    setHook(id,items[i]["hooked"],backup);
    
  }

  return (
    <View style={styles.container}>
    {isLoading?<Loading />:null}
      <View elevation={25} style={styles.header}> 
        <Text style={{alignSelf:"flex-start",color:"#E6EFF9",fontWeight:"bold",fontSize:18,}}>CryptoCurrencies</Text>
        
        <IconButton
        icon="magnify"
        color={"#27D7CD"}
        style={{alignSelf:"flex-end",right:0,position:"absolute",top:0}}
        >
        </IconButton> 
      </View>

      <ScrollView style={styles.cardView} > 
      {
        data.map((coin,i)=>{
         // console.log(coin);
          var hourPercent = "0";
          var dayPercent = "0";
          var urlL = coin.logo_url.split(".");
          
          { 

            coin["1h"]==undefined?(hourPercent="0"):(hourPercent=coin["1h"]["price_change_pct"]);
            coin["1d"]==undefined?(dayPercent="0"):(dayPercent=coin["1d"]["price_change_pct"]);
          }
          return(
            <View key={i} style={{flexDirection:"row",backgroundColor:"#343C5F",padding:10,width:'100%',borderRadius:15,height:100,marginTop:10}}>
              <View style={{flexDirection:"column",width:"100%"}}>
                <View style={{flexDirection:"row"}}>
                    <Image source={{ uri:urlL[urlL.length-1]=="svg"?"https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@66d20453c8add12a8555d3822fa6983383cb9562/128/color/"+coin.id.toLowerCase() + ".png":coin.logo_url}} style={styles.profileImg} />
                    <View style={{flexDirection:"column",justifyContent:"center",marginLeft:15,margin:10}}>
                      <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:13}}>{coin.name.slice(0,10)}</Text>
                      <Text style={{alignSelf:"flex-start",color:"grey",fontSize:11,}} >{coin.id}</Text>
                    </View>
                    <Text style={{alignSelf:"flex-start",color:"white",fontSize:10,fontWeight:"200",marginLeft:15,marginTop:14}}>Current Price </Text>
                    < Icon name={parseFloat(hourPercent)>0?"caret-up":"caret-down"} color={parseFloat(hourPercent)>0?"#49AF41":"#ED4337"} type="font-awesome" style={{marginLeft:10,marginTop:8}} />
                    <Text style={{alignSelf:"flex-start",color:"white",fontSize:15,fontWeight:"bold",marginLeft:5,marginTop:10,flex:1}}>{parseFloat(coin.price).toFixed(2)}</Text>
                    < Icon solid name="crosshairs" color={propData[i]!=undefined?(propData[i]["hooked"]?"#F59300":"cyan"):"cyan"} type="font-awesome" style={{marginLeft:10,marginTop:8,color:"#F59300"}} onPress={()=>{hookCoin(i,coin.id);}} />

              </View>
              <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                    width:"100%"
                  }}
                />
                <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginLeft:15,}}>
                  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                    
                    <Text style={{alignSelf:"flex-start",color:"#F7F2F2",fontSize:12,marginTop:1}}> 1H% </Text>
                    <Text style={parseFloat(hourPercent)>0?styles.positive:styles.negative}>{parseFloat(hourPercent)>0?"+"+hourPercent:hourPercent}</Text>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderRightColor: 'grey',
                        height:"100%",
                        margin:5
                      }}
                    />
                      <Text style={{alignSelf:"flex-start",color:"white",fontSize:12,marginTop:1}}> 1D% </Text>
                      <Text style={parseFloat(dayPercent)>0?styles.positive:styles.negative}>{parseFloat(dayPercent)>0?"+"+dayPercent:dayPercent}</Text>
                      <View
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: 'grey',
                          height:"100%",
                          margin:5
                        }}
                      />
                      <Text style={{alignSelf:"flex-start",color:"white",fontSize:12,}}>{propData[i]!=undefined?(propData[i]["hooked"]?"Hooked":"NotHooked"):"NotAvailable"}</Text>
                    </View>
                  
                </View>
              </View>
          </View>
          );
        })
      }    
      </ScrollView>
      <StatusBar style="auto" />
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
    height: 25,
    width: 25,
    borderRadius: 40,
    marginTop:15,
  },
  cardView: {
    padding:20,
    width:'100%',
    height:'100%',
    flexDirection:"column",
    borderColor:"grey",
    borderRadius:5,
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
