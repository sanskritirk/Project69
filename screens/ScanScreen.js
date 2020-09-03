import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:' ',
      buttonState:'normal',
    }
  }
  getCameraPermissions=async()=>{
       const {status}=await Permissions.askAsync(Permissions.CAMERA)
       this.setState({
         hasCameraPermissions: status==='granted',
         buttonState:'clicked',
         scanned:false
       })
  }
  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal',
    })
  }
  render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    if (buttonState==='clicked' && hasCameraPermissions){
      return (
        <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}/>
      )
    }
    else if(buttonState==='normal'){
    return(
      <View style={styles.container}>
          <Image style={styles.img} source={require('../assets/220px-Barcode-scanner.jpg')}></Image>
          <Text style={styles.displaytxt}>{hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permission'}</Text>
          <TouchableOpacity style={styles.scanbtn} onPress={this.getCameraPermissions}>
          <Text style={styles.btntxt}>Scan QR Code</Text>
          </TouchableOpacity>
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displaytxt:{
    fontSize:20,
  },
  scanbtn:{
    backgroundColor:'#00b5cc',
    padding:20,
    margin:20,   
  },
  btntxt:{
    fontSize:15,
    fontWeight:'bold',
    color:'white',
  },
  img:{
      padding:20,

  }
});
