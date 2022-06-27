

import React, { Component } from 'react';
import { View, Image } from 'react-native';
let misc = require("../misc");

class BannerLinks extends Component {

    constructor() {
        super();

        let defaults = [
            require("../images/home/REDACTED.png"),
            require("../images/home/REDACTED.jpg"),
            require("../images/home/REDACTED.png"),
            require("../images/home/REDACTED.jpg"),
            require("../images/home/REDACTED.png")
        ];

        defaults = misc.shuffleArray(defaults);

        this.state = {
            images: defaults
        };
    }

    render() {

        let result = [];

        let styles = {
            banner: {
                height: "100%",
                width: this.props.screenWidth,
                borderWidth: 0.5,
                borderColor: 'black'
            },
            image: {
                resizeMode: 'stretch',
                width: '100%',
                height: '100%'
            }
        };

        for (let image of this.state.images) {
            result.push(
                <View style={styles.banner} key={"bannerLinks" + result.length}>
                    <Image style={styles.image} source={image} />
                </View>
            )
        }

        return result;
    }
}

export default BannerLinks;
