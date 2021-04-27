import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Switch, ScrollView, FlatList, TouchableOpacity, Image, Button, BackHandler } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import axios from 'axios';
import _ from 'lodash';
//Import moment for date and time
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {Restart} from 'fiction-expo-restart';


function Item({ item }) {
    return (
      <View style={styles.listItem}>
        <View style={{alignItems:"flex-start", justifyContent:"center", alignContent:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        </View>
        <Text>{item.total_watt}</Text>
      </View>
    );
  }

  function TotalItem({ item }) {
    return (
      <View style={styles.listItemTotal}>
        <View style={{alignItems:"flex-start", justifyContent:"center", alignContent:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{ item.total_String }</Text>
        </View>
        <Text>{item.total_Nominal}</Text>
      </View>
    );
  }

  function ItemByWaktu({ item }) {
    return (
      <View style={styles.listItem}>
        <View style={{alignItems:"flex-start", justifyContent:"center", alignContent:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        </View>
        <Text>{ item.waktu }</Text>
      </View>
    );
  }

  function TotalItemByWaktu({ item }) {
    return (
      <View style={styles.listItemTotal}>
        <View style={{alignItems:"flex-start", justifyContent:"center", alignContent:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{ item.total_String }</Text>
        </View>
        <Text>{item.total_Nominal}</Text>
      </View>
    );
  }

class Info extends Component {

    //Untuk diload pertama kali 
    componentDidMount() {
      console.log('Refresh Info');
      this.checkInternet();
      this.getListLampuForDDL();
      //this.getInfoWaktuLampuHidup(this.state.dataLampu);
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

    getInfoWaktuLampuHidup(lmp_id) {

        this.setState({ refreshing: true });

        console.log('Refresh');
        console.log('lmp_id : ' + lmp_id);

        var startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        var endOfMonth   = moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss');

        
        console.log('startOfMonth : ' + startOfMonth);
        console.log('endOfMonth : ' + endOfMonth);

        const params = JSON.stringify({
            "lampu_ID": lmp_id,
            "date_From": startOfMonth,
            "date_To": endOfMonth  
        });

        //fetch('http://207.148.121.237:8099/api/ReportInfo/InfoWaktuLampuHidup', {
        fetch('http://207.148.121.237:8099/api/ReportInfo/InfoWaktuLampuHidup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: params
                })
        
                    .then((response) => response.json())
                    .then((responseData) => {
                        //console.log("RESULTS HERE:", responseData)        
                    this.setState({ refreshing: false, listDataLampuByWaktu: responseData }, function(){ });
              })
              .catch((error) =>{
                console.error(error);
                this.setState({ isModalnetworkVisible: true });
              }) 

        //Total
        fetch('http://207.148.121.237:8099/api/ReportInfo/InfoTotalWaktuLampuHidup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: params
            })
    
                .then((response) => response.json())
                .then((responseData) => {
                    //console.log("RESULTS HERE TOTAL :", responseData)        
                this.setState({ refreshing: false, listTotalByWaktu: responseData }, function(){ });
          })
          .catch((error) =>{
            console.error(error);
            this.setState({ isModalnetworkVisible: true });
          }) 

    }

    getListLampuForDDL() {
        //fetch('http://207.148.121.237:8099/api/ReportInfo/ListDataLampuForDDLInfo', {
        fetch('http://207.148.121.237:8099/api/ReportInfo/ListDataLampuForDDLInfo', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })        
                    .then((response) => response.json())
                    .then((responseData) => {
                    this.setState({ listLampuDDL: responseData, dataLampu: '0' }, function(){ });
              })
              .catch((error) =>{
                console.error(error);
                this.setState({ isModalnetworkVisible: true });
              }) 

    }


    ////////////////////////////
    getInfoWattLampuHidup(lmp_id) {

        this.setState({ refreshing: true });

        console.log('Refresh');
        console.log('lmp_id : ' + lmp_id);

        var startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        var endOfMonth   = moment().clone().endOf('month').format('YYYY-MM-DD HH:mm:ss');

        
        console.log('startOfMonth : ' + startOfMonth);
        console.log('endOfMonth : ' + endOfMonth);

        const params = JSON.stringify({
            "lampu_ID": lmp_id,
            "date_From": startOfMonth,
            "date_To": endOfMonth  
        });

        fetch('http://207.148.121.237:8099/api/ReportInfo/InfoWattLampuHidup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: params
                })
        
                    .then((response) => response.json())
                    .then((responseData) => {
                        //console.log("RESULTS HERE WATT:", responseData)        
                    this.setState({ refreshing: false, listDataLampuByWatt: responseData }, function(){ });
              })
              .catch((error) =>{
                console.error(error);
                this.setState({ isModalnetworkVisible: true });
              }) 

        //Total
        fetch('http://207.148.121.237:8099/api/ReportInfo/InfoTotalWattLampuHidup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: params
            })
    
                .then((response) => response.json())
                .then((responseData) => {
                    //console.log("RESULTS TOTAL WATT :", responseData)        
                this.setState({ refreshing: false, listTotalByWatt: responseData }, function(){ });
          })
          .catch((error) =>{
            console.error(error);
            this.setState({ isModalnetworkVisible: true });
          }) 

    }

    constructor(props) {
        super(props);
        this.onPressBTNReopenApp = this.onPressBTNReopenApp.bind();
        this.onPressBTNCloseApp = this.onPressBTNCloseApp.bind();
        this.onPressBTNModal1 = this.onPressBTNModal1.bind(this);
        this.onPressBTNModal2 = this.onPressBTNModal2.bind(this);
        this.state = {
            listLampuDDL:[
                {
                  "label": "Semua Lampu",
                  "value": "0"
                },
                {
                  "label": "Lampu Depan",
                  "value": "1"
                },
                {
                  "label": "Lampu Tengah",
                  "value": "2"
                },
                {
                  "label": "Lampu Kamar Mandi",
                  "value": "3"
                },
                {
                  "label": "Lampu Kamar 1",
                  "value": "4"
                },
                {
                  "label": "Lampu Kamar 2",
                  "value": "5"
                }
              ],
            refreshing: false,
            dataLampu: '0',
            dataBerdasarkan: '0',
            totalPrice: 0,
            isModal1Visible: false,
            isModal2Visible: false,
            listDataLampuByWaktu:[],
            listDataLampuByWatt:[],
            listTotalByWatt:[],
            listTotalByWaktu:[],

        };
        this.getListLampuForDDL.bind(this);
        this.setState = this.setState.bind(this);
        this.controller;
    }    

    onPressBTNModal1(value) {
        if (value == true)
        {
            this.getInfoWaktuLampuHidup(this.state.dataLampu);
        }

        this.setState({isModal1Visible : value});
    }

    onPressBTNModal2(value) {
        if (value == true)
        {
            this.getInfoWattLampuHidup(this.state.dataLampu);
        }

        this.setState({isModal2Visible : value});
    }
    
    render() {

        return (
            
            <View style={styles.container}>
                <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontSize:17, fontWeight: 'bold', marginTop:40 }}>PEMAKAIAN DAYA</Text>
                </View>
                 <View style={{ padding:20 }}>
                    <Text>Berikut adalah informasi jumlah pemakaian daya. Silahkan pilih data :</Text>
                </View>              

                
                <View style={{ marginLeft:20, marginRight:20, marginBottom:20 }}>
                        <DropDownPicker
                        items ={ this.state.listLampuDDL }
                            //items={ this.state.cities }
                            //items={this.state.listLampuDDL.map(item=> ({label:item.label,value:item.value}))}
                            //items={this.state.listLampuDDL}
                            //controller={instance => this.controller = instance}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({ dataLampu: item.value })}
                        />
                </View>

                    <View style={{ marginLeft:20, marginRight:20, marginBottom:20 }}>
                        <DropDownPicker
                            items={[
                                    {label: 'Pilih Data Berdasarkan', value: '0', hidden: true},
                                    {label: 'Waktu Penggunaan', value: '1' },
                                    {label: 'Jumlah Watt', value: '2' }
                                ]}
                            defaultValue={this.state.dataBerdasarkan}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({ dataBerdasarkan: item.value })}
                            />
                            
                    </View>

                    <View style={{ elevation: -99, marginLeft:10, marginRight:10 }}>
                        { this.renderButtonTampilkan() }
                        
                        { /*  Modal By Waktu */}
                        <Modal style={{ borderRadius:20, backgroundColor:'#FFFF' }} isVisible={this.state.isModal1Visible}>
                            <View style={{flex: 1, margin: 20}}>
                                <View>
                                    <Text>Informasi Penggunaan Daya Semua Item Berdasarkan Waktu Penggunaan :</Text>
                                </View>

                                <View style={{ margin:5 }}>
                                    <FlatList
                                        style={{ }}
                                        data={this.state.listDataLampuByWaktu}
                                        extraData={this.state}  
                                        refreshing={this.state.refreshing}
                                        renderItem={({ item }) => <ItemByWaktu item={item}/>}
                                        keyExtractor={item => item.id.toString()}
                                    />
                                </View>

                                <View style={{ borderTopWidth: 3 }}></View>

                                <View style={{ margin:5 }}>
                                    <FlatList
                                            style={{ }}
                                            data={this.state.listTotalByWaktu}
                                            renderItem={({ item }) => <TotalItemByWaktu item={item}/>}
                                            keyExtractor={item => item.id.toString()}
                                    />
                                </View>
                                </View>
                                <View style={{ margin: 20 }}>
                                    <Button title="Close" onPress={() => this.onPressBTNModal1(false)} />
                                </View>
                        </Modal>

                        { /*  Modal By Watt */}
                        <Modal style={{ borderRadius:20, backgroundColor:'#FFFF' }} isVisible={this.state.isModal2Visible}>
                            <View style={{flex: 1, margin: 20}}>
                                <View>
                                    <Text>Informasi Penggunaan Daya Perbulan Berdasarkan Jumlah Watt Untuk Semua Item :</Text>
                                </View>

                                <View style={{ margin:5 }}>
                                    <FlatList
                                        style={{ }}
                                        data={this.state.listDataLampuByWatt}
                                        renderItem={({ item }) => <Item item={item}/>}
                                        keyExtractor={item => item.id.toString()}
                                    />
                                </View>

                                <View style={{ borderTopWidth: 3 }}></View>

                                <View style={{ margin:5 }}>
                                    <FlatList
                                            style={{ }}
                                            data={this.state.listTotalByWatt}
                                            renderItem={({ item }) => <TotalItem item={item}/>}
                                            keyExtractor={item => item.id.toString()}
                                    />
                                </View>
        
                            </View>
                            <View style={{ margin: 20 }}>
                                <Button title="Close" onPress={() => this.onPressBTNModal2(false)} />
                            </View>
                        </Modal>


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


    renderButtonTampilkan() {
        if (this.state.dataBerdasarkan == '1')
        {
          return (
            <Button title="Tampilkan" color="#841584" accessibilityLabel="Tampilkan" onPress={() => this.onPressBTNModal1(true)} />
          );
        }
        else if (this.state.dataBerdasarkan == '2')
        {
          return (
            <Button title="Tampilkan" color="#841584" accessibilityLabel="Tampilkan" onPress={() => this.onPressBTNModal2(true)} />
          );
        }
        else
        {
            return(
            <Button title="Tampilkan" color="#841584" accessibilityLabel="Tampilkan" />
            )
        }
    }

    renderDropDownlist() {
        if (this.state.dataBerdasarkan == '1')
        {
          return (
            <Button title="Tampilkan" color="#841584" accessibilityLabel="Tampilkan" onPress={() => this.onPressBTNModal1(true)} />
          );
        }
        else if (this.state.dataBerdasarkan == '2')
        {
          return (
            <Button title="Tampilkan" color="#841584" accessibilityLabel="Tampilkan" onPress={() => this.onPressBTNModal2(true)} />
          );
        }
        else
        {
            return(
            <Button title="Tampilkan" color="#841584" accessibilityLabel="Tampilkan" />
            )
        }
    }
}

export default Info;

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
    listItem:{
        margin:5,
        padding:5,
        width:"100%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row"
    }, 
    listItemTotal:{
        margin:5,
        padding:5,
        backgroundColor:"#F0F8FF",
        width:"100%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:10
    }
});