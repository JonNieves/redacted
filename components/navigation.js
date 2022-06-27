

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //just for reference
            views: [
                "splash",
                "home", //inicio
                "artistas",
                "shop",
            ],
            images: {
                home: {
                    selected: require("./images/navigation/inicio_selected.png"),
                    inactive: require("./images/navigation/inicio.png")
                },
                artistas: {
                    selected: require("./images/navigation/artistas_selected.png"),
                    inactive: require("./images/navigation/artistas.png")
                },
                shop: {
                    selected: require("./images/navigation/shop_selected.png"),
                    inactive: require("./images/navigation/shop.png")
                }
            }
        };
    }

    generateNavButton(view, viewText){

        let textStyle = (this.props.currentView === view) ? "selectedText" : "text";
        let imageSource = (this.props.currentView === view) ? this.state.images[view].selected : this.state.images[view].inactive;

        return (
            <TouchableWithoutFeedback style={styles.button} onPress={() => this.props.changeCurrentView(view)} >
                <View style={styles.buttonView}>
                    <Image style={styles.image} source={imageSource} />
                    <Text style={styles[textStyle]}>{viewText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.generateNavButton("home", "INICIO")}
                {this.generateNavButton("artistas", "ARTISTAS")}
                {this.generateNavButton("shop", "FACEBOOK")}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#201F23',
        height: "100%",
        width: "100%"
    },
    button: {
        width: "25%",
        height: "100%",
        backgroundColor: '#201F23',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: { 
        flex: 1, 
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedText: {
        color: '#f2c332',
        textAlign: 'center',
        fontSize: 10
    },
    text: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 10
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: "contain"
    }
});

export default Navigation;