import {createAppContainer, NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CreateStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import InfoScreen from '../screens/Info';
import GrafikScreen from '../screens/Grafik';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Tabs = createMaterialTopTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                initialRouteName="Home"
                shifting={true}
                labeled={false}
                sceneAnimationEnabled={false}
                activeColor="#00aea2"
                inactiveColor="#95a5a6"
                barStyle={{ backgroundColor: '#00aea2' }}>
                <Tabs.Screen 
                    activeColor="#00aea2"
                    inactiveColor="red"
                    name="Home" 
                    component={HomeScreen}
                    options={{
                        tabBarLabel :({}) => (
                            <View style={styles.iconContainer}>
                                { /*<Icon name="ios-home" color="#000" size={18}></Icon> */ }
                                <Text>Home</Text>
                            </View>
                        ),
                    }}
                    >
                </Tabs.Screen>
                <Tabs.Screen 
                    name="Info" 
                    component={InfoScreen}
                    options={{
                        tabBarLabel :({}) => (
                            <View style={styles.iconContainer}>
                                { /*<Icon name="information-circle" color="#000" size={18}></Icon>*/ }
                                <Text>Info</Text>
                            </View>
                        ),
                    }}
                    >
                </Tabs.Screen>
                <Tabs.Screen 
                    name="Grafik" 
                    component={GrafikScreen}
                    options={{
                        tabBarLabel :({}) => (
                            <View style={styles.iconContainer}>
                                { /*<Icon name="trending-up" color="#000" size={18}></Icon> */ }
                                <Text>Grafik</Text>
                            </View>
                        ),
                    }}
                    >
                </Tabs.Screen>
            </Tabs.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});