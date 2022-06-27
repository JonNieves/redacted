
/*
    Profile page of a single artist
*/

import React, { Component } from 'react';
import { SafeAreaView, Image, Text, ScrollView, View, Button, TouchableWithoutFeedback } from 'react-native';

class Artista extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        //console.log("artista.js this.props", this.props.viewOptions);
    }

    componentDidMount() {
        //if for some reason we're not working with an artist id, leave
        if (this.props.viewOptions.id == null) {
            this.props.changeCurrentView("home");
        }
    }

    render() {

        let styles = {
            containers: {
                base: {
                    flex: 1,
                    backgroundColor: '#201F23',
                    alignItems: 'center'
                },
                avatar: {
                    flex: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 200,
                    borderWidth: 5,
                    borderColor: '#F2C332',
                    width: this.props.screenWidth / 2,
                    height: this.props.screenWidth / 2,
                    marginTop: 10
                },
                name: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 1
                },
                buttons: {
                    flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                    padding: 10,
                    backgroundColor: '#F2C332',
                    borderRadius: 100,
                    width: '50%'
                },
                filler: {
                    flex: 1
                },
            },
            avatarImage: {
                resizeMode: 'contain',
                height: '100%',
                width: '100%',
            },
            name: {
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: 30,
                marginTop: 20,
                marginBottom: 40
            },
            text: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20
            }
        };

        return (
            <ScrollView>
                <View style={styles.containers.base}>
                    <View style={styles.containers.filler}></View>
                    <View style={styles.containers.avatar}>
                        <Image style={styles.avatarImage} source={this.props.viewOptions.avatar_url} />
                    </View>
                    <View style={styles.containers.name}>
                        <Text style={styles.name}>{this.props.viewOptions.name}</Text>
                    </View>
                        <TouchableWithoutFeedback onPress={() => this.props.changeCurrentView("paquetes", this.props.viewOptions)} >
                            <View style={styles.containers.buttons}>
                                <Text style={styles.text}>Paquetes</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback >
                            <View style={styles.containers.buttons}>
                                <Text style={styles.text}>SHOP</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    <View style={styles.containers.filler}></View>
                </View>
            </ScrollView>
        );
    }
}

export default Artista;
