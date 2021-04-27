import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Switch, ScrollView, FlatList, TouchableOpacity, Image, Button, BackHandler } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
//Import moment for date and time
import moment from 'moment';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import {Restart} from 'fiction-expo-restart';
import ToggleSwitch from 'toggle-switch-react-native'

class Home extends Component {
    constructor(props) {
        super(props);
        this.onPressBTNReopenApp = this.onPressBTNReopenApp.bind();
        this.onPressBTNCloseApp = this.onPressBTNCloseApp.bind();
        this.state = {
            toggledList: false,
            dataLampu:[],
            dataModeApp:[],
            refreshing: true,
            toggledModeApp: false,
            isModalnetworkVisible: false,
        };
    }

    onPressBTNReopenApp() {
        Restart();
    }

    onPressBTNCloseApp()
    {
        BackHandler.exitApp();
    }

    checkInternet() {
        NetInfo.fetch().then(state => {
            console.log('Is isInternetReachable?', state.isInternetReachable);         

            if (state.isInternetReachable == true)
            {
                this.setState({ isModalnetworkVisible: false });
            }
            else
            {
                this.setState({ isModalnetworkVisible: true });
            }
        });
    }

    //Untuk diload pertama kali 
    componentDidMount() {
        console.log('Refresh Home');
        this.checkInternet();
        this.getDataModeApp();
        this.fetchCats();
    }

    //Get Mode App yang aktif
    getDataModeApp() {
        console.log('Refresh');
        this.setState({ refreshing: true });
        fetch('http://207.148.121.237:8099/api/ModeApp/GetModeApp')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ dataModeApp: resJson });
                this.setState({ toggledModeApp: (resJson.mode == 2 ? true : false) });
            }).catch(e => 
                {
                    console.log('Error : ' + e);
                    this.setState({ isModalnetworkVisible: true });
                });
    }

    //Action Switch App Mode
    setSwitchValueMode = (val) => {
        var temp = [this.state.dataModeApp];
        temp.map((t) => {
            t.mode = val == true ? '2' : '1';
            this.setState({ toggledModeApp: val});
        })

        this.setState({ dataModeApp: temp })

        var date = moment().format('YYYY-MM-DD HH:mm:ss');

        const params = JSON.stringify({
            "mode": (val == true ? '2' : '1'),
            "last_Change": date  
        });

        axios.post("http://207.148.121.237:8099/api/ModeApp/ChangeMode", params, {
            "headers": {            
                "content-type": "application/json",
                },
            })
            .then(function(response) {       
                console.log(response.status);
            })
            .catch(function(error) {
                console.log(error);
            });     

            this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
            console.log('Refresh after change');
    }

    //Action Switch Flatlist
    setSwitchValue = (val, ind, lampID) => {
        console.log('lampu : ' + lampID + ' | val : ' + val + '|' + ind);

        var temp = [...this.state.dataLampu]
        temp.map((t) => {
            if (t.lampu_ID == lampID) {
                t.lampu_State = val == true ? '2' : '1'
            }
        })

        this.setState({ dataLampu: temp })

        var date = moment()
                    .format('YYYY-MM-DD HH:mm:ss');

        const params = JSON.stringify({
            "lampu_ID": lampID,
            "lampu_State": (val == true ? '2' : '1'),
            "change_Date": date  
        });

        axios.post("http://207.148.121.237:8099/api/ActionLampu/Create", params, {
            "headers": {            
                "content-type": "application/json",
                },
            })
            .then(function(response) {            
                console.log(response.status);
            })
            .catch(function(error) {
                console.log(error);
            });     
    }

    handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
    }

    fetchCats() {
        console.log('Refresh');
        this.setState({ refreshing: true });
        
        fetch('http://207.148.121.237:8099/api/HistoryStateLampu/GetAll')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ dataLampu: resJson });
                this.setState({ refreshing: false });
            }).catch(e => 
                {
                    console.log('Error : ' + e);
                    this.setState({ isModalnetworkVisible: true });
                });
    }



    render() {
        return (

            <View style={styles.container}>

                <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontSize:17, fontWeight: 'bold', marginTop:40 }}>PANEL CONTROL</Text>
                </View>

                <View style={{ marginRight:15, marginTop:10 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <ToggleSwitch
                        isOn={this.state.toggledModeApp}
                        onColor="green"
                        offColor="grey"
                        label="Mode Auto"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="small"
                        onToggle={(value) => this.setSwitchValueMode(value)}
                        />

                    </View>
                </View>                

                <View style={{ alignContent: 'center'}}>
                    {this.renderFlastListOption()}
                </View>

                <Modal style={{ borderRadius:20, backgroundColor:'#FFFF' }} isVisible={this.state.isModalnetworkVisible}>
                        <View style={ stylesError.container}>
                            
                            <View>
                                <Image source={ require('../Images/no_internet.png') } style={{width:250, height:300}} />
                            </View>

                            <View>
                                <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontSize:14, fontWeight: 'bold', marginTop:40, textAlign: 'center' }}>There are several related problems. Check your internet connection or report to our administrator!</Text>
                            </View>
                            
                            </View>

                            <View style={{ margin: 20 }}>
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <Button title="Reopen App" color="#30a10b" onPress={() => this.onPressBTNReopenApp()} />
                                </View>
                                <View>
                                    <Button title="Close App" color="#ad0c0c" onPress={() => this.onPressBTNCloseApp()} />
                                </View>
                            </View>                                
                                
                            </View>
                        </Modal>

            </View>
        );
    }

    renderFlastListOption() {
        if (this.state.toggledModeApp == false)
        {
            return (
                    <FlatList
                        style={{ margin:20 }}
                        data={this.state.dataLampu}    
                        extraData={this.state}  
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        renderItem={({ item, index }) => {
                        
                        var icon = item.lampu_State == '2' ? require('../Images/lampu_On.jpg') : require('../Images/lampu_Off.jpg');

                        return <View style={styles.listItem}>
                            <Image source={icon} style={{width:60, height:60,borderRadius:30}} />
                            { //<Image source={{uri: item.lampu_State == '2' ? "https://banner2.cleanpng.com/20180326/dgq/kisspng-incandescent-light-bulb-computer-icons-lighting-idea-5ab94c6d530221.69913673152209316534.jpg" : "https://banner2.cleanpng.com/20180427/egq/kisspng-computer-icons-light-automation-download-show-off-light-5ae2c3dca9faf3.9701789415248107166963.jpg" }}  style={{width:60, height:60,borderRadius:30}} /> //
                            }
                            <View style={{alignItems:"center", justifyContent:"center", alignContent:"center",flex:1}}>
                                <Text style={{fontWeight:"bold"}}>{item.lampu_Name}</Text>
                            </View>
                            <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>      
                                <Switch style={{paddingTop:3}}
                                    ios_backgroundColor="#3e3e3e"
                                    value={item.lampu_State == '2' ? true : false }
                                    onValueChange={(value) => this.setSwitchValue(value, index, item.lampu_ID)}
                                />
                            </TouchableOpacity>
                            </View>;
                        }}
                        keyExtractor={item => item.lampu_Name }
                    />
            );
        }
        else
        {
            return (
                <FlatList
                        style={{ margin:20 }}
                        data={this.state.dataLampu}    
                        extraData={this.state}  
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        renderItem={({ item, index }) => {
                        return <View style={styles.listItem}>
                            <Image source={ require('../Images/lampu_auto.jpg')}  style={{width:60, height:60,borderRadius:30}} />
                            <View style={{alignItems:"center", justifyContent:"center", alignContent:"center",flex:1}}>
                                <Text style={{fontWeight:"bold"}}>{item.lampu_Name}</Text>
                            </View>
                            </View>;
                        }}
                        keyExtractor={item => item.lampu_Name }
                    />
              );
        }
    } 

    renderFlatListNoData() {
        return (
            <FlatList
                    style={{ margin:20 }}
                    data={this.state.dataLampu}    
                    extraData={this.state}  
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    renderItem={({ item, index }) => {
                    return <View style={styles.listItem}>
                        <Image source={{uri: "https:\/\/w7.pngwing.com\/pngs\/236\/470\/png-transparent-incandescent-light-bulb-computer-icons-lighting-symbol-on-off-lamp-light-black-and-white.png" }}  style={{width:60, height:60,borderRadius:30}} />
                        <View style={{alignItems:"center", justifyContent:"center", alignContent:"center",flex:1}}>
                            <Text style={{fontWeight:"bold"}}>{item.lampu_Name}</Text>
                        </View>
                        </View>;
                    }}
                    keyExtractor={item => item.lampu_Name }
                />
          );
      }

}

export default Home;

const stylesError = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1, margin: 20
    }
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    stage: {
        backgroundColor: '#EFEFF4',
        paddingTop: 20,
        paddingBottom: 20,
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#F0F8FF",
        width:"100%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:10
    }
});