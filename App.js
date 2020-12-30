import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator,StyleSheet, Text, View,TextInput,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton,Searchbar,Appbar   } from 'react-native-paper';
import Constants from "expo-constants";
import { Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [val,setVal] = useState([]);
  const [data,setData] = useState([]);
  const [propData,setPropData] = useState([])
  const key = "9924d3911cf21a14cac79595f1a1b33e"
  const url = "https://api.nomics.com/v1/currencies/ticker?key="+key+"&interval=1h,1d&convert=INR&per-page=100&page=1"
  var iconUrl = "https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/128x128/"
  iconUrl = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@66d20453c8add12a8555d3822fa6983383cb9562/32/color/"

  const getCoinData = ()=>{
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        //console.log(data);  
      }).catch((error) => console.error(error))
      .finally(() => {setLoading(false);});

  }

  useEffect(() => {
    getCoinData();
    //console.log(data);
    
  }, []);

  useEffect(()=> {
    var items = [];
        data.map((coin,id)=>{
        items.push({"uid":id,"id":coin.id,"hooked":false})
        
    });
    setPropData(items);
  },[data]);



  return (
    <View style={styles.container}>
      <View elevation={25} style={styles.header}> 
        <Text style={{alignSelf:"flex-start",color:"#E6EFF9",fontWeight:"bold",fontSize:18,}}>CryptoCurrencies</Text>
        <TouchableOpacity style={{marginLeft:10,marginTop:5,}}>
          <LinearGradient start={[0, 0.5]}
                          end={[1, 0.5]}
                          colors={['#0D324D', '#7F5A83']}
                          style={{borderRadius: 5,justifyContent:"center",width:40,height:20,alignItems:"center"}}>
            <View >
              <Text style={{alignSelf:"baseline",color:"#E6EFF9",fontWeight:"bold",fontSize:12,}}>INR</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
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
                    < Icon solid name="crosshairs" color={propData[i]!=undefined?(propData[i]["hooked"]?"#F59300":"cyan"):"cyan"} type="font-awesome" style={{marginLeft:10,marginTop:8,color:"#F59300"}} onPress={()=>{var items = [...propData];items[i]["hooked"]=true;setPropData(items);}} />

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
                      <Text style={{alignSelf:"flex-start",color:"white",fontSize:12,}}>Hooked</Text>
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
