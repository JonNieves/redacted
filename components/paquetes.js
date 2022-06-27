
/*
    Packages of a single artist
*/

import React, { Component } from 'react';
import { SafeAreaView, Image, Text, ScrollView, View, Button, TouchableWithoutFeedback } from 'react-native';
import YoutubePlayer from './youtubePlayer';
let misc = require("./misc");

class Paquetes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artista: null,
            paquetes: []
        };

        //console.log("paquetes.js/constructor()", this.props.viewOptions);

        //if for some reason we're not working with an artist id, leave
        if (this.props.viewOptions.id == null) {
            this.props.changeCurrentView("home");
        }
        else {
            this.state.artista = this.props.viewOptions;
        }
    }

    componentDidMount() {
        //get packages
        let query = {
            artistaID: this.props.viewOptions.id
        };

        this.props.REDACTED_PARSE.getPaquetes(query, () => {
            if (this.props.REDACTED_PARSE.paquetes.length > 0) {

                let packages = [];
                
                for (let pack of this.props.REDACTED_PARSE.paquetes){
                    packages.push({
                        id: pack.id,
                        coverPhoto: {
                            uri: pack.attributes.coverPhoto.url()
                        },
                        name: pack.attributes.name,
                        artista: pack.attributes.artista
                    });
                }

                packages = misc.shuffleArray(packages);

                //console.log("this.state.paquetes", packages);

                this.setState({
                    paquetes: packages
                });
            }
        });
    }

    generatePackageList() {

        let result = [];
        
        if (this.state.paquetes.length > 0) {

            let coverPhotoWidth = this.props.screenWidth - 40;

            let styles = {
                containers: {
                    base: {
                        backgroundColor: '#201F23',
                        alignItems: 'center',
                        margin: 10
                    }
                },
                coverPhoto: {
                    height: coverPhotoWidth / 2.04,
                    width: coverPhotoWidth,
                },
                text: {
                    color: 'white'
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
                    <View style={styles.containers.base} key={"pack"+result.length}>
                        <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("paquete", changeViewParam)} >
                            <View>
                                <Text style={styles.text}>{pack.name}</Text>
                                <Image style={styles.coverPhoto} source={pack.coverPhoto} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                );
            }
        }

        result = misc.shuffleArray(result);

        return result;
    }

    render() {

        let styles = {
            containers: {
                base: {
                    flex: 1,
                    backgroundColor: '#201F23',
                    alignItems: 'center'
                },
                scroll: {
                    flex: 8,
                    backgroundColor: '#201F23',
                    marginTop: 30
                },
                title: {
                    width: '100%',
                    //backgroundColor: 'gray',
                    //alignItems: 'flex-start',
                    //alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                },
                artist: {
                    flexDirection: 'row',
                    //backgroundColor: 'gray',
                    //alignItems: 'center',
                    justifyContent: 'center' //I don't know why but flexDirection + justifyContent centers where it looks like alignItems would but ok
                },
            },
            image: {
                resizeMode: 'contain',
                width: 50,
                height: 50,
                margin: 5
            },
            text: {
                color: 'white',
                textAlignVertical: 'center'
            },
            title: {
                color: 'white',
                margin: 10,
                fontWeight: 'bold',
                fontSize: 30
            },
            youtube: {
                height: (this.props.screenHeight / 2.5) - (this.props.screenHeight / 25),
                width: this.props.screenWidth,
            }
        };
            

        return (
            <View style={styles.containers.base}>
                <View style={styles.containers.title}>
                    <Text style={styles.title}>REDACTED</Text>
                    <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("artista", this.state.artista)} >
                        <View style={styles.containers.artist}>
                            <Image style={styles.image} source={this.props.viewOptions.avatar_url} />
                            <Text style={styles.text}>{this.props.viewOptions.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView style={styles.containers.scroll}>
                    <YoutubePlayer youtubePlayerStyle={styles.youtube} videoID={"REDACTED"} REDACTED_PARSE={this.props.REDACTED_PARSE} />
                    {this.generatePackageList()}
                </ScrollView>
            </View>
        );

    }
}

export default Paquetes;
