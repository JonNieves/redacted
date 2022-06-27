
/*
    Show images of a specific package from a specific artist and allow purchase/download of said package
*/

import React, { Component } from 'react';
import { SafeAreaView, Image, Text, ScrollView, View, Button, TouchableWithoutFeedback, Alert, Platform } from 'react-native';

let misc = require("./misc");
let REDACTED_SHARE = require("./share");
let DownloadWallpapers = require("./downloadWallpapers");

import RNIap, {
    InAppPurchase,
    PurchaseError,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener
} from 'react-native-iap';

const itemSkus = Platform.select({
    ios: [
        'REDACTED', //Apple app store in-app purchase product id
        'REDACTED'
    ],
    android: []
});

let purchaseProgressListener;
let purchaseProblemListener;

class Paquete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artista: null, //used to go back to artist's packages
            paquete: null,
            imagenes: [],
            packageProductID: null,
            productList: [], //RNIap
            receipt: '', //RNIap
            availableItemsMessage: '', //RNIap
            isWhatsAppAvailable: false
        };

        //console.log("paquete.js/constructor()", this.props.viewOptions);

        //if for some reason we're not working with a package id, leave
        if (this.props.viewOptions.id == null) {
            console.error("No viewOptions id");
            this.props.changeCurrentView("home");
        }
        else {
            this.state.paquete = this.props.viewOptions;
            this.state.artista = this.props.viewOptions.artista;
        }

        this.REDACTED_SHARE = REDACTED_SHARE;
        this.DownloadWallpapers = DownloadWallpapers;
    }

    async componentDidMount() {
        this.getImagesOfPackage(); //display images from this package
        this.initializeInAppPurchase();

        //check if whatsapp is avaliable - do not allow purchase if whatsapp is not
        this.REDACTED_SHARE.isWhatsAppAvailable(isWhatsAppAvailable => {
            this.setState({
                isWhatsAppAvailable: isWhatsAppAvailable
            });
        });
    }

    getImagesOfPackage() {
        let query = {
            paqueteID: this.props.viewOptions.id
        };

        this.props.REDACTED_PARSE.getImagenes(query, () => {
            if (this.props.REDACTED_PARSE.imagenes.length > 0) {
                this.fillStateImages();
            }
        });
    }

    //https://github.com/dooboolab/react-native-iap/blob/master/IapExample/App.js
    async initializeInAppPurchase() {
        try {
            const result = await RNIap.initConnection(); //init, idk
            await RNIap.consumeAllItemsAndroid(); //clear possible earlier data in memory or something
            this.getItems(); //get products from app store(s) and save to productList in state
            console.log('result', result);
        } catch (err) {
            console.warn(err.code, err.message);
        }

        purchaseProgressListener = purchaseUpdatedListener((purchase) => {
            console.log('purchaseUpdatedListener', purchase);
            this.setState({
                receipt: purchase.transactionReceipt
            }, () => {
                console.log('Receipt', this.state.receipt);
                this.downloadPaquete(this.state.imagenes[0])
            });
        });

        purchaseProblemListener = purchaseErrorListener((error) => {
            console.error('purchaseErrorListener', error);
            Alert.alert('Purchase error', JSON.stringify(error));
        });
    }

    //https://github.com/dooboolab/react-native-iap/blob/master/IapExample/App.js
    async getItems() {
        try {
            const products = await RNIap.getProducts(itemSkus);
            console.log('Products', products);
            this.setState({ productList: products });
        } catch (err) {
            console.warn(err.code, err.message);
        }
    };

    //https://github.com/dooboolab/react-native-iap/blob/master/IapExample/App.js
    async getAvailablePurchases() {
        try {
            console.info(
                'Get available purchases (non-consumable or unconsumed consumable)',
            );
            const purchases = await RNIap.getAvailablePurchases();
            console.info('Available purchases :: ', purchases);
            if (purchases && purchases.length > 0) {
                this.setState({
                    availableItemsMessage: `Got ${purchases.length} items.`,
                    receipt: purchases[0].transactionReceipt,
                });
            }
        } catch (err) {
            console.warn(err.code, err.message);
            Alert.alert(err.message);
        }
    };

    // Version 3 apis
    //https://github.com/dooboolab/react-native-iap/blob/master/IapExample/App.js
    requestPurchase(sku) {
        if (this.state.isWhatsAppAvailable === true){
            try {
                RNIap.requestPurchase(sku);
            } catch (err) {
                console.warn(err.code, err.message);
            }
        }
        else {
            Alert.alert("ERROR: Whatsapp no fue detectado", "Los productos de REDACTED incluyen artículos que solo están destinados para su uso en Whatsapp");
        }
    };

    fillStateImages() {
        let images = [];

        for (let image of this.props.REDACTED_PARSE.imagenes) {
            images.push({
                id: image.id,
                sourceURI: {
                    uri: image.attributes.file.url()
                },
                type: image.attributes.type,
                packID: image.attributes.paquete.id,
                packName: image.attributes.paquete.attributes.name,
                packProductID: image.attributes.paquete.attributes.appStoreProductID,
                parse: image
            });
        }

        console.log("paquete images", images);

        this.setState({
            imagenes: images
        });
    }

    generateEmojisList() {

        //create array of EMOJI images

        let result = [];

        if (this.state.imagenes.length > 0) {

            let imageWidth = (this.props.screenWidth / 3);
            let imageMargin = 10;

            let styles = {
                containers: {
                    base: {
                        backgroundColor: '#201F23',
                        alignItems: 'center',
                        height: imageWidth,
                        width: imageWidth,
                        margin: imageMargin
                    }
                },
                image: {
                    height: imageWidth,
                    width: imageWidth,
                },
                text: {
                    color: 'white'
                }
            };

            for (let image of this.state.imagenes) {
                if (image.type === "emoji") {
                    result.push(
                        <View style={styles.containers.base} key={"emoji" + result.length}>
                            <Image style={styles.image} source={image.sourceURI} />
                        </View>
                    );
                }
            }
        }

        result = misc.shuffleArray(result);

        return result;
    }

    generateWallpaperList() {

        //create array of WALLPAPER images

        let result = [];

        if (this.state.imagenes.length > 0) {

            let imageWidth = (this.props.screenWidth / 2.5) - 30;
            let imageMargin = 10;

            let styles = {
                containers: {
                    base: {
                        backgroundColor: '#201F23',
                        alignItems: 'center',
                        height: (imageWidth * 2),
                        width: imageWidth,
                        margin: imageMargin
                    }
                },
                image: {
                    height: imageWidth * 2,
                    width: imageWidth,
                },
                text: {
                    color: 'white'
                }
            };

            for (let image of this.state.imagenes) {
                if (image.type === "wallpaper") {
                    result.push(
                        <View style={styles.containers.base} key={"wallpaper" + result.length}>
                            <Image style={styles.image} source={image.sourceURI} />
                        </View>
                    );
                }
            }
        }

        result = misc.shuffleArray(result);

        return result;
    }

    generateDescargarButton() {

        let styles = {
            containers: {
                buttons: {
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 15,
                    backgroundColor: '#F2C332',
                    width: '100%'
                },
                unavailableButton: {
                    backgroundColor: '#8B0000',
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 15,
                    width: '100%'
                }
            },
            texts: {
                button: {
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            }
        };

        if (this.state.imagenes.length > 0 && this.state.productList.length > 0 && this.state.isWhatsAppAvailable === true) {
            return (
                <View style={{ width: '100%' }}>
                    <TouchableWithoutFeedback onPress={() => this.initiatePurchaseAction()} >
                        <View style={styles.containers.buttons}>
                            <Text style={styles.texts.button}>DESCARGAR PAQUETE</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        else if (this.state.isWhatsAppAvailable === false){
            return (
                <View style={{ width: '100%' }}>
                    <View style={styles.containers.unavailableButton}>
                        <Text style={styles.texts.button}>NECESITAS WHATSAPP PARA USAR ESTE PRODUCTO</Text>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View></View>
            );
        }
        
    }

    initiatePurchaseAction() {
        Alert.alert(
            'Comprar',
            '¿Quieres comprar este paquete?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Purchase action canceled'),
                    style: 'cancel',
                },
                { 
                    text: 'OK', 
                    onPress: () => this.requestPurchase(this.state.imagenes[0].packProductID)
                    //onPress: () => this.downloadPaquete(this.state.imagenes[0])
                },
            ],
            { cancelable: true },
        );
    }

    downloadPaquete(thisStateImagenes0) {
        this.REDACTED_SHARE.isWhatsAppAvailable(isWhatsAppAvailable => {
            if (isWhatsAppAvailable) {
                if (Platform.OS === 'ios') {
                    //add paquete to whatsapp
                    this.REDACTED_SHARE.shareIOS(thisStateImagenes0.packID);
                    //download wallpapers
                    for (let image of this.props.REDACTED_PARSE.imagenes) {
                        if (image.attributes.type === "wallpaper") this.DownloadWallpapers.savePhotoIOS(image.attributes.file.url());
                    }
                }
                else {
                    //ask permission
                    this.DownloadWallpapers.request_storage_permission().then(result => {
                        console.log("request permission result", result);
                        if (result) {
                            //add paquete to whatsapp
                            this.REDACTED_SHARE.shareAndroid(thisStateImagenes0.packID, thisStateImagenes0.packName, () => {
                                //download wallpapers
                                let count = 0;
                                for (let image of this.props.REDACTED_PARSE.imagenes) {
                                    if (image.attributes.type === "wallpaper") {
                                        let fileName = thisStateImagenes0.packName + "_" + count;
                                        count++;
                                        this.DownloadWallpapers.savePhotoAndroid(fileName, image.attributes.file.url());
                                    }
                                }
                            });
                        }
                    });
                }
            }
            else {
                Alert.alert("Error", "Whatsapp not found on device");
            }
        });
    }

    render() {

        let styles = {
            containers: {
                base: {
                    flex: 1,
                    backgroundColor: '#201F23',
                    alignItems: 'center',
                },
                scroll: {
                    flex: 1,
                    backgroundColor: '#201F23',
                    marginTop: 30,
                    flexDirection: 'row'
                },
                title: {
                    width: '100%',
                    //backgroundColor: 'gray',
                    //alignItems: 'flex-start',
                    //alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    margin: 10
                },
                packageMeta: {
                    alignItems: 'center',
                    flexShrink: 1,
                },
                buttons: {
                    alignItems: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 15,
                    backgroundColor: '#F2C332',
                    width: '100%'
                }
            },
            images: {
                title: {
                    width: 100,
                    height: 50
                }
            },
            texts: {
                artist: {
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold'
                },
                button: {
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            },
            title: {
                color: 'white',
                margin: 10,
                fontWeight: 'bold',
                fontSize: 30
            }
        };

        let changeViewParams = {
            id: this.state.artista.id,
            name: this.state.artista.attributes.name,
            avatar_url: {
                uri: this.state.artista.attributes.avatar.url()
            }
        }

        return (
            <View style={styles.containers.base}>
                <View style={styles.containers.title}>
                    <Text style={styles.title}>REDACTED</Text>
                    <TouchableWithoutFeedback style={styles.containers.packageMeta} onPress={() => this.props.changeCurrentView("paquetes", changeViewParams)} >
                        <View style={styles.containers.packageMeta}>
                            <Image style={styles.images.title} source={this.props.viewOptions.coverPhoto} />
                            <Text style={styles.texts.artist}>{this.props.viewOptions.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView>
                    <ScrollView style={styles.containers.scroll} horizontal={true}>
                        {this.generateEmojisList()}
                    </ScrollView>
                    <ScrollView style={styles.containers.scroll} horizontal={true}>
                        {this.generateWallpaperList()}
                    </ScrollView>
                </ScrollView>
                {this.generateDescargarButton()}
            </View>
        );

    }
}

export default Paquete;
