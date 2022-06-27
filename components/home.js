

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image, Text, ScrollView, View, Slider } from 'react-native';
import YoutubePlayer from './youtubePlayer';
import BannerLinks from './home/bannerLinks';
import WallpaperLinks from './home/wallpaperLinks';
import PaqueteLinks from './home/paqueteLinks';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBannerOffset: 0,
            autoScrollBanner: null
        };

        this.bannerRef = React.createRef(); //create reference to banner container
    }

    componentDidMount() {
        this.controlAutoScroll("start");
    }

    componentWillUnmount(){
        this.controlAutoScroll("stop");
    }

    //create interval to scroll banner
    controlAutoScroll(action){
        if (action === "start"){
            this.setState({
                autoScrollBanner: setInterval(() => {
                    this.scrollBanner();
                }, 3500)
            });
        }
        else if (action === "stop"){
            clearInterval(this.state.autoScrollBanner);
        }
    }

    //scrolls banner container - used in setInterval
    scrollBanner(){

        let newPlacement = 0;

        //if on first, scroll to second
        if (this.state.currentBannerOffset == 0) {
            newPlacement = this.props.screenWidth;
        }
        //if on second, scroll to third
        else if (this.state.currentBannerOffset == this.props.screenWidth) {
            newPlacement = this.props.screenWidth * 2;
        }
        //if on third, scroll to fourth
        else if (this.state.currentBannerOffset == (this.props.screenWidth * 2)) {
            newPlacement = this.props.screenWidth * 3;
        }
        //if on fourth, scroll to first
        else if (this.state.currentBannerOffset == (this.props.screenWidth * 3)) {
            newPlacement = 0;
        }

        //make the move
        this.bannerRef.current.scrollResponderScrollTo({ x: newPlacement, y: 0, animated: true });
        
        this.setState({
            currentBannerOffset: newPlacement
        });
    }

    generateScrollBanner(){

        let bannerLinksStyle = {
            height: (this.props.screenHeight / 3.25) - (this.props.screenHeight / 25),
        };

        return (
            <ScrollView
                style={bannerLinksStyle}
                ref={this.bannerRef}
                horizontal={true}
                scrollEnabled={false}
            >
                <BannerLinks screenWidth={this.props.screenWidth} REDACTED_PARSE={this.props.REDACTED_PARSE} changeCurrentView={this.props.changeCurrentView} />
            </ScrollView>
        );
    }

    generatePaqueteLinksTitle(){

        let styles = {
            text: { 
                fontSize: 20, 
                fontWeight: 'bold', 
                color: 'white', 
                margin: 10 
            },
            image: { 
                height: 20, 
                width: 20 
            }
        }

        return (
            <View>
                <Text style={styles.text}>REDACTED Paquetes <Image style={styles.image} source={require('./images/home/fire.png')} /></Text>
            </View>
        );
    }

    generatePaqueteLinks(){

        let profileLinksStyle = {
            height: (this.props.screenHeight / 4) - (this.props.screenHeight / 25),
            marginBottom: 10
        };

        return (
            <ScrollView
                style={profileLinksStyle}
                horizontal={true}
            >
                <PaqueteLinks screenWidth={this.props.screenWidth} REDACTED_PARSE={this.props.REDACTED_PARSE} changeCurrentView={this.props.changeCurrentView} />
            </ScrollView>
        );
    }

    generateYoutubePlayer(){

        let youtubeStyle = {
            height: (this.props.screenHeight / 2.5) - (this.props.screenHeight / 25),
            width: this.props.screenWidth,
        };

        return (
            <YoutubePlayer youtubePlayerStyle={youtubeStyle} videoID={"REDACTED"} REDACTED_PARSE={this.props.REDACTED_PARSE} />
        );
    }

    generateWallpaperLinksTitle(){
        return (
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', margin: 10 }}>REDACTED Papers <Image style={{ height: 20, width: 20 }} source={require('./images/home/fire.png')} /></Text>
            </View>
        );
    }

    generateWallpaperLinks(){

        let wallpaperLinksStyle = {
            height: (this.props.screenHeight / 2.5) - (this.props.screenHeight / 25),
        };

        return (
            <ScrollView
                style={wallpaperLinksStyle}
                horizontal={true}
            >
                <WallpaperLinks screenWidth={this.props.screenWidth} REDACTED_PARSE={this.props.REDACTED_PARSE} changeCurrentView={this.props.changeCurrentView} />
            </ScrollView>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#201F23' }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#201F23' }}>
                    {this.generateScrollBanner()}
                    {this.generatePaqueteLinksTitle()}
                    {this.generatePaqueteLinks()}
                    {this.generateYoutubePlayer()}
                    {this.generateWallpaperLinksTitle()}
                    {this.generateWallpaperLinks()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Home;
