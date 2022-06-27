

import React, { Component } from 'react';
import YouTube from 'react-native-youtube';
import { Platform } from "react-native";

class YoutubePlayer extends Component {

    constructor() {
        super();
        
        this.state = {
            googleDeveloperApiKey: "REDACTED"
        };
    }

    componentDidMount() { }

    render() {

        if (Platform.OS === "android"){
            return (
                <YouTube
                    apiKey={this.state.googleDeveloperApiKey}
                    videoId={this.props.videoID} // The YouTube video ID
                    play={true} // control playback of video with true/false
                    fullscreen={false} // control whether the video should play in fullscreen or inline
                    loop={false} // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}
                    style={this.props.youtubePlayerStyle}
                    showFullscreenButton={false}
                    controls={2}
                />
            );
        }
        else if (Platform.OS === "ios"){

            let origin = "https://www.youtube.com/watch?v=" + this.props.videoID;

            return (
                <YouTube
                    apiKey={this.state.googleDeveloperApiKey}
                    videoId={this.props.videoID} // The YouTube video ID
                    play={true} // control playback of video with true/false
                    fullscreen={false} // control whether the video should play in fullscreen or inline
                    loop={false} // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}
                    style={this.props.youtubePlayerStyle}
                    showinfo={true}
                    modestbranding={true}
                    origin={origin}
                    rel={false}
                />
            );
        }

    }
}

export default YoutubePlayer;