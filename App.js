import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator,StyleSheet, Text, View,TextInput,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton,Searchbar,Appbar   } from 'react-native-paper';
import Constants from "expo-constants";
import { Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  var data = [];
  const key = "9924d3911cf21a14cac79595f1a1b33e"
  const url = "https://api.nomics.com/v1/currencies/ticker?key="+key+"&interval=1h,1d&convert=INR&per-page=100&page=1"
  var data1 = {};

  const setData = (val)=>{
    data = val;
  }

  const getCoinData = ()=>{
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(data);
      }).catch((error) => console.error(error))
      .finally(() => {setLoading(false);console.log(data);});

  }

  useEffect(() => {
    getCoinData();
  }, []);




  return (
    <View style={styles.container}>
      <View elevation={15} style={styles.header}> 
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
        <View style={{flexDirection:"row",backgroundColor:"#343C5F",padding:10,width:'100%',borderRadius:15,height:"100%"}}>
          <View style={{flexDirection:"column",width:"100%"}}>
            <View style={{flex:1,flexDirection:"row"}}>
                <Image source={{ uri:"https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/128x128/bitcoin.png"}} style={styles.profileImg} />
                <View style={{flexDirection:"column",justifyContent:"center",marginLeft:15,margin:10}}>
                  <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:13,}} >Bitcoin</Text>
                  <Text style={{alignSelf:"flex-start",color:"grey",fontSize:11,}} >BTC</Text>
                </View>
                <Text style={{alignSelf:"flex-start",color:"white",fontSize:10,fontWeight:"200",marginLeft:15,marginTop:14}}>Current Price </Text>
                < Icon name="caret-up" color="#49AF41" type="font-awesome" style={{marginLeft:10,marginTop:8}} />
                <Text style={{alignSelf:"flex-start",color:"#63F763",fontSize:15,fontWeight:"bold",marginLeft:5,marginTop:10}}>199822.0</Text>
                < Icon solid name="crosshairs" color="#F59300" type="font-awesome" style={{marginLeft:10,marginTop:8,}} />

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
              <Text style={{alignSelf:"flex-start",color:"#ED4337",fontSize:13,fontWeight:"bold"}}>-490</Text>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: 'grey',
                  height:"100%",
                  margin:5
                }}
              />
                <Text style={{alignSelf:"flex-start",color:"white",fontSize:12,marginTop:1}}> 1D% </Text>
                <Text style={{alignSelf:"flex-start",color:"#63F763",fontSize:13,fontWeight:"bold"}}>+290</Text>
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
    flexDirection:"column",
    borderColor:"grey",
    borderRadius:5,
    marginBottom:5,
  },
});
