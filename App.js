

import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, Alert, AsyncStorage, Image, Platform } from 'react-native';
import Splash from './components/splash';
import Navigation from './components/navigation';
import Home from './components/home';
import Shop from './components/shop';
import Artistas from './components/artistas';
import Artista from './components/artista';
import Paquetes from './components/paquetes';
import Paquete from './components/paquete';
import Header from './components/header';
let REDACTED_PARSE = require('./components/parse');
let REDACTED_SHARE = require('./components/share');
let DownloadWallpapers = require('./components/downloadWallpapers');

class App extends Component {

    constructor() {
        super();

        this.changeCurrentView = this.changeCurrentView.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            screenWidth: Math.round(Dimensions.get("window").width),
            screenHeight: Math.round(Dimensions.get("window").height),
            currentView: "splash", //currentView's value will be one of the views
            //just for reference
            views: [
                "splash",
                "home", //inicio
                "artistas", //list artists
                "artista", //see one artist's profile
                "shop", //link to some page
                "paquetes",
                "paquete"
            ],
            viewOptions: null, //for when the view is changed and something specific is to be shown
            viewHistory: [] //array of { viewOptions, pageName }, to allow users to always 'go back' where ever they looked
        };

        //Parse
        this.REDACTED_PARSE = REDACTED_PARSE;
        //Sharing to whatsapp
        this.REDACTED_SHARE = REDACTED_SHARE;
        //save wallpapers to device
        this.DownloadWallpapers = DownloadWallpapers;
    }

    async componentDidMount() {

        //app just started up
        //show splash, ask for permission, init Parse, then head home/inicio

        this.REDACTED_PARSE.init(() => {
            console.log("REDACTED_PARSE initiated");
        });

        setTimeout(() => {
            this.changeCurrentView("home", null, true);
        }, 2500);
    }

    //passed to navigation buttons
    changeCurrentView(newView, options = null, doNotAddToHistory = null) {

        let updatedViewHistory = this.state.viewHistory;

        if (doNotAddToHistory === true) console.log("not adding to view history");
        else {
            updatedViewHistory.push({
                currentView: this.state.currentView,
                viewOptions: this.state.viewOptions
            });
        }

        this.setState({
            viewHistory: updatedViewHistory,
            currentView: newView,
            viewOptions: options
        });

        console.log("changeCurrentView", "this.state.viewHistory", this.state.viewHistory);
    }

    //passed to header
    goBack() {
        console.log("goBack()", "START viewHistory", this.state.viewHistory);

        let previous = {
            viewOptions: this.state.viewHistory[this.state.viewHistory.length - 1].viewOptions,
            view: this.state.viewHistory[this.state.viewHistory.length - 1].currentView
        };

        //add all steps of view history except the last one
        let history = [];
        for (let view of this.state.viewHistory) {
            history.push(view);
        };
        history.pop();

        console.log("goBack()", "END viewHistory", history);

        this.setState({
            viewHistory: history,
            currentView: previous.view,
            viewOptions: previous.viewOptions
        });
    }

    generateMainView() {
        if (this.state.currentView === "home") {
            return (
                <Home screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth} REDACTED_PARSE={this.REDACTED_PARSE} changeCurrentView={this.changeCurrentView} />
            );
        }
        else if (this.state.currentView === "artistas") {
            return (
                <Artistas screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth} REDACTED_PARSE={this.REDACTED_PARSE} changeCurrentView={this.changeCurrentView} />
            );
        }
        else if (this.state.currentView === "shop") {
            return (
                <Shop changeCurrentView={this.changeCurrentView} />
            );
        }
        else if (this.state.currentView === "artista") {
            return (
                <Artista screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth} REDACTED_PARSE={this.REDACTED_PARSE} changeCurrentView={this.changeCurrentView} viewOptions={this.state.viewOptions} />
            );
        }
        else if (this.state.currentView === "paquetes") {
            return (
                <Paquetes screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth} REDACTED_PARSE={this.REDACTED_PARSE} changeCurrentView={this.changeCurrentView} viewOptions={this.state.viewOptions} />
            );
        }
        else if (this.state.currentView === "paquete") {
            return (
                <Paquete screenHeight={this.state.screenHeight} screenWidth={this.state.screenWidth} REDACTED_PARSE={this.REDACTED_PARSE} changeCurrentView={this.changeCurrentView} viewOptions={this.state.viewOptions} />
            );
        }
    }

    render() {
        if (this.state.currentView === "splash") return (<Splash />);
        else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: '#201F23' }}>
                        <View style={{ flex: 1.25 }}>
                            <Header viewHistory={this.state.viewHistory} goBack={this.goBack} />
                        </View>
                        <View style={{ flex: 7.5 }}>
                            {this.generateMainView()}
                        </View>
                        <View style={{ flex: 1.25 }}>
                            <Navigation currentView={this.state.currentView} changeCurrentView={this.changeCurrentView} />
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

export default App;
