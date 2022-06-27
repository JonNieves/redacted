
/*
    LIST OF MULTIPLE ARTISTS
*/

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, ScrollView, View, TextInput, TouchableWithoutFeedback } from 'react-native';
let misc = require("./misc");

class Artistas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            artistas: []
        };
    }

    componentDidMount(){
        this.props.REDACTED_PARSE.getArtistas(null, () => {
            this.updateArtistState();
        });
    }

    componentWillUnmount(){
        this.setState({
            artistas: []
        });
    }

    updateArtistState(){
        //if artist fetch succeeded
        if (this.props.REDACTED_PARSE.artistas.length > 0){

            let artistAvatars = [];

            for (let artista of this.props.REDACTED_PARSE.artistas){
                if (artista.attributes.avatar.url() != null){
                    artistAvatars.push({
                        id: artista.id,
                        name: artista.attributes.name,
                        avatar_url: {
                            uri: artista.attributes.avatar.url()
                        }
                    });
                }
                else {
                    console.error("No avatar url");
                }
            }

            artistAvatars = misc.shuffleArray(artistAvatars);

            this.setState({
                artistas: artistAvatars
            });
        }
    }

    generateArtistProfileLinks() {

        if (this.state.artistas.length == 0){
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>Loading</Text>
                </View>
            );
        }
        else {
            let result = [];

            let avatarSize = (this.props.screenWidth / 2.75);
            let avatarMargin = (this.props.screenWidth - (2 * avatarSize)) / 4;
    
            let styles = {
                profileRow: {
                    flexDirection: 'row'
                },
                avatarContainer: {
                    width: avatarSize,
                    alignItems: 'center',
                    marginBottom: 30,
                    marginRight: avatarMargin,
                    marginLeft: avatarMargin
                },
                avatarImage: {
                    marginBottom: 20,
                    height: avatarSize,
                    width: avatarSize,
                    resizeMode: 'stretch'
                },
                name: {
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }
            };
    
            for (let i = 0; i < this.state.artistas.length; i=i+2) {
                if (this.state.artistas[i] && this.state.artistas[i+1]){
                    result.push(
                        <View style={styles.profileRow} key={"artistProfileLinks"+result.length}>
                            <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("artista", this.state.artistas[i])} >
                                <View style={styles.avatarContainer}>
                                    <Image style={styles.avatarImage} source={this.state.artistas[i].avatar_url} />
                                    <Text style={styles.name}>{this.state.artistas[i].name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("artista", this.state.artistas[i+1])} >
                                <View style={styles.avatarContainer}>
                                    <Image style={styles.avatarImage} source={this.state.artistas[i+1].avatar_url} />
                                    <Text style={styles.name}>{this.state.artistas[i+1].name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    );
                }
                else if (this.state.artistas[i]){
                    result.push(
                        <View style={styles.profileRow} key={"artistProfileLinks"+result.length}>
                            <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("artista", this.state.artistas[i])} >
                                <View style={styles.avatarContainer}>
                                
                                    <Image style={styles.avatarImage} source={this.state.artistas[i].avatar_url} />
                                    <Text style={styles.name}>{this.state.artistas[i].name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    );
                }
            }
    
            return result;
        }
    }

    render() {

        let styles = {
            baseContainer: { 
                flex: 1, 
                backgroundColor: '#201F23'
            },
            headerContainer: {
                height: 75,
                alignItems: 'center',
            },
            artistScrollContainer: {
                flex: 11
            },
            artistScroll: {
                flex: 1
            },
            searchSection: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            },
            input: {
                flex: 1,
                backgroundColor: '#fff',
                color: '#424242',
                borderColor: 'gray',
                borderRadius: 100, 
                backgroundColor: '#FFFFFF',
            },
        };

        return (
            <SafeAreaView style={styles.baseContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder=" Buscar Artista"
                        />
                    </View>
                </View>
                <View style={styles.artistScrollContainer}>
                    <ScrollView style={styles.artistScroll}>
                        {this.generateArtistProfileLinks()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default Artistas;
