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

    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showChangePass,setShowChangePass] = useState(0);
    const [showChangeTrackPeriod,setShowChangeTrackPeriod] = useState(0);
    const [showChangeCurveLength,setShowChangeCurveLength] = useState(0);
    const [focused,setFocused] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [inputText,setText] = useState("");
    const [constructorHasRun,setConstructorHasRun] = useState(false);
    const [show, setShow] = useState(0);
    const userId = params.userId;
    var got = false;
    
    const setGot = (bool)=>{
        got = bool;
    }

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

    const reauthenticate = (currentPassword) => {
      var user = firebase.auth().currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(
          email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    }

    const changePassword = (currentPassword, newPassword) => {
      reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(() => {
          console.log("Password updated!");
        }).catch((error) => { console.log(error); });
      }).catch((error) => { console.log(error); });
    }

    const setPass = ()=>{
      console.log(password,inputText);
      //var cred = reauthenticate(password);
      changePassword(password,inputText);
      //console.log(cred);
      setShowChangePass(0);
    }

    const setTrackPeriod = ()=>{
      try{
        fetch('http://127.0.0.1:5000/changeTrackPeriod', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            trackPeriod: inputText,
            userId:params.userId
          })
        }).then((response)=>{
            console.log("response",response);
            //startStream();
        }).finally(()=>{
            setShowChangeTrackPeriod(0);
        });
      }
      catch(exception){
        console.log(exception);
        setShowChangeTrackPeriod(0);
        //setPropData(items);
      }
    }

    const setCurveLength = ()=>{
      try{
        fetch('http://127.0.0.1:5000/changeCurveLength', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            curveLength: inputText,
            userId:params.userId
          })
        }).then((response)=>{
            console.log("response",response);
            //startStream();
        }).finally(()=>{
            setShowChangeCurveLength(0);
        });
      }
      catch(exception){
        console.log(exception);
        setShowChangeCurveLength(0);
      }
    }

    const checkIsInside = (state)=>{
        if(got==true){
          setGot(false);
        }
        else{
          setGot(false);
          if(state==0){
          setShowChangePass(0);
          setShowChangeCurveLength(0);
          setShowChangeTrackPeriod(0);
          }
          else{
            setShow(0);
          }
        }
    }

    const constructor = ()=>{
      if(constructorHasRun){
          return;
      }
      //retrieveData();
      firebase.database().ref("User/"+params.userId).once("value",function(data){
          console.log(data.val(),data,"firebase data");
          var userData = data.val();
          //var items = [...propData];
          if(userData){
            console.log(userData);
            setUserName(userData.userName);
            setEmail(userData.mail);

          }
          
        }).then(()=>{
          console.log("added data")
        }).finally(()=>{
          //console.log("finally",items);
          //setPropData(items);
      });
    
      setConstructorHasRun(true);
    }
    
    constructor();


    return (
        <View style={styles.container}>

          <View style={showChangePass==1?styles.getItemsCardView:{display:"none"}} onStartShouldSetResponder={() =>{checkIsInside(0)}}>
            <View style={showChangePass==1?styles.getItemsCard:{display:"none"}} onStartShouldSetResponder={() =>{setGot(true);}} >
                    <Text style={{color:"white",fontWeight:"bold",padding:10,}}>Change your Password</Text>
                    <TextInput style={focused?styles.addTextFocused:styles.addText}  onChangeText={(text)=>{setPassword(text);}} onFocus={()=>setFocused(1)} value={password}  onBlur={()=>setFocused(0)} placeholder="Enter your Current Password .." placeholderTextColor="grey"></TextInput>
                    <TextInput style={focused?styles.addTextFocused:styles.addText}  onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText}  onBlur={()=>setFocused(0)} placeholder="Enter your New Password .." placeholderTextColor="grey"></TextInput>
                    <View style={{alignSelf:"flex-end",padding:0}} >
                      <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{(inputText=="" && password=="")?null:setPass()}} >
                        <Text style={(inputText!="")?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Change</Text>
                      </TouchableOpacity>
                    </View>
            </View>
          </View>
          <View style={showChangeTrackPeriod==1?styles.getItemsCardView:{display:"none"}} onStartShouldSetResponder={() =>{checkIsInside(0)}}>
            <View style={showChangeTrackPeriod==1?styles.getItemsCard:{display:"none"}} onStartShouldSetResponder={() =>{setGot(true);}} >
                    <Text style={{color:"white",fontWeight:"bold",padding:10,}}>Change your Track Period</Text>
                    <TextInput style={focused?styles.addTextFocused:styles.addText}  onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText}  onBlur={()=>setFocused(0)} placeholder="Enter your period .." placeholderTextColor="grey"></TextInput>
                    <View style={{alignSelf:"flex-end",padding:0}} >
                      <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{(inputText=="" && !isNaN(inputText))?null:setTrackPeriod()}} >
                        <Text style={(inputText!="" && !isNaN(inputText))?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Change</Text>
                      </TouchableOpacity>
                    </View>
            </View>
          </View>
          <View style={showChangeCurveLength==1?styles.getItemsCardView:{display:"none"}} onStartShouldSetResponder={() =>{checkIsInside(0)}}>
            <View style={showChangeCurveLength==1?styles.getItemsCard:{display:"none"}} onStartShouldSetResponder={() =>{setGot(true);}} >
                    <Text style={{color:"white",fontWeight:"bold",padding:10,}}>Change your Curve Length</Text>
                    <TextInput style={focused?styles.addTextFocused:styles.addText}  onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText}  onBlur={()=>setFocused(0)} placeholder="Enter your curve length .." placeholderTextColor="grey"></TextInput>
                    <View style={{alignSelf:"flex-end",padding:0}} >
                      <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{(inputText=="" && !isNaN(inputText))?null:setCurveLength()}} >
                        <Text style={(inputText!="" && !isNaN(inputText))?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Change</Text>
                      </TouchableOpacity>
                    </View>
            </View>
          </View>
          <View style={{alignItems:"center",paddingTop:30,margin:30,flex:1}}>
            <View style={[styles.profileImgContainer, { borderColor: '#6200EE', borderWidth:0.5,alignSelf:"center" }]}>
                <Image source={require("./bit.png")}
                    style={styles.profileImg} />
            </View>
            <Text style={{alignSelf:"center",color:"white",fontWeight:"bold",fontSize:16 }}> {userName} </Text>
          </View> 
          <View style={{flex:1,backgroundColor:'#343C6F',width:"100%",height:"100%",borderTopLeftRadius:30,overflow: 'hidden',borderTopRightRadius:30}} elevation={25}> 
              <View style={styles.divStyle}>
                <TouchableOpacity onPress={()=>{setShowChangePass(1);setShow(0);setShowChangeTrackPeriod(0);}}  style={styles.divStyle}>
                  < Icon name={"accessibility"} color={"#2BC06A"} type="material" style={{alignSelf:"flex-start",paddingLeft:20,paddingRight:20}}/>
                  <View style={{flex:1,flexDirection:"column"}}>  
                    <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:14 }}>
                      Change Password
                    </Text>
                    <Text style={{alignSelf:"flex-start",color:"grey",paddingTop:5,fontSize:12 }}>
                      Change the track period, track period determines how long the will the tracker sleep until next request.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.divStyle}>
                <TouchableOpacity onPress={()=>{setShowChangeTrackPeriod(1);setShow(0);}}  style={styles.divStyle}>
                  < Icon name={"eye"} color={"#E89511"} type="feather" style={{alignSelf:"flex-start",paddingLeft:20,paddingRight:20}}/>
                  <View style={{flex:1,flexDirection:"column"}}>  
                    <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:14 }}>
                      Track Period
                    </Text>
                    <Text style={{alignSelf:"flex-start",color:"grey",paddingTop:5,fontSize:12 }}>
                      Change the track period, track period determines how long the will the tracker sleep until next request.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.divStyle}>
                <TouchableOpacity onPress={()=>{setShowChangeCurveLength(1);setShow(0);}}  style={styles.divStyle}> 
                  < Icon name={"analytics-outline"} color={"#8842A6"} type="ionicon" style={{alignSelf:"flex-start",paddingLeft:20,paddingRight:20}}/>
                  <View style={{flex:1,flexDirection:"column"}}>  
                    <Text style={{alignSelf:"flex-start",color:"white",fontWeight:"bold",fontSize:14 }}>
                      Curve Length
                    </Text>
                    <Text style={{alignSelf:"flex-start",color:"grey",paddingTop:5,fontSize:12 }}>
                      Change the curve length, curve length determines the size of average used to calculate peakFall.
                    </Text>
                  </View>
                </TouchableOpacity>
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
  getItemsCardView:{
    flex:1,
    height:"100%",
    backgroundColor:"rgba(52, 52, 52, 0)",
    position:"absolute",
    zIndex:1,
    alignSelf:"center",
    width:"100%",
  },
  getItemsCard: {

    backgroundColor:"#343C4F",
    position:"absolute",
    zIndex:1,
    flexDirection:"column",
    alignItems:"flex-start",
    alignSelf:"center",
    borderRadius:15,
    width:"90%",
    padding:10,
    top:150,
    marginLeft:0,
    marginBottom:10,
    justifyContent:"center",
  },
  addText: {
    color: "white",
    width: "90%",
    borderColor: "#fb5b5a",
    borderBottomWidth: 3,
    padding:10,
    marginRight:10,
    marginLeft:5,
    marginBottom:10,
  },
  addTextFocused: {
    color: "white",
    width: "90%",
    borderColor: "#2196F3",
    borderBottomWidth: 3,
    padding: 10,
    marginLeft:5,
    marginBottom:10,
  },
  divStyle: {
    flexDirection:"row",
    width:"100%",
    height:"100%",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:0.5,
    borderBottomColor:"grey",
  }
});