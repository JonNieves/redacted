

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, ScrollView, View, Slider, TouchableWithoutFeedback } from 'react-native';
let misc = require("../misc");

class WallpaperLinks extends Component {

    constructor() {
        super();
        this.state = {
            imagenes: []
        };
    }

    componentDidMount(){
        this.props.REDACTED_PARSE.getImagenes({ limit: 10, limitOnePerArtist: true, type: "wallpaper" }, () => {

            let imagenes = [];

            for (let image of this.props.REDACTED_PARSE.imagenes) {
                //a lot of this is really package + artist information, the only thing about the wallpaper here is the wallpaperImage.uri
                imagenes.push({
                    id: image.attributes.paquete.id, //package ID
                    coverPhoto: { //package coverPhoto
                        uri: image.attributes.paquete.attributes.coverPhoto.url()
                    },
                    name: image.attributes.paquete.attributes.name, //package name
                    artista: image.attributes.artista, //package artist
                    icon: {
                        uri: image.attributes.paquete.attributes.iconPhoto.url()
                    },
                    wallpaper: { //** the only real part this component "cares about" - everything else is to comply with it linking to a package view
                        uri: image.attributes.file.url()
                    }
                });
            }

            imagenes = misc.shuffleArray(imagenes);

            this.setState({
                imagenes: imagenes
            });
        });
    }

    render() {

        let result = [];

        let styles = {
            container: {
                height: '93%',
                margin: (this.props.screenWidth / 33),
                width: (this.props.screenWidth / 3) - (this.props.screenWidth / 33)
            },
            images: {
                resizeMode: 'stretch',
                width: '100%',
                height: '100%',
            }
        };

        for (let image of this.state.imagenes) {

            //this is why everything in componentDidMount has a ton of package + artist info
            let changeViewParam = {
                id: image.id,
                coverPhoto: image.coverPhoto,
                name: image.name,
                artista: image.artista
            };

            result.push(
                <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("paquete", changeViewParam)} key={"wallpaperlinks" + result.length} >
                    <View style={styles.container}>
                        <Image style={styles.images} source={image.wallpaper} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return result;
    }
}

export default WallpaperLinks;