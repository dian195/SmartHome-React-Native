import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, BackHandler, Image, Button} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit';
  import { Dimensions } from "react-native";
  import axios from 'axios';
  import _, { set } from 'lodash';
  //Import moment for date and time
  import moment from 'moment';
  import NetInfo from '@react-native-community/netinfo';
  import {Restart} from 'fiction-expo-restart';
  import Modal from 'react-native-modal';

  

//Return view total  
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

class Grafik extends Component {

    //Untuk diload pertama kali 
    componentDidMount() {
        console.log('Refresh Grafik');
        this.checkInternet();
        this.getGrafik();
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

    getGrafik() {

        var dataYear = moment().clone().startOf('month').format('YYYY');

        this.setState({yearData:dataYear});

        console.log('dataYear : ' + dataYear);

        const params = JSON.stringify({
            "year": dataYear
        });

        fetch('http://207.148.121.237:8099/api/Grafik/GrafikWattInYear', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: params
                })
        
                    .then((response) => response.json())
                    .then((responseData) => {
                    this.setState({ listDataGrafik: responseData }, function(){ });
              })
              .catch((error) =>{
                console.error(error);
                this.setState({ isModalnetworkVisible: true });
              }) 

        //Total
        fetch('http://207.148.121.237:8099/api/Grafik/GetTotalInYear', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: params
            })
    
                .then((response) => response.json())
                .then((responseData) => {
                this.setState({ listTotalGrafik: responseData }, function(){ });
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
        this.state = {
            yearData:2020,
            listDataGrafik:[
                {
                  "data": [0,0,0,0,0,0,0,0,0,0,0,0]
                }
              ],
            listTotalGrafik:[],
        };
    }

    render() {


        return (

            <View style={styles.container}>
                <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <Text style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', fontSize:17, fontWeight: 'bold', marginTop:40 }}>GRAFIK PEMAKAIAN DAYA</Text>
                </View>
                <View style={{ margin:20 }}>
                    <Text>Berikut adalah informasi jumlah pemakaian daya pertahun dalam bentuk grafik :</Text>
                </View>

                <View style={{ margin:20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Tahun {this.state.yearData}</Text>
                </View>

                <View>
                    <View style={{
                    marginVertical:0,
                    marginHorizontal:0,
                    margin:80
                }}>
                    <LineChart
                            
                            data={{
                                labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                                datasets: this.state.listDataGrafik,
                            }}
                            //data={ this.state.listDataGrafik }
                            width={Dimensions.get('window').width}
                            height={320}
                            yAxisSuffix=' W'
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor:"#FFF",
                                backgroundGradientFrom:"#FFF",
                                backgroundGradientTo:"#FFF",
                                decimalPlaces:0,
                                color:(opacity = 0) => `rgba(255,0,0, ${opacity})`,
                                labelColor:(opacity = 0) => `rgba(0,0,0, ${opacity})`,
                                style:{
                                    borderRadius:16
                                },
                                propsForDots:{
                                    r:'6',
                                    strokeWidth:"2",
                                    stroke:"red"
                                },
                            }}
                            bezier
                            style={{
                                marginVertical:8,
                                borderRadius:16
                            }}
                            
                    />
                    </View>
                </View>

                <View style={{ borderTopWidth: 0.25 }}></View>
                <View style={{ margin:5 }}>
                    <FlatList
                        style={{ }}
                        data={this.state.listTotalGrafik}
                        renderItem={({ item }) => <TotalItem item={item}/>}
                        keyExtractor={item => item.id.toString()}
                    />
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
 }

export default Grafik;

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
    listItemTotal:{
        margin:5,
        padding:5,
        backgroundColor:"#F0F8FF",
        width:"100%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:10
    },
});