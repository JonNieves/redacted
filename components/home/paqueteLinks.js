

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, ScrollView, View, Slider, TouchableWithoutFeedback } from 'react-native';
let misc = require("../misc");

class PaqueteLinks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paquetes: []
        };
    }

    componentDidMount() {
        this.props.REDACTED_PARSE.getPaquetes({ limit: 10, limitOnePerArtist: true }, () => {

            let paquetes = [];

            for (let pack of this.props.REDACTED_PARSE.paquetes) {
                paquetes.push({
                    id: pack.id,
                    coverPhoto: {
                        uri: pack.attributes.coverPhoto.url()
                    },
                    name: pack.attributes.name,
                    artista: pack.attributes.artista,
                    icon: {
                        uri: pack.attributes.iconPhoto.url()
                    }
                });
            }

            paquetes = misc.shuffleArray(paquetes);

            this.setState({
                paquetes: paquetes
            });
        });
    }

    render() {

        let result = [];

        let styles = {
            emojiBotones: {
                height: '93%',
                margin: (this.props.screenWidth / 33),
                width: (this.props.screenWidth / 2) - (this.props.screenWidth / 33)
            },
            images: {
                resizeMode: 'stretch',
                width: '100%',
                height: '100%',
                borderRadius: 10
            }
        };

        for (let pack of this.state.paquetes) {

            let changeViewParam = {
                id: pack.id,
                coverPhoto: pack.coverPhoto,
                name: pack.name,
                artista: pack.artista
            };

            result.push(
                <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("paquete", changeViewParam)} key={"PaqueteLinks" + result.length} >
                    <View style={styles.emojiBotones} >
                        <Image style={styles.images} source={pack.icon} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return result;
    }
}

export default PaqueteLinks;