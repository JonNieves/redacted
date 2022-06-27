/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';

class Splash extends Component {

    constructor(){
        super();
        this.state = {
            height: Math.round(Dimensions.get("window").height),
            width: Math.round(Dimensions.get("window").width)
        };
    }

    render() {

        let imageStyle = {
            height: this.state.height,
            width: this.state.width
        };

        return (
            <SafeAreaView>
                <Image style={imageStyle} source={require("./images/splash.png")} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default Splash;
