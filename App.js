import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import Tabs from './app/config/router';

class App extends Component {
  state = {};
  render() {
    return (
      <View style={{ flex:1, backgroundColor: '#F0F8FF'}}>
        <View style={{height:50, marginTop:20, marginLeft:15, marginRight:10}}>
          <Text style={{fontSize:20,fontWeight:"bold"}}>SMART HOME <Text style={{fontSize:15,opacity:0.3}}>v1.0</Text></Text>
        </View>
        <View style={styles.container}>
          <StatusBar backgroundColor="#F0F8FF" barStyle="dark-content"></StatusBar>
          <Tabs></Tabs>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});