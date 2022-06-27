
/*
    Doesn't do much - just switches view back to home after showing user that they are going out to Shopify/somewhere
*/

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, ScrollView, View, Slider, Linking } from 'react-native';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount(){
        setTimeout(() => {

            let url = "https://www.facebook.com/REDACTED/";
            Linking.openURL(url).catch((err) => console.error('An error occurred', err));
            this.props.changeCurrentView("home"); //go back home

        }, 1000);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Llevandote a pagina de </Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#201F23',
        flex: 1,
        justifyContent: 'center'
    },
    section: {
        flex: 1
    },
    text: {
        color: '#ffffff',
        textAlign: 'center'
    }
});

export default Shop;
