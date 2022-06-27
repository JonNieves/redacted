
/*
    Top bar section that is always shown
    also contains "Go Back" button
*/

import React, { Component } from 'react';
import { SafeAreaView, Image, Text, ScrollView, View, Button, TouchableWithoutFeedback } from 'react-native';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let styles = {
            containers: {
                base: {
                    flex: 1,
                    backgroundColor: '#201F23',
                    //backgroundColor: '#FFF',
                    flexDirection: 'row',
                    alignItems: 'flex-start'
                },
                text: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                image: {
                    flex: 3,
                    justifyContent: 'center'
                }
            },
            text: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            image: {
                resizeMode: 'contain',
                width: '100%',
                backgroundColor: '#201F23'
            },
            backButton: {
                resizeMode: 'contain',
                width: '25%',
                backgroundColor: '#201F23'
            },
            invisible: { 
                color: '#201F23'
            }
        };

        if (this.props.viewHistory.length > 0) {
            return (
                <View style={styles.containers.base} horizontal={true}>
                    <TouchableWithoutFeedback onPress={() => this.props.goBack()} style={styles.containers.text}>
                        <View style={styles.containers.text}>
                            <Image style={styles.backButton} source={require("./images/header/back.png")} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.containers.image}>
                        <Image style={styles.image} source={require("./images/artistas/header.png")} />
                    </View>
                    <View style={styles.containers.text}>
                        <Text style={styles.invisible}>Back</Text>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.containers.base} horizontal={true}>
                    <View style={styles.containers.text}>
                        <Text style={styles.invisible}>Back</Text>
                    </View>
                    <View style={styles.containers.image}>
                        <Image style={styles.image} source={require("./images/artistas/header.png")} />
                    </View>
                    <View style={styles.containers.text}>
                        <Text style={styles.invisible}>Back</Text>
                    </View>
                </View>
            );
        }
    }
}

export default Header;
